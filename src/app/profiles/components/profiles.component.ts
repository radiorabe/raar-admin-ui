import { Component, ChangeDetectionStrategy } from "@angular/core";
import { ProfilesService } from "../services/profiles.service";
import { LayoutComponent } from "../../shared/components/layout.component";
import { TopNavComponent } from "../../shared/components/top-nav.component";
import { AddButtonComponent } from "../../shared/components/add-button.component";
import { RouterLinkActive, RouterLink } from "@angular/router";
import { AsyncPipe } from "@angular/common";

@Component({
  selector: "sd-profiles",
  templateUrl: "profiles.html",
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
export class ProfilesComponent {
  constructor(public profilesService: ProfilesService) {
    profilesService.reload();
  }
}
