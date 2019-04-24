import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { ModelsService } from "../../shared/services/models.service";
import { ShowModel } from "../models/show.model";
import { ShowsRestService } from "./shows-rest.service";
import { tap } from "rxjs/operators";

@Injectable()
export class ShowsService extends ModelsService<ShowModel> {
  protected sortAttr = "name";

  constructor(rest: ShowsRestService) {
    super(rest);
  }

  mergeEntry(show: ShowModel, targetId: number): Observable<ShowModel> {
    return (<ShowsRestService>this.crudRest)
      .merge(show, targetId)
      .pipe(tap(_result => this.updateEntries(this.entriesWithout(show.id))));
  }
}
