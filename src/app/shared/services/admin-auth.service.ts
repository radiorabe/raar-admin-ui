import { Injectable } from "@angular/core";
import { TokenAuthService } from "./token-auth.service";
import { UserModel } from "../models/user.model";
import { environment } from "../../../environments/environment";

@Injectable()
export class AdminAuthService extends TokenAuthService {
  protected tokenKey = "admin_token";

  requestLogin(redirectUrl?: string): void {
    this.redirectUrl = redirectUrl;
    if (this.sso && !this.isUserAuthenticated) {
      // /sso is a virtual path that redirects to SSO
      window.location.href = this.applicationRootUrl + "/sso";
    } else {
      this.router.navigate(["login"]);
    }
  }

  resetUser() {
    super.resetUser();
    this.requestLogin(this.router.url);
  }

  logout() {
    super.logout();
    if (this.sso && environment.logoutUrl) {
      const url = environment.logoutUrl
        .replace("$base_url", this.applicationRootUrl)
        .replace("$redirect_url", this.applicationRootUrl);
      window.location.href = url;
    } else {
      this.requestLogin();
    }
  }

  protected storeUserToken(user: UserModel): void {
    if (user.attributes.admin_token) {
      this.storeToken(this.tokenKey, user.attributes.admin_token);
    }
  }

  private get applicationRootUrl(): string {
    const path = new RegExp(this.router.url + "$");
    return window.location.href.replace(path, "");
  }
}
