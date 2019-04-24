import { Injectable } from "@angular/core";
import { CrudRestService } from "../../shared/services/crud-rest.service";
import { ProfileModel } from "../models/profile.model";
import { HttpClient } from "@angular/common/http";

@Injectable()
export class ProfilesRestService extends CrudRestService<ProfileModel> {
  constructor(http: HttpClient) {
    super(http, "/api/admin/profiles");
  }

  protected buildEntity(): ProfileModel {
    return new ProfileModel();
  }
}
