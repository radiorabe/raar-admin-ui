import { Injectable, inject } from "@angular/core";
import { ModelsService } from "../../shared/services/models.service";
import { AccessCodeModel } from "../models/access-code.model";
import { AccessCodesRestService } from "./access-codes-rest.service";

@Injectable()
export class AccessCodesService extends ModelsService<AccessCodeModel> {
  protected crudRest = inject(AccessCodesRestService);
  protected sortAttr = "expires_at";

  protected sortEntries(entries: AccessCodeModel[]): AccessCodeModel[] {
    return entries.sort((a: AccessCodeModel, b: AccessCodeModel) => {
      if (a.attributes.expires_at && b.attributes.expires_at) {
        return (
          a.attributes.expires_at.getTime() - b.attributes.expires_at!.getTime()
        );
      } else if (a.attributes.expires_at) {
        return 1;
      } else if (b.attributes.expires_at) {
        return -1;
      } else {
        return 0;
      }
    });
  }
}
