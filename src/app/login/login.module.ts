import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { SharedModule } from "../shared/shared.module";
import { LoginRoutes } from "./login.routes";
import { LoginPageComponent } from "./components/login-page.component";

@NgModule({
  imports: [SharedModule, RouterModule.forChild(LoginRoutes)],
  declarations: [LoginPageComponent],
  exports: [],
  providers: [],
})
export class LoginModule {}
