import {
  Component,
  Input,
  Output,
  EventEmitter,
  ChangeDetectionStrategy,
} from "@angular/core";
import { DowngradeActionModel } from "../models/downgrade-action.model";

@Component({
    selector: "sd-downgrade-action",
    templateUrl: "downgrade-action.html",
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: false
})
export class DowngradeActionComponent {
  @Input() downgradeAction: DowngradeActionModel;

  @Output() edit = new EventEmitter<void>();

  @Output() remove = new EventEmitter<void>();
}
