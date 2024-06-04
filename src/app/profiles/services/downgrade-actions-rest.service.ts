import { Injectable } from "@angular/core";
import { CrudRestService } from "../../shared/services/crud-rest.service";
import { DowngradeActionModel } from "../models/downgrade-action.model";
import { HttpClient } from "@angular/common/http";

@Injectable()
export class DowngradeActionsRestService extends CrudRestService<DowngradeActionModel> {
  profileId: number;
  archiveFormatId: number;

  constructor(http: HttpClient) {
    super(
      http,
      "/api/admin/profiles/{profileId}/archive_formats/{archiveFormatId}/downgrade_actions"
    );
  }

  protected get baseUrl(): string {
    return this.baseUrlTemplate
      .replace("{profileId}", this.profileId.toString())
      .replace("{archiveFormatId}", this.archiveFormatId.toString());
  }

  protected buildEntity(): DowngradeActionModel {
    return new DowngradeActionModel();
  }
}
