import { OnInit, OnDestroy, ChangeDetectorRef, Directive } from "@angular/core";
import { Router, ActivatedRoute } from "@angular/router";
import { FormBuilder } from "@angular/forms";
import { Observable, of } from "rxjs";
import { Subject } from "rxjs";
import { ValidatedFormComponent } from "../../shared/components/validated-form.component";
import { ModelsService } from "../services/models.service";
import { NotificationService } from "../services/notification.service";
import {
  takeUntil,
  map,
  distinctUntilChanged,
  switchMap,
  tap,
  catchError,
} from "rxjs/operators";
import { CrudModel } from "../models/crud.model";

@Directive()
export class MainFormComponent<T extends CrudModel>
  extends ValidatedFormComponent
  implements OnInit, OnDestroy
{
  entry: T;

  title: string;

  private readonly destroy$ = new Subject();

  constructor(
    protected route: ActivatedRoute,
    protected router: Router,
    protected modelsService: ModelsService<T>,
    notificationService: NotificationService,
    changeDetector: ChangeDetectorRef,
    fb: FormBuilder,
  ) {
    super(fb, changeDetector, notificationService);
  }

  ngOnInit() {
    this.route.params
      .pipe(
        takeUntil(this.destroy$),
        map((params) => +params["id"]),
        distinctUntilChanged(),
        switchMap((id) => {
          if (id > 0) {
            return this.modelsService
              .getEntry(id)
              .pipe(catchError((_err) => this.newEntry()));
          } else {
            return this.newEntry();
          }
        }),
        tap((_) => window.scrollTo(0, 0)),
      )
      .subscribe((entry) => this.setEntry(entry));
  }

  ngOnDestroy() {
    this.destroy$.next();
  }

  onSubmit() {
    this.submitted = true;
    this.serialize();
    this.persist();
  }

  remove(e: Event) {
    e.preventDefault();
    if (window.confirm(this.getRemoveQuestion())) {
      this.submitted = true;
      this.modelsService.removeEntry(this.entry).subscribe(
        (_) => {
          this.router.navigate([this.getMainRoute()]);
          this.notificationService.notify(true, this.getDeleteSuccessMessage());
        },
        (err) => this.handleSubmitError(err),
      );
    }
  }

  protected setEntry(entry: T) {
    this.entry = entry;
    this.title = entry.id ? entry.toString() : this.getTitleNew();
    this.reset();
    this.changeDetector.markForCheck();
  }

  protected persist() {
    this.modelsService.storeEntry(this.entry).subscribe(
      (entry) => {
        this.router.navigate([this.getMainRoute(), entry.id]);
        this.setEntry(entry);
        this.notificationService.notify(true, this.getSaveSuccessMessage());
      },
      (err) => this.handleSubmitError(err),
    );
  }

  protected serialize() {
    // implement in subclass
  }

  protected newEntry(): Observable<T> {
    return of();
  }

  protected getTitleNew(): string {
    return "Neuer Eintrag";
  }

  protected getRemoveQuestion(): string {
    return "Willst du diesen Eintrag wirklich löschen?";
  }

  protected getMainRoute(): string {
    return "";
  }
}
