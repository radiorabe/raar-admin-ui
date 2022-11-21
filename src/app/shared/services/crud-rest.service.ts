import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import { ReadRestService } from "./read-rest.service";
import { CrudModel } from "../models/crud.model";

export class CrudRestService<T extends CrudModel> extends ReadRestService<T> {
  constructor(http: HttpClient, baseUrlTemplate: string) {
    super(http, baseUrlTemplate);
  }

  create(entity: T, entityToUpdate: T = entity): Observable<T> {
    return this.http
      .post(this.baseUrl, this.rootedJson(entity))
      .pipe(map(res => this.updateEntityFromResponse(res, entityToUpdate)));
  }

  update(entity: T, entityToUpdate: T = entity): Observable<T> {
    return this.http
      .patch(`${this.baseUrl}/${entity.id}`, this.rootedJson(entity))
      .pipe(map(res => this.updateEntityFromResponse(res, entityToUpdate)));
  }

  remove(id: number): Observable<void> {
    return this.http
      .delete(`${this.baseUrl}/${id}`)
      .pipe(map(res => undefined));
  }

  protected rootedJson(entity: T): string {
    const data: any = {};
    data["data"] = entity;
    return JSON.stringify(data);
  }
}
