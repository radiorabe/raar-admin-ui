import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import { ModelResponse, ReadRestService } from "./read-rest.service";
import { CrudModel } from "../models/crud.model";

export abstract class CrudRestService<
  T extends CrudModel,
> extends ReadRestService<T> {
  constructor(baseUrlTemplate: string) {
    super(baseUrlTemplate);
  }

  create(entity: T, entityToUpdate: T = entity): Observable<T> {
    return this.http
      .post<ModelResponse<T>>(this.baseUrl, this.rootedJson(entity))
      .pipe(map((res) => this.updateEntityFromResponse(res, entityToUpdate)));
  }

  update(entity: T, entityToUpdate: T = entity): Observable<T> {
    return this.http
      .patch<
        ModelResponse<T>
      >(`${this.baseUrl}/${entity.id}`, this.rootedJson(entity))
      .pipe(map((res) => this.updateEntityFromResponse(res, entityToUpdate)));
  }

  remove(id: number): Observable<void> {
    return this.http
      .delete(`${this.baseUrl}/${id}`)
      .pipe(map((_res) => undefined));
  }

  protected rootedJson(entity: T): string {
    const data: Record<string, unknown> = {};
    data["data"] = entity;
    return JSON.stringify(data);
  }
}
