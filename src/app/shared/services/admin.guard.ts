import { Injectable } from "@angular/core";
import {
  Router,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
} from "@angular/router";
import { Observable } from "rxjs";
import { AdminAuthService } from "./admin-auth.service";
import { tap } from "rxjs/operators";

@Injectable()
export class AdminGuard {
  constructor(private auth: AdminAuthService, private router: Router) {}

  canActivate(
    _route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> | Promise<boolean> | boolean {
    return this.auth.isLoggedIn.pipe(
      tap((loggedIn) => {
        if (!loggedIn) {
          this.auth.requestLogin(state.url);
        }
      })
    );
  }
}
