import { Component, Input, ChangeDetectionStrategy } from "@angular/core";
import { RouterLink } from "@angular/router";

@Component({
  selector: "sd-add-button",
  templateUrl: "add-button.html",
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RouterLink],
})
export class AddButtonComponent {
  @Input() link: string[];
}
