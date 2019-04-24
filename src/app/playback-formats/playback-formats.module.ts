import { NgModule } from "@angular/core";
import { SharedModule } from "../shared/shared.module";
import { PlaybackFormatsRoutingModule } from "./playback-formats-routing.module";
import { PlaybackFormatsComponent } from "./components/playback-formats.component";
import { PlaybackFormatsInitComponent } from "./components/playback-formats-init.component";
import { PlaybackFormatFormComponent } from "./components/playback-format-form.component";
import { PlaybackFormatsService } from "./services/playback-formats.service";
import { PlaybackFormatsRestService } from "./services/playback-formats-rest.service";

@NgModule({
  imports: [SharedModule, PlaybackFormatsRoutingModule],
  declarations: [
    PlaybackFormatsComponent,
    PlaybackFormatsInitComponent,
    PlaybackFormatFormComponent
  ],
  exports: [],
  providers: [PlaybackFormatsRestService, PlaybackFormatsService]
})
export class PlaybackFormatsModule {}
