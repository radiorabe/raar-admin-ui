import { Routes, RouterModule } from "@angular/router";
import { AdminGuard } from "../shared/services/admin.guard";
import { ProfilesComponent } from "./components/profiles.component";
import { ProfilesInitComponent } from "./components/profiles-init.component";
import { ProfileFormComponent } from "./components/profile-form.component";
import { NgModule } from "@angular/core";

export const routes: Routes = [
  {
    path: "profiles",
    component: ProfilesComponent,
    canActivate: [AdminGuard],
    children: [
      {
        path: "new",
        component: ProfileFormComponent,
      },
      {
        path: ":id",
        component: ProfileFormComponent,
      },
      {
        path: "",
        component: ProfilesInitComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProfilesRoutingModule {}
