import { Injectable, Injector } from "@angular/core";
import {
  HttpInterceptor,
  HttpRequest,
  HttpEvent,
  HttpHandler,
  HttpErrorResponse,
} from "@angular/common/http";
import { Observable, throwError } from "rxjs";
import { catchError } from "rxjs/operators";
import { AdminAuthService } from "./admin-auth.service";

const HTTP_UNAUTHORIZED = 401;

@Injectable()
export class RemoteErrorInterceptor implements HttpInterceptor {
  constructor(private injector: Injector) {
    // Get services depending on HttpClient later using injector to avoid cyclic dependency issues
  }

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    if (req.headers.has("Skip-Error-Handling")) {
      return next.handle(
        req.clone({ headers: req.headers.delete("Skip-Error-Handling") })
      );
    } else {
      return next.handle(req).pipe(catchError((res) => this.handleError(res)));
    }
  }

  private handleError(res: HttpErrorResponse): Observable<HttpEvent<any>> {
    if (res.status === HTTP_UNAUTHORIZED) {
      this.authService.requestLogin();
    } else {
      return throwError(res);
    }
  }

  private get authService(): AdminAuthService {
    return this.injector.get(AdminAuthService);
  }
}
