import { Component, ChangeDetectionStrategy, inject } from "@angular/core";
import { FormBuilder, Validators, ReactiveFormsModule } from "@angular/forms";
import { Observable, of } from "rxjs";
import { MainFormComponent } from "../../shared/components/main-form.component";
import { AccessCodesService } from "../services/access-codes.service";
import { AccessCodeModel } from "../models/access-code.model";
import { FormErrorsComponent } from "../../shared/components/form-errors.component";
import { FieldErrorsComponent } from "../../shared/components/field-errors.component";

@Component({
  selector: "sd-access-code-form",
  templateUrl: "access-code-form.html",
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [ReactiveFormsModule, FormErrorsComponent, FieldErrorsComponent],
})
export class AccessCodeFormComponent extends MainFormComponent<AccessCodeModel> {
  protected modelsService = inject(AccessCodesService);

  reset() {
    this.form.reset({
      expires_at: this.entry.expires_at_string,
    });
  }

  protected serialize() {
    const formModel = this.form.value;
    this.entry.attributes.expires_at = formModel.expires_at;
  }

  protected createForm(fb: FormBuilder) {
    this.form = fb.group({
      expires_at: ["", Validators.required],
    });
  }

  protected newEntry(): Observable<AccessCodeModel> {
    const format = new AccessCodeModel();
    return of(format);
  }

  protected getRemoveQuestion(): string {
    return "Willst du diesen Zugangscode wirklich löschen?";
  }

  protected getTitleNew(): string {
    return "Neuer Zugangscode";
  }

  protected getMainRoute(): string {
    return "access_codes";
  }
}
