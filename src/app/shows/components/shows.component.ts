import { Component, ChangeDetectionStrategy } from "@angular/core";
import { FormControl } from "@angular/forms";
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

@Component({
    selector: "sd-shows",
    templateUrl: "shows.html",
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: false
})
export class ShowsComponent {
  shows: Observable<ShowModel[]>;

  query: FormControl = new FormControl();

  constructor(private showService: ShowsService) {
    showService.reload();
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
