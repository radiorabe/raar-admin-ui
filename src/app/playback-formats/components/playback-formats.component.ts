import { Component, ChangeDetectionStrategy } from "@angular/core";
import { PlaybackFormatsService } from "../services/playback-formats.service";

@Component({
  selector: "sd-playback-formats",
  templateUrl: "playback-formats.html",
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PlaybackFormatsComponent {
  constructor(public playbackFormatsService: PlaybackFormatsService) {
    playbackFormatsService.reload();
  }
}
