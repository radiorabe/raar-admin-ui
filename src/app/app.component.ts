import { Component, ChangeDetectionStrategy } from "@angular/core";
import { RouterOutlet } from "@angular/router";
import { NotificationComponent } from "./shared/components/notification.component";

@Component({
  selector: "sd-app",
  templateUrl: "app.html",
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RouterOutlet, NotificationComponent],
})
export class AppComponent {}
