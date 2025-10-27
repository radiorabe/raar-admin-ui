import { Component, ChangeDetectionStrategy, inject } from "@angular/core";
import {
  FormBuilder,
  Validators,
  FormsModule,
  ReactiveFormsModule,
} from "@angular/forms";
import { Observable, of } from "rxjs";
import { MainFormComponent } from "../../shared/components/main-form.component";
import { ShowsService } from "../services/shows.service";
import { ProfilesService } from "../../profiles/services/profiles.service";
import { ShowModel } from "../models/show.model";
import { FormErrorsComponent } from "../../shared/components/form-errors.component";
import { FieldErrorsComponent } from "../../shared/components/field-errors.component";
import { ShowMergeComponent } from "./show-merge.component";
import { AsyncPipe } from "@angular/common";

@Component({
  selector: "sd-show-form",
  templateUrl: "show-form.html",
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    FormsModule,
    ReactiveFormsModule,
    FormErrorsComponent,
    FieldErrorsComponent,
    ShowMergeComponent,
    AsyncPipe,
  ],
})
export class ShowFormComponent extends MainFormComponent<ShowModel> {
  profilesService = inject(ProfilesService);

  protected modelsService = inject(ShowsService);

  reset() {
    this.form.reset({
      name: this.entry.attributes.name,
      details: this.entry.attributes.details,
      profile_id:
        this.entry.relationships.profile &&
        this.entry.relationships.profile.data.id,
    });
  }

  protected serialize() {
    const formModel = this.form.value;
    this.entry.attributes.name = formModel.name;
    this.entry.attributes.details = formModel.details;
    this.entry.relationships.profile = {
      data: { id: formModel.profile_id, type: "profiles" },
    };
  }

  protected createForm(fb: FormBuilder) {
    this.form = fb.group({
      name: ["", Validators.required],
      details: "",
      profile_id: "",
    });
  }

  protected newEntry(): Observable<ShowModel> {
    const show = new ShowModel();
    const defaultProfile = this.profilesService.getDefaultEntry();
    if (defaultProfile) {
      show.relationships.profile = {
        data: { id: defaultProfile.id, type: "profiles" },
      };
    }
    return of(show);
  }

  protected getRemoveQuestion(): string {
    return "Willst du diese Sendung wirklich löschen?";
  }

  protected getTitleNew(): string {
    return "Neue Sendung";
  }

  protected getMainRoute(): string {
    return "shows";
  }

  protected getDeleteSuccessMessage(): string {
    return `Die Sendung ${this.entry} wurde gelöscht.`;
  }
}
