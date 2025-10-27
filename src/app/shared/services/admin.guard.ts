import { Injectable, inject } from "@angular/core";
import { ActivatedRouteSnapshot, RouterStateSnapshot } from "@angular/router";
import { Observable } from "rxjs";
import { AdminAuthService } from "./admin-auth.service";
import { tap } from "rxjs/operators";

@Injectable()
export class AdminGuard {
  private auth = inject(AdminAuthService);

  canActivate(
    _route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot,
  ): Observable<boolean> | Promise<boolean> | boolean {
    return this.auth.isLoggedIn.pipe(
      tap((loggedIn) => {
        if (!loggedIn) {
          this.auth.requestLogin(state.url);
        }
      }),
    );
  }
}
