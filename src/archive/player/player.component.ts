import { Component, OnInit, OnDestroy } from '@angular/core';
import { Params } from '@angular/router';
import { ISubscription } from 'rxjs/Subscription';
import { Subject } from 'rxjs/Subject';
import { AudioPlayerService } from './audio_player.service';
import { BroadcastsService } from '../../shared/services/index';
import { AudioFileModel, BroadcastModel } from '../../shared/models/index';
import { AudioFilesService } from '../shared/services/audio_files.service';
import { DateParamsService } from '../../shared/services/date_params.service';
import { PlayerEvents } from './player_events';

@Component({
  moduleId: module.id,
  selector: 'sd-player',
  templateUrl: 'player.html'
})
export class PlayerComponent implements OnInit, OnDestroy {

  private readonly destroy$ = new Subject();

  constructor(private _player: AudioPlayerService,
              private audioFilesService: AudioFilesService,
              private broadcastsService: BroadcastsService) {}

  ngOnInit() {
    this.handleRouteParams(this.parseRouteParams());
    this._player.events
      .takeUntil(this.destroy$)
      .filter(i => i === PlayerEvents.Finish)
      .subscribe(() => this.playNextBroadcast());
  }

  ngOnDestroy() {
    this.destroy$.next();
  }

  get player(): AudioPlayerService {
    return this._player;
  }

  get audioFile(): AudioFileModel {
    return this.player.audioFile;
  }

  get broadcast(): BroadcastModel | void {
    if (!this.audioFile) return;
    return this.audioFile.relationships.broadcast;
  }

  get volume(): number {
    return this.player.muted ? 0 : this.player.volume;
  }

  get highVolume(): boolean {
    return !this.player.muted && this.player.volume >= 40;
  }

  get lowVolume(): boolean {
    return !this.player.muted && this.player.volume < 40 && this.player.volume > 0;
  }

  get mute(): boolean {
    return this.player.muted || this.player.volume === 0;
  }

  togglePlay() {
    if (!this.player.audioFile) return;
    if (this.player.playing) {
      this.player.pause();
    } else {
      this.player.play();
    }
  }

  private playNextBroadcast(): void {
    if (this.broadcast) {
      this.findAndPlayBroadcast(
        this.broadcast.attributes.finished_at,
        this.audioFile.attributes.codec,
        this.audioFile.attributes.playback_format
      );
    }
  }

  private parseRouteParams(): Params {
    const params: Params = {};
    this.parsePlayerRouteParams(params);
    this.parseDateRouteParams(params);
    return params;
  }

  private parsePlayerRouteParams(params: Params): void {
    const exp = /(\w+)=(\w+)/g;
    const path = window.location.pathname;
    let match = exp.exec(path);
    while(match !== null) {
      params[match[1]] = match[2];
      match = exp.exec(path);
    }
  }

  private parseDateRouteParams(params: Params): void {
    // for date views, eg /2017/06/23
    const match = window.location.pathname.match(/^\/(\d+)\/(\d+)\/(\d+);/);
    if (match) {
      params['year'] = match[1];
      params['month'] = match[2];
      params['day'] = match[3];
    }
  }

  private handleRouteParams(params: Params): void {
    if (params['time'] && params['play'] && params['format']) {
      const time = DateParamsService.timeFromParams(params);
      this.findAndPlayBroadcast(time, params['format'], params['play']);
    }
  }

  private findAndPlayBroadcast(time: Date, codec: string, playbackFormat: string): void {
    this.broadcastsService.getForTime(time).filter(Boolean).subscribe(broadcast => {
      this.findAndPlayAudio(broadcast, time, codec, playbackFormat);
    });
  }

  private findAndPlayAudio(broadcast: BroadcastModel, time: Date, codec: string, playbackFormat: string): void {
    this.audioFilesService.getListForBroadcast(broadcast).subscribe(files => {
      let audio = files.entries.find(file => {
        return file.attributes.playback_format === playbackFormat &&
          file.attributes.codec === codec;
      });
      if (!audio) audio = files.entries[0];
      if (audio) this.player.play(audio, time);
    });
  }

}
