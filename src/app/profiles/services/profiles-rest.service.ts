import { Injectable } from "@angular/core";
import { CrudRestService } from "../../shared/services/crud-rest.service";
import { ProfileModel } from "../models/profile.model";

@Injectable()
export class ProfilesRestService extends CrudRestService<ProfileModel> {
  constructor() {
    super("/api/admin/profiles");
  }

  protected buildEntity(): ProfileModel {
    return new ProfileModel();
  }
}
