import { Injectable } from "@angular/core";
import { CrudRestService } from "../../shared/services/crud-rest.service";
import { AccessCodeModel } from "../models/access-code.model";
import { HttpClient } from "@angular/common/http";

@Injectable()
export class AccessCodesRestService extends CrudRestService<AccessCodeModel> {
  constructor(http: HttpClient) {
    super(http, "/api/admin/access_codes");
  }

  protected buildEntity(): AccessCodeModel {
    return new AccessCodeModel();
  }
}
