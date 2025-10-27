import { Component, ChangeDetectionStrategy } from "@angular/core";
import { PlaybackFormatsService } from "../services/playback-formats.service";
import { LayoutComponent } from "../../shared/components/layout.component";
import { TopNavComponent } from "../../shared/components/top-nav.component";
import { AddButtonComponent } from "../../shared/components/add-button.component";
import { RouterLinkActive, RouterLink } from "@angular/router";
import { AsyncPipe } from "@angular/common";

@Component({
  selector: "sd-playback-formats",
  templateUrl: "playback-formats.html",
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    LayoutComponent,
    TopNavComponent,
    AddButtonComponent,
    RouterLinkActive,
    RouterLink,
    AsyncPipe,
  ],
})
export class PlaybackFormatsComponent {
  constructor(public playbackFormatsService: PlaybackFormatsService) {
    playbackFormatsService.reload();
  }
}
