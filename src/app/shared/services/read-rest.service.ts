import { CrudModel } from "../models/crud.model";
import { CrudList } from "../models/crud-list";
import { HttpClient, HttpParams } from "@angular/common/http";
import { Observable, BehaviorSubject } from "rxjs";
import { map } from "rxjs/operators";
import { inject } from "@angular/core";

export type ListResponse<T extends CrudModel> = {
  data: T[];
  included: unknown[];
  links: {
    next: string;
    prev: string;
  };
};

export type ModelResponse<T extends CrudModel> = {
  data: T;
};

export abstract class ReadRestService<T extends CrudModel> {
  protected http = inject(HttpClient);

  constructor(public baseUrlTemplate: string) {}

  getList(params?: Record<string, unknown>): Observable<CrudList<T>> {
    return this.http
      .get<ListResponse<T>>(this.baseUrl, this.requestOptionsFromParams(params))
      .pipe(map((json) => this.buildListFromResponse(json, this.buildEntity)));
  }

  getNextEntries(list: CrudList<T>): Observable<CrudList<T>> {
    if (list.links.next === undefined || list.links.next === null) {
      return new BehaviorSubject<CrudList<T>>(list);
    }

    return this.http.get<ListResponse<T>>(list.links.next).pipe(
      map((json) => this.buildListFromResponse(json, this.buildEntity)),
      map((res) => {
        res.links.prev = list.links.prev;
        res.entries = list.entries.concat(res.entries);
        res.included = list.included.concat(res.included);
        return res;
      }),
    );
  }

  // load a new entity by id or reload an existing one
  get(entityOrId: number | T): Observable<T> {
    let id: number;
    let entity: T;
    if (typeof entityOrId === "number") {
      id = entityOrId;
      entity = this.buildEntity();
    } else {
      id = entityOrId.id;
      entity = entityOrId;
    }
    return this.http
      .get<ModelResponse<T>>(`${this.baseUrl}/${id}`)
      .pipe(map((json) => this.updateEntityFromResponse(json, entity)));
  }

  protected get baseUrl(): string {
    return this.baseUrlTemplate;
  }

  protected buildListFromResponse<R extends CrudModel>(
    json: ListResponse<R>,
    builder: () => R,
  ): CrudList<R> {
    const list = new CrudList<R>();
    list.entries = json["data"].map((item: R) =>
      this.copyAttributes(item, builder()),
    );
    Object.assign(list.links, json["links"]);

    return list;
  }

  protected updateEntityFromResponse<R extends CrudModel>(
    json: ModelResponse<R>,
    entity: R,
  ): R {
    return this.copyAttributes(json["data"], entity);
  }

  protected copyAttributes<R extends CrudModel>(source: unknown, dest: R): R {
    Object.assign(dest, source);
    dest.init();
    return dest;
  }

  protected buildEntity(): T {
    throw new Error(
      `${this.constructor.name}#buildEntity() is not implemented`,
    );
  }

  protected requestOptionsFromParams(params?: Record<string, unknown>): {
    params?: HttpParams;
  } {
    if (!params) return {};
    return {
      params: Object.keys(params)
        .filter(this.paramFilter(params))
        .reduce(
          (s, key) => s.append(key, params[key] as string),
          new HttpParams(),
        ),
    };
  }

  private paramFilter(
    params: Record<string, unknown>,
  ): (key: string) => boolean {
    return (key) =>
      params[key] != null &&
      ((typeof params[key] !== "string" && !Array.isArray(params[key])) ||
        (params[key] as string | unknown[]).length !== 0);
  }
}
