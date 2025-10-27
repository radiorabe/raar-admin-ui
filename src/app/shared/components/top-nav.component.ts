import { Component, ChangeDetectionStrategy } from "@angular/core";
import { Router, RouterLinkActive, RouterLink } from "@angular/router";
import { AdminAuthService } from "../services/admin-auth.service";

@Component({
  selector: "sd-admin-nav",
  templateUrl: "top-nav.html",
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RouterLinkActive, RouterLink],
})
export class TopNavComponent {
  constructor(
    public auth: AdminAuthService,
    private router: Router,
  ) {}

  logout() {
    this.auth.logout();
  }
}
