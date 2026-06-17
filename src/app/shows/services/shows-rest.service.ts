import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import { CrudRestService } from "../../shared/services/crud-rest.service";
import { ShowModel } from "../models/show.model";
import { ModelResponse } from "../../shared/services/read-rest.service";

@Injectable()
export class ShowsRestService extends CrudRestService<ShowModel> {
  constructor() {
    super("/api/admin/shows");
  }

  merge(entity: ShowModel, targetId: number): Observable<ShowModel> {
    return this.http
      .post<
        ModelResponse<ShowModel>
      >(`${this.baseUrl}/${entity.id}/merge/${targetId}`, undefined)
      .pipe(
        map((res) => this.updateEntityFromResponse(res, this.buildEntity())),
      );
  }

  protected buildEntity(): ShowModel {
    return new ShowModel();
  }
}
