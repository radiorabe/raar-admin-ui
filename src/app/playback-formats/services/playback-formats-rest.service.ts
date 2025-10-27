import { Injectable } from "@angular/core";
import { CrudRestService } from "../../shared/services/crud-rest.service";
import { PlaybackFormatModel } from "../models/playback-format.model";

@Injectable()
export class PlaybackFormatsRestService extends CrudRestService<PlaybackFormatModel> {
  constructor() {
    super("/api/admin/playback_formats");
  }

  protected buildEntity(): PlaybackFormatModel {
    return new PlaybackFormatModel();
  }
}
