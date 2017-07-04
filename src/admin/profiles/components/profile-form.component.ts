import { Component, OnInit, OnDestroy, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs/Observable';
import { Observer } from 'rxjs/Observer';
import { Subject } from 'rxjs/Subject';
import { ReplaySubject } from 'rxjs/ReplaySubject';
import { ISubscription } from 'rxjs/Subscription';
import { ValidatedFormComponent } from '../../shared/components/validated-form.component';
import { ProfilesService } from '../services/profiles.service';
import { ProfileModel } from '../models/profile.model';

@Component({
  moduleId: module.id,
  selector: 'sd-profile-form',
  templateUrl: 'profile-form.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProfileFormComponent extends ValidatedFormComponent {

  profile: ProfileModel;

  title: string;

  private profileSub: ISubscription;

  constructor(private route: ActivatedRoute,
              private router: Router,
              private profilesService: ProfilesService,
              changeDetector: ChangeDetectorRef,
              fb: FormBuilder) {
    super(changeDetector);
    this.createForm(fb);
  }

  ngOnInit() {
    this.profileSub = this.route.params
      .map(params => +params['id'])
      .distinctUntilChanged()
      .switchMap(id => id > 0 ? this.profilesService.get(id) : this.newProfile())
      .do(_ => window.scrollTo(0, 0))
      .subscribe(profile => this.setProfile(profile));
  }

  ngOnDestroy() {
    this.profileSub.unsubscribe();
  }

  onSubmit() {
    this.submitted = true;
    this.serializeProfile();
    this.saveProfile();
  }

  reset() {
    this.form.reset({
      name: this.profile.attributes.name,
      description: this.profile.attributes.description,
      default: { value: this.profile.attributes.default, disabled: this.profile.attributes.default }
    });
  }

  remove(e: Event) {
    e.preventDefault();
    if (window.confirm('Willst du dieses Profil wirklich löschen?')) {
      this.submitted = true;
      this.profilesService.remove(this.profile.id).subscribe(
        _ => this.router.navigate(['profiles']),
        err => this.handleSubmitError(err)
      );
    }
  }

  private setProfile(profile: ProfileModel) {
    this.profile = profile;
    this.title = profile.id ? profile.toString() : 'Neues Profil';
    this.reset();
    this.changeDetector.markForCheck();
  }

  private serializeProfile() {
    const formModel = this.form.value;
    this.profile.attributes.name = formModel.name
    this.profile.attributes.description = formModel.description;
    this.profile.attributes.default = formModel.default;
  }

  private createForm(fb: FormBuilder) {
    this.form = fb.group({
      name: ['', Validators.required],
      description: '',
      default: ''
    });
  }

  private newProfile(): Observable<ProfileModel> {
    const profile = new ProfileModel();
    return Observable.of(profile);
  }

  private saveProfile() {
    let action: Observable<ProfileModel>;
    if (this.profile.id) {
      action = this.profilesService.update(this.profile);
    } else {
      action = this.profilesService.create(this.profile);
    }
    action.subscribe(
      profile => {
        this.router.navigate(['profiles', profile.id]);
        this.setProfile(profile);
      },
      err => this.handleSubmitError(err));
  }
}
