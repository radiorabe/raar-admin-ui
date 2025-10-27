import { Component, ChangeDetectionStrategy } from "@angular/core";
import { StatsComponent } from "./stats.component";

@Component({
  selector: "sd-shows-init",
  templateUrl: "shows-init.html",
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [StatsComponent],
})
export class ShowsInitComponent {}
