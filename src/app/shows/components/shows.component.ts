import { Component, ChangeDetectionStrategy, inject } from "@angular/core";
import { FormControl, FormsModule, ReactiveFormsModule } from "@angular/forms";
import { Observable } from "rxjs";
import { ShowsService } from "../services/shows.service";
import { ShowModel } from "../models/show.model";
import {
  startWith,
  debounceTime,
  filter,
  distinctUntilChanged,
  switchMap,
  map,
} from "rxjs/operators";
import { LayoutComponent } from "../../shared/components/layout.component";
import { TopNavComponent } from "../../shared/components/top-nav.component";
import { AddButtonComponent } from "../../shared/components/add-button.component";
import { RouterLinkActive, RouterLink } from "@angular/router";
import { AsyncPipe } from "@angular/common";

@Component({
  selector: "sd-shows",
  templateUrl: "shows.html",
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    LayoutComponent,
    TopNavComponent,
    AddButtonComponent,
    FormsModule,
    ReactiveFormsModule,
    RouterLinkActive,
    RouterLink,
    AsyncPipe,
  ],
})
export class ShowsComponent {
  private showService = inject(ShowsService);

  shows: Observable<ShowModel[]>;

  query: FormControl = new FormControl();

  constructor() {
    this.showService.reload();
    this.shows = this.showObservable();
  }

  private showObservable(): Observable<ShowModel[]> {
    return this.query.valueChanges.pipe(
      startWith(""),
      debounceTime(50),
      filter((q: string) => q.length === 0 || q.length > 2),
      distinctUntilChanged(),
      switchMap((q) => this.fetchShows(q)),
    );
  }

  private fetchShows(q: string): Observable<ShowModel[]> {
    const regexp = new RegExp(q, "i");
    return this.showService
      .getEntries()
      .pipe(map((list) => list.filter((e) => e.toString().match(regexp))));
  }
}
