import { Router } from "@angular/router";
import { LoginService } from "./login.service";
import { Observable, of } from "rxjs";
import { map, catchError } from "rxjs/operators";
import { UserModel } from "../models/user.model";
import { environment } from "../../../environments/environment";

export class TokenAuthService {
  protected _redirectUrl: string | void;

  protected tokenKey = "api_token";

  private _user: UserModel | void;

  private _initialized = false;

  constructor(
    protected login: LoginService,
    protected router: Router,
  ) {}

  get isLoggedIn(): Observable<boolean> {
    return this.checkUserAuth().pipe(map((_) => this.isUserAuthenticated));
  }

  get hasToken(): boolean {
    return !!this.token;
  }

  get user(): UserModel | void {
    return this._user;
  }

  setUser(user: UserModel | void) {
    this._user = user;
    if (user) this.storeUserToken(user);
    if (this._redirectUrl) {
      this.router.navigate([this._redirectUrl]);
      this._redirectUrl = undefined;
    }
  }

  set redirectUrl(url: string) {
    if (!this._redirectUrl) {
      this._redirectUrl = url;
    }
  }

  get token(): string {
    return this.getToken(this.tokenKey);
  }

  logout() {
    this._user = undefined;
    this.clearToken(this.tokenKey);
  }

  resetUser() {
    this._initialized = false;
    this._user = undefined;
  }

  get isUserAuthenticated(): boolean {
    return !!this._user;
  }

  protected storeUserToken(user: UserModel): void {
    this.storeToken(this.tokenKey, user.attributes.api_token);
  }

  protected getToken(key: string): string {
    try {
      return window.localStorage.getItem(key) || "";
    } catch (_e) {
      if (this.user) {
        return (<unknown>this.user.attributes)[key] || "";
      } else {
        return "";
      }
    }
  }

  protected storeToken(key: string, value: string) {
    if (!value) return;
    try {
      window.localStorage.setItem(key, value);
    } catch (_e) {
      // no local storage, no problem
    }
  }

  protected clearToken(key: string) {
    try {
      window.localStorage.removeItem(key);
    } catch (_e) {
      // no local storage, no problem
    }
  }

  protected checkUserAuth(): Observable<void> {
    if (!this._initialized) {
      this._initialized = true;
      return this.checkAuth(this.tokenKey);
    } else {
      return of(undefined);
    }
  }

  protected checkAuth(key: string): Observable<void> {
    const token = this.getToken(key);
    if (token) {
      return this.runAuthCheck(this.login.get(token), key);
    } else if (this.sso) {
      return this.runAuthCheck(this.login.sso(), key);
    } else {
      return of(undefined);
    }
  }

  protected runAuthCheck(
    check: Observable<UserModel>,
    key: string,
  ): Observable<void> {
    return check.pipe(
      map((user) => {
        this.setUser(user);
        return undefined;
      }),
      catchError((_err) => {
        this.clearToken(key);
        return of(undefined);
      }),
    );
  }

  protected get sso(): boolean {
    return environment.authenticationMethod === "sso";
  }
}
