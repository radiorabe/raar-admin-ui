import {
  Component,
  Input,
  OnChanges,
  ChangeDetectionStrategy,
  inject,
} from "@angular/core";
import {
  FormBuilder,
  Validators,
  FormsModule,
  ReactiveFormsModule,
} from "@angular/forms";
import { Router } from "@angular/router";
import { ValidatedFormComponent } from "../../shared/components/validated-form.component";
import { ShowModel } from "../models/show.model";
import { ShowsService } from "../services/shows.service";
import { FormErrorsComponent } from "../../shared/components/form-errors.component";
import { FieldErrorsComponent } from "../../shared/components/field-errors.component";
import { AsyncPipe } from "@angular/common";

@Component({
  selector: "sd-show-merge",
  templateUrl: "show-merge.html",
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    FormsModule,
    ReactiveFormsModule,
    FormErrorsComponent,
    FieldErrorsComponent,
    AsyncPipe,
  ],
})
export class ShowMergeComponent
  extends ValidatedFormComponent
  implements OnChanges
{
  showsService = inject(ShowsService);
  private router = inject(Router);

  @Input() show: ShowModel;

  ngOnChanges() {
    this.reset();
  }

  onSubmit() {
    this.submitted = true;
    this.merge();
  }

  reset() {
    this.submitted = false;
    this.form.reset({
      target_id: "",
    });
  }
  protected createForm(fb: FormBuilder) {
    this.form = fb.group({
      target_id: ["", Validators.required],
    });
  }

  private merge() {
    this.showsService
      .mergeEntry(this.show, this.form.value.target_id)
      .subscribe(
        (show) => {
          this.router.navigate(["shows", show.id]);
          this.notificationService.notify(
            true,
            `Die Sendung ${this.show.attributes.name} wurde mit ${show.attributes.name} zusammengeführt.`,
          );
        },
        (err) => this.handleSubmitError(err),
      );
  }
}
