import { Injectable } from "@angular/core";
import { CrudRestService } from "../../shared/services/crud-rest.service";
import { AccessCodeModel } from "../models/access-code.model";

@Injectable()
export class AccessCodesRestService extends CrudRestService<AccessCodeModel> {
  constructor() {
    super("/api/admin/access_codes");
  }

  protected buildEntity(): AccessCodeModel {
    return new AccessCodeModel();
  }
}
