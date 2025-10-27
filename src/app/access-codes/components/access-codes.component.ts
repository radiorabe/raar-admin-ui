import { Component, ChangeDetectionStrategy, inject } from "@angular/core";
import { AccessCodesService } from "../services/access-codes.service";
import { LayoutComponent } from "../../shared/components/layout.component";
import { TopNavComponent } from "../../shared/components/top-nav.component";
import { AddButtonComponent } from "../../shared/components/add-button.component";
import { RouterLinkActive, RouterLink } from "@angular/router";
import { AsyncPipe } from "@angular/common";

@Component({
  selector: "sd-access-codes",
  templateUrl: "access-codes.html",
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
export class AccessCodesComponent {
  accessCodesService = inject(AccessCodesService);

  constructor() {
    this.accessCodesService.reload();
  }
}
