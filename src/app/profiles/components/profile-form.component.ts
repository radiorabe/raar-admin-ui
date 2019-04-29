import {
  Component,
  OnInit,
  OnDestroy,
  ChangeDetectionStrategy,
  ChangeDetectorRef
} from "@angular/core";
import { Router, ActivatedRoute } from "@angular/router";
import { FormBuilder, Validators } from "@angular/forms";
import { Observable, of } from "rxjs";
import { MainFormComponent } from "../../shared/components/main-form.component";
import { ProfilesService } from "../services/profiles.service";
import { ArchiveFormatsRestService } from "../services/archive-formats-rest.service";
import { AudioEncodingsService } from "../../shared/services/audio-encodings.service";
import { ProfileModel } from "../models/profile.model";
import { ArchiveFormatModel } from "../models/archive-format.model";
import { NotificationService } from "../../shared/services/notification.service";
import { ShowsService } from "src/app/shows/services/shows.service";
import { ShowModel } from "src/app/shows/models/show.model";
import { filter, map } from "rxjs/operators";

@Component({
  selector: "sd-profile-form",
  templateUrl: "profile-form.html",
  providers: [ArchiveFormatsRestService],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProfileFormComponent extends MainFormComponent<ProfileModel>
  implements OnInit, OnDestroy {
  archiveFormats: ArchiveFormatModel[] = [];

  availableCodecs: string[] = [];

  shownArchiveFormat: ArchiveFormatModel | void;

  constructor(
    route: ActivatedRoute,
    router: Router,
    profilesService: ProfilesService,
    public archiveFormatsRest: ArchiveFormatsRestService,
    private showsService: ShowsService,
    private audioEncodingsService: AudioEncodingsService,
    notificationSerivce: NotificationService,
    changeDetector: ChangeDetectorRef,
    fb: FormBuilder
  ) {
    super(
      route,
      router,
      profilesService,
      notificationSerivce,
      changeDetector,
      fb
    );
  }

  reset() {
    this.form.reset({
      name: this.entry.attributes.name,
      description: this.entry.attributes.description,
      default: {
        value: this.entry.attributes.default,
        disabled: this.entry.attributes.default
      }
    });
  }

  addArchiveFormat(codec: string) {
    const newFormat = new ArchiveFormatModel();
    newFormat.attributes.codec = codec;
    this.setArchiveFormats(this.archiveFormats.concat([newFormat]));
    this.shownArchiveFormat = newFormat;
  }

  removeArchiveFormat(format: ArchiveFormatModel) {
    this.setArchiveFormats(
      this.archiveFormats.filter(
        f => f.attributes.codec !== format.attributes.codec
      )
    );
  }

  toggleArchiveFormat(format: ArchiveFormatModel) {
    if (format === this.shownArchiveFormat) {
      this.shownArchiveFormat = undefined;
    } else {
      this.shownArchiveFormat = format;
    }
  }

  relatedShows() {
    return this.showsService
      .getEntries()
      .pipe(
        map(list =>
          list.filter(
            show =>
              show.relationships.profile &&
              show.relationships.profile.data.id === this.entry.id
          )
        )
      );
  }

  protected setEntry(profile: ProfileModel) {
    super.setEntry(profile);

    if (profile.id) {
      this.archiveFormatsRest.profileId = profile.id;
      this.archiveFormatsRest
        .getList()
        .subscribe(list => this.setArchiveFormats(list.entries));
    } else {
      this.setArchiveFormats([]);
    }
  }

  protected serialize() {
    const formModel = this.form.value;
    this.entry.attributes.name = formModel.name;
    this.entry.attributes.description = formModel.description;
    this.entry.attributes.default = formModel.default;
  }

  protected createForm(fb: FormBuilder) {
    this.form = fb.group({
      name: ["", Validators.required],
      description: "",
      default: ""
    });
  }

  protected newEntry(): Observable<ProfileModel> {
    const profile = new ProfileModel();
    return of(profile);
  }

  protected getRemoveQuestion(): string {
    return "Willst du dieses Profil wirklich löschen?";
  }

  protected getTitleNew(): string {
    return "Neues Profil";
  }

  protected getMainRoute(): string {
    return "profiles";
  }

  protected getDeleteSuccessMessage(): string {
    return `Das Profil ${this.entry} wurde gelöscht.`;
  }

  private setArchiveFormats(formats: ArchiveFormatModel[]) {
    this.audioEncodingsService.getEntries().subscribe(encodings => {
      this.archiveFormats = formats;
      this.availableCodecs = encodings
        .map(e => e.attributes.codec)
        .filter(codec => !formats.find(f => f.attributes.codec === codec));
      this.changeDetector.markForCheck();
    });
  }
}
