import { Injectable } from "@angular/core";
import { CrudRestService } from "../../shared/services/crud-rest.service";
import { ArchiveFormatModel } from "../models/archive-format.model";

@Injectable()
export class ArchiveFormatsRestService extends CrudRestService<ArchiveFormatModel> {
  profileId: number;

  constructor() {
    super("/api/admin/profiles/{profileId}/archive_formats");
  }

  protected get baseUrl(): string {
    return this.baseUrlTemplate.replace(
      "{profileId}",
      this.profileId.toString(),
    );
  }

  protected buildEntity(): ArchiveFormatModel {
    return new ArchiveFormatModel();
  }
}
