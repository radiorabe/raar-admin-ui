import { NgModule } from "@angular/core";
import { SharedModule } from "../shared/shared.module";
import { ProfilesRoutingModule } from "./profiles-routing.module";
import { ProfilesComponent } from "./components/profiles.component";
import { ProfilesInitComponent } from "./components/profiles-init.component";
import { ProfileFormComponent } from "./components/profile-form.component";
import { ArchiveFormatFormComponent } from "./components/archive-format-form.component";
import { DowngradeActionComponent } from "./components/downgrade-action.component";
import { DowngradeActionFormComponent } from "./components/downgrade-action-form.component";
import { ProfilesService } from "./services/profiles.service";
import { ProfilesRestService } from "./services/profiles-rest.service";

@NgModule({
  imports: [
    SharedModule,
    ProfilesRoutingModule,
    ProfilesComponent,
    ProfilesInitComponent,
    ProfileFormComponent,
    ArchiveFormatFormComponent,
    DowngradeActionComponent,
    DowngradeActionFormComponent,
  ],
  exports: [],
  providers: [ProfilesRestService, ProfilesService],
})
export class ProfilesModule {}
