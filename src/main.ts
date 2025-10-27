import { enableProdMode, importProvidersFrom } from "@angular/core";

import { environment } from "./environments/environment";
import { AudioEncodingsService } from "./app/shared/services/audio-encodings.service";
import { NotificationService } from "./app/shared/services/notification.service";
import { BrowserModule, bootstrapApplication } from "@angular/platform-browser";
import { SharedModule } from "./app/shared/shared.module";
import { CommonModule } from "@angular/common";
import { LoginModule } from "./app/login/login.module";
import { ShowsModule } from "./app/shows/shows.module";
import { ProfilesModule } from "./app/profiles/profiles.module";
import { PlaybackFormatsModule } from "./app/playback-formats/playback-formats.module";
import { AccessCodesModule } from "./app/access-codes/access-codes.module";
import { AppRoutingModule } from "./app/app-routing.module";
import { AppComponent } from "./app/app.component";

if (environment.production) {
  enableProdMode();
}

bootstrapApplication(AppComponent, {
  providers: [
    importProvidersFrom(
      BrowserModule,
      SharedModule.forRoot(),
      CommonModule,
      LoginModule,
      ShowsModule,
      ProfilesModule,
      PlaybackFormatsModule,
      AccessCodesModule,
      AppRoutingModule,
    ),
    AudioEncodingsService,
    NotificationService,
  ],
}).catch((err) => console.error(err));
