import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { map, tap, publishLast, refCount } from "rxjs/operators";
import { ReadRestService } from "./read-rest.service";
import { AudioEncodingModel } from "../models/audio-encoding.model";

@Injectable()
export class AudioEncodingsService extends ReadRestService<AudioEncodingModel> {
  private entries$ = this.getList().pipe(
    map((list) => list.entries),
    tap((entries) =>
      entries.forEach((e) => e.attributes.bitrates.sort((a, b) => b - a)),
    ),
    publishLast(),
    refCount(),
  );

  constructor(http: HttpClient) {
    super(http, "/api/admin/audio_encodings");
  }

  getEntries(): Observable<AudioEncodingModel[]> {
    return this.entries$;
  }

  protected buildEntity(): AudioEncodingModel {
    return new AudioEncodingModel();
  }
}
