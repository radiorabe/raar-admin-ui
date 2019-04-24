import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { AdminGuard } from "../shared/services/admin.guard";
import { PlaybackFormatsComponent } from "./components/playback-formats.component";
import { PlaybackFormatsInitComponent } from "./components/playback-formats-init.component";
import { PlaybackFormatFormComponent } from "./components/playback-format-form.component";

export const routes: Routes = [
  {
    path: "playback_formats",
    component: PlaybackFormatsComponent,
    canActivate: [AdminGuard],
    children: [
      {
        path: "new",
        component: PlaybackFormatFormComponent
      },
      {
        path: ":id",
        component: PlaybackFormatFormComponent
      },
      {
        path: "",
        component: PlaybackFormatsInitComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PlaybackFormatsRoutingModule {}
