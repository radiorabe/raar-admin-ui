import { NgModule } from "@angular/core";
import { SharedModule } from "../shared/shared.module";
import { ShowsRoutingModule } from "./shows-routing.module";
import { ShowsComponent } from "./components/shows.component";
import { ShowsInitComponent } from "./components/shows-init.component";
import { ShowFormComponent } from "./components/show-form.component";
import { ShowMergeComponent } from "./components/show-merge.component";
import { ShowsService } from "./services/shows.service";
import { ShowsRestService } from "./services/shows-rest.service";
import { ProfilesService } from "../profiles/services/profiles.service";
import { ProfilesRestService } from "../profiles/services/profiles-rest.service";

@NgModule({
  imports: [SharedModule, ShowsRoutingModule],
  declarations: [
    ShowsComponent,
    ShowsInitComponent,
    ShowFormComponent,
    ShowMergeComponent
  ],
  exports: [],
  providers: [
    ShowsRestService,
    ShowsService,
    ProfilesRestService,
    ProfilesService
  ]
})
export class ShowsModule {}
