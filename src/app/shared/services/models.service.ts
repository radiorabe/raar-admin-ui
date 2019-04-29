import { Injectable } from "@angular/core";
import { CrudRestService } from "../services/crud-rest.service";
import { Observable, of } from "rxjs";
import { BehaviorSubject } from "rxjs";
import { CrudModel } from "../models/crud.model";
import { tap, switchMap, map, catchError } from "rxjs/operators";
import { CrudList } from "../models/crud-list";

@Injectable()
export class ModelsService<T extends CrudModel> {
  protected entries: T[] = [];

  protected readonly sortAttr: string;

  private entries$ = new BehaviorSubject<T[]>([]);

  constructor(protected crudRest: CrudRestService<T>) {
    // only reload after instance variables from subclasses have been set.
    setTimeout(() => this.reload());
  }

  getEntries(): Observable<T[]> {
    return this.entries$;
  }

  getEntry(id: number): Observable<T> {
    return this.crudRest.get(id).pipe(tap(e => this.updateListEntry(e)));
  }

  storeEntry(entry: T): Observable<T> {
    let action: Observable<T>;
    if (entry.id) {
      action = this.crudRest.update(entry);
    } else {
      action = this.crudRest.create(entry);
    }
    return action.pipe(tap(result => this.updateListEntry(result)));
  }

  removeEntry(entry: T): Observable<void> {
    return this.crudRest
      .remove(entry.id)
      .pipe(tap(_ => this.updateEntries(this.entriesWithout(entry.id))));
  }

  reload() {
    this.loadEntries().subscribe(list => this.updateEntries(list));
  }

  protected sortEntries(entries: T[]): T[] {
    return entries.sort((a: T, b: T) =>
      a.toString().localeCompare(b.toString())
    );
  }

  protected entriesWithout(id: number) {
    return this.entries.filter(e => e.id !== id);
  }

  protected updateEntries(entries: T[]) {
    this.entries = this.sortEntries(entries);
    this.entries$.next(this.entries);
  }

  private loadEntries(): Observable<T[]> {
    return this.crudRest
      .getList({ sort: this.sortAttr, "page[size]": 500 })
      .pipe(
        switchMap(list => this.loadAllEntries(list)),
        map(list => list.entries),
        catchError(_ => of([]))
      );
  }

  private loadAllEntries(list: CrudList<T>): Observable<CrudList<T>> {
    if (list.links.next) {
      return this.crudRest
        .getNextEntries(list)
        .pipe(switchMap(l => this.loadAllEntries(l)));
    } else {
      return of(list);
    }
  }

  private updateListEntry(entry: T) {
    const result = this.entriesWithout(entry.id);
    result.push(entry);
    this.updateEntries(result);
  }
}
