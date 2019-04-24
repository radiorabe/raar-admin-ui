import { Component, ChangeDetectionStrategy } from "@angular/core";
import { AccessCodesService } from "../services/access-codes.service";

@Component({
  selector: "sd-access-codes",
  templateUrl: "access-codes.html",
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AccessCodesComponent {
  constructor(public accessCodesService: AccessCodesService) {
    accessCodesService.reload();
  }
}
