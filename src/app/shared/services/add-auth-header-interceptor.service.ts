import { Injectable, inject } from "@angular/core";
import {
  HttpInterceptor,
  HttpRequest,
  HttpEvent,
  HttpHandler,
} from "@angular/common/http";
import { Observable } from "rxjs";
import { AdminAuthService } from "./admin-auth.service";

export const MEDIA_TYPE_JSON_API = "application/vnd.api+json";

@Injectable()
export class AddAuthHeaderInterceptor<T> implements HttpInterceptor {
  private auth = inject(AdminAuthService);

  intercept(
    req: HttpRequest<T>,
    next: HttpHandler,
  ): Observable<HttpEvent<unknown>> {
    return next.handle(this.transformRequest(req));
  }

  private transformRequest(req: HttpRequest<T>): HttpRequest<T> {
    req = this.addAuthToken(req);
    req = this.setContentType(req);
    return req;
  }

  private setContentType(req: HttpRequest<T>): HttpRequest<T> {
    if (!req.headers.has("Content-Type")) {
      return req.clone({
        headers: req.headers.set("Content-Type", MEDIA_TYPE_JSON_API),
      });
    }
    return req;
  }

  protected addAuthToken(req: HttpRequest<T>): HttpRequest<T> {
    if (!req.headers.has("Authorization")) {
      return req.clone({
        headers: req.headers.set(
          "Authorization",
          'Token token="' + this.auth.token + '"',
        ),
      });
    }
    return req;
  }
}
