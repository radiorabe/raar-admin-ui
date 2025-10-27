import { Component, Input, ChangeDetectionStrategy } from "@angular/core";

@Component({
    selector: "sd-field-errors",
    changeDetection: ChangeDetectionStrategy.OnPush,
    template: `
    @for (e of errors; track e) {
      <span class="help text-danger">
        {{ e }}
      </span>
    }
  `,
    standalone: false
})
export class FieldErrorsComponent {
  @Input() errors: string[];
}
