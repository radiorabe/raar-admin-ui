import { Component, ChangeDetectionStrategy } from "@angular/core";
import { ProfilesService } from "../services/profiles.service";

@Component({
  selector: "sd-profiles",
  templateUrl: "profiles.html",
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProfilesComponent {
  constructor(public profilesService: ProfilesService) {
    profilesService.reload();
  }
}
