import { Injectable } from "@angular/core";
import { CrudRestService } from "../../shared/services/crud-rest.service";
import { ArchiveFormatModel } from "../models/archive-format.model";
import { HttpClient } from "@angular/common/http";

@Injectable()
export class ArchiveFormatsRestService extends CrudRestService<ArchiveFormatModel> {
  profileId: number;

  constructor(http: HttpClient) {
    super(http, "/api/admin/profiles/{profileId}/archive_formats");
  }

  protected get baseUrl(): string {
    return this.baseUrlTemplate.replace(
      "{profileId}",
      this.profileId.toString()
    );
  }

  protected buildEntity(): ArchiveFormatModel {
    return new ArchiveFormatModel();
  }
}
