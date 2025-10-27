import { Component, ChangeDetectionStrategy, inject } from "@angular/core";
import { RouterLinkActive, RouterLink } from "@angular/router";
import { AdminAuthService } from "../services/admin-auth.service";

@Component({
  selector: "sd-admin-nav",
  templateUrl: "top-nav.html",
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RouterLinkActive, RouterLink],
})
export class TopNavComponent {
  auth = inject(AdminAuthService);

  logout() {
    this.auth.logout();
  }
}
