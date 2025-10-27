import { Injectable, inject } from "@angular/core";
import { ModelsService } from "../../shared/services/models.service";
import { ProfileModel } from "../models/profile.model";
import { ProfilesRestService } from "./profiles-rest.service";

@Injectable()
export class ProfilesService extends ModelsService<ProfileModel> {
  protected crudRest = inject(ProfilesRestService);
  protected sortAttr = "name";

  getDefaultEntry(): ProfileModel | undefined {
    return this.entries.find((e) => e.attributes.default);
  }
}
