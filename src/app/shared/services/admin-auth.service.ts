import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { TokenAuthService } from "./token-auth.service";
import { LoginService } from "./login.service";
import { UserModel } from "../models/user.model";

@Injectable()
export class AdminAuthService extends TokenAuthService {
  protected tokenKey = "admin_token";

  constructor(login: LoginService, router: Router) {
    super(login, router);
  }

  protected get isUserAuthenticated(): boolean {
    return !!this.user && this.hasToken;
  }

  resetUser() {
    super.resetUser();
    this.redirectUrl = this.router.url;
    this.router.navigate(["login"]);
  }

  protected storeUserToken(user: UserModel): void {
    if (user.attributes.admin_token) {
      this.storeToken(this.tokenKey, user.attributes.admin_token);
    }
  }
}
