import { Component, ChangeDetectionStrategy, inject } from "@angular/core";
import { AccessCodesService } from "../services/access-codes.service";
import { AsyncPipe } from "@angular/common";

@Component({
  selector: "sd-access-codes-init",
  templateUrl: "access-codes-init.html",
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [AsyncPipe],
})
export class AccessCodesInitComponent {
  accessCodesService = inject(AccessCodesService);
}
