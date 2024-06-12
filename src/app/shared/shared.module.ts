import { NgModule, ModuleWithProviders } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { RouterModule } from "@angular/router";
import { SmallModalComponent } from "./components/small-modal.component";
import { LoginWindowService } from "./services/login-window.service";
import { TokenAuthService } from "./services/token-auth.service";
import { LayoutComponent } from "./components/layout.component";
import { LoginService } from "./services/login.service";
import {
  HTTP_INTERCEPTORS,
  provideHttpClient,
  withInterceptorsFromDi,
} from "@angular/common/http";
import { AddAuthHeaderInterceptor } from "./services/add-auth-header-interceptor.service";
import { RemoteErrorInterceptor } from "./services/remote-error-interceptor.service";
import { FieldErrorsComponent } from "./components/field-errors.component";
import { FormErrorsComponent } from "./components/form-errors.component";
import { TopNavComponent } from "./components/top-nav.component";
import { AdminGuard } from "./services/admin.guard";
import { AdminAuthService } from "./services/admin-auth.service";
import { AddButtonComponent } from "./components/add-button.component";

const interceptors = [
  {
    provide: HTTP_INTERCEPTORS,
    useClass: AddAuthHeaderInterceptor,
    multi: true,
  },
  { provide: HTTP_INTERCEPTORS, useClass: RemoteErrorInterceptor, multi: true },
];

@NgModule({
  declarations: [
    LayoutComponent,
    SmallModalComponent,
    FieldErrorsComponent,
    FormErrorsComponent,
    TopNavComponent,
    AddButtonComponent,
  ],
  exports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    LayoutComponent,
    SmallModalComponent,
    FieldErrorsComponent,
    FormErrorsComponent,
    TopNavComponent,
    AddButtonComponent,
  ],
  imports: [CommonModule, FormsModule, ReactiveFormsModule, RouterModule],
})
export class SharedModule {
  static forRoot(): ModuleWithProviders<SharedModule> {
    return {
      ngModule: SharedModule,
      providers: [
        LoginService,
        { provide: TokenAuthService, useExisting: AdminAuthService },
        LoginWindowService,
        AdminGuard,
        AdminAuthService,
        provideHttpClient(withInterceptorsFromDi()),
        ...interceptors,
      ],
    };
  }
}
