import { Component, ChangeDetectionStrategy } from "@angular/core";
import { AccessCodesService } from "../services/access-codes.service";

@Component({
    selector: "sd-access-codes-init",
    templateUrl: "access-codes-init.html",
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: false
})
export class AccessCodesInitComponent {
  constructor(public accessCodesService: AccessCodesService) {}
}
