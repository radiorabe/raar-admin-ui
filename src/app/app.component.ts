import { Component, ChangeDetectionStrategy } from "@angular/core";

@Component({
    selector: "sd-app",
    templateUrl: "app.html",
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: false
})
export class AppComponent {}
