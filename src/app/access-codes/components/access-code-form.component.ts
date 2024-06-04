import {
  Component,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
} from "@angular/core";
import { Router, ActivatedRoute } from "@angular/router";
import { FormBuilder, Validators } from "@angular/forms";
import { Observable, of } from "rxjs";
import { MainFormComponent } from "../../shared/components/main-form.component";
import { AccessCodesService } from "../services/access-codes.service";
import { AccessCodeModel } from "../models/access-code.model";
import { NotificationService } from "../../shared/services/notification.service";

@Component({
  selector: "sd-access-code-form",
  templateUrl: "access-code-form.html",
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AccessCodeFormComponent extends MainFormComponent<AccessCodeModel> {
  constructor(
    route: ActivatedRoute,
    router: Router,
    accessCodesService: AccessCodesService,
    notificationService: NotificationService,
    changeDetector: ChangeDetectorRef,
    fb: FormBuilder
  ) {
    super(
      route,
      router,
      accessCodesService,
      notificationService,
      changeDetector,
      fb
    );
  }

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
