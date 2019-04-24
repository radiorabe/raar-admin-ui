import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { AppRoutingModule } from "./app-routing.module";
import { CommonModule } from "@angular/common";
import { AppComponent } from "./app.component";
import { SharedModule } from "./shared/shared.module";

import * as moment from "moment";
import "moment/locale/de";
import { NotificationComponent } from "./shared/components/notification.component";
import { AudioEncodingsService } from "./shared/services/audio-encodings.service";
import { NotificationService } from "./shared/services/notification.service";
import { LoginModule } from "./login/login.module";
import { ShowsModule } from "./shows/shows.module";
import { ProfilesModule } from "./profiles/profiles.module";
import { PlaybackFormatsModule } from "./playback-formats/playback-formats.module";
import { AccessCodesModule } from "./access-codes/access-codes.module";

moment.locale("de");

@NgModule({
  imports: [
    BrowserModule,
    SharedModule.forRoot(),
    CommonModule,
    LoginModule,
    ShowsModule,
    ProfilesModule,
    PlaybackFormatsModule,
    AccessCodesModule,
    AppRoutingModule
  ],
  declarations: [AppComponent, NotificationComponent],
  exports: [AppComponent],
  providers: [AudioEncodingsService, NotificationService],
  bootstrap: [AppComponent]
})
export class AppModule {}
