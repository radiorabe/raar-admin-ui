import {
  Component,
  Input,
  Output,
  EventEmitter,
  OnInit,
  ChangeDetectionStrategy,
} from "@angular/core";
import { FormBuilder, Validators, ReactiveFormsModule } from "@angular/forms";
import { ValidatedFormComponent } from "../../shared/components/validated-form.component";
import { DowngradeActionModel } from "../models/downgrade-action.model";
import { AudioEncodingModel } from "../../shared/models/audio-encoding.model";
import { DowngradeActionsRestService } from "../services/downgrade-actions-rest.service";
import { FormErrorsComponent } from "../../shared/components/form-errors.component";
import { FieldErrorsComponent } from "../../shared/components/field-errors.component";

@Component({
  selector: "sd-downgrade-action-form",
  templateUrl: "downgrade-action-form.html",
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [ReactiveFormsModule, FormErrorsComponent, FieldErrorsComponent],
})
export class DowngradeActionFormComponent
  extends ValidatedFormComponent
  implements OnInit
{
  @Input() downgradeAction: DowngradeActionModel;

  @Input() restService: DowngradeActionsRestService;

  @Input() audioEncoding: AudioEncodingModel;

  @Output() saved = new EventEmitter<DowngradeActionModel>();

  @Output() canceled = new EventEmitter<void>();

  ngOnInit() {
    this.reset();
  }

  onSubmit() {
    this.submitted = true;
    this.serialize();
    this.persist();
  }

  cancel() {
    this.canceled.next();
  }

  reset() {
    this.form.reset({
      months: this.downgradeAction.attributes.months,
      bitrate: this.downgradeAction.attributes.bitrate,
      channels: this.downgradeAction.attributes.channels,
    });
    if (!this.downgradeAction.id) {
      this.form.markAsDirty();
    }
  }

  protected createForm(fb: FormBuilder) {
    this.form = fb.group({
      months: ["", Validators.required],
      bitrate: [""],
      channels: [""],
    });
  }

  private serialize() {
    const formModel = this.form.value;
    this.downgradeAction.attributes.months = formModel.months;
    this.downgradeAction.attributes.bitrate = formModel.bitrate;
    this.downgradeAction.attributes.channels = formModel.channels;
  }

  private persist() {
    const action = this.downgradeAction.id ? "update" : "create";
    this.restService[action](
      this.downgradeAction,
      new DowngradeActionModel(),
    ).subscribe(
      (action) => this.saved.next(action),
      (err) => this.handleSubmitError(err),
    );
  }
}
