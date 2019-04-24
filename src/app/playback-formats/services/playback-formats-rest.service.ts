import { Injectable } from "@angular/core";
import { CrudRestService } from "../../shared/services/crud-rest.service";
import { PlaybackFormatModel } from "../models/playback-format.model";
import { HttpClient } from "@angular/common/http";

@Injectable()
export class PlaybackFormatsRestService extends CrudRestService<
  PlaybackFormatModel
> {
  constructor(http: HttpClient) {
    super(http, "/api/admin/playback_formats");
  }

  protected buildEntity(): PlaybackFormatModel {
    return new PlaybackFormatModel();
  }
}
