import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { AdminGuard } from "../shared/services/admin.guard";
import { ShowsComponent } from "./components/shows.component";
import { ShowsInitComponent } from "./components/shows-init.component";
import { ShowFormComponent } from "./components/show-form.component";

export const routes: Routes = [
  {
    path: "shows",
    component: ShowsComponent,
    canActivate: [AdminGuard],
    children: [
      {
        path: "new",
        component: ShowFormComponent,
      },
      {
        path: ":id",
        component: ShowFormComponent,
      },
      {
        path: "",
        component: ShowsInitComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ShowsRoutingModule {}
