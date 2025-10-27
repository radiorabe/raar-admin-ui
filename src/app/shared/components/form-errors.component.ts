import { Component, Input, ChangeDetectionStrategy } from "@angular/core";

@Component({
    selector: "sd-form-errors",
    changeDetection: ChangeDetectionStrategy.OnPush,
    template: `
    @for (e of errors; track e) {
      <div class="alert alert-danger">
        {{ e }}
      </div>
    }
  `,
    standalone: false
})
export class FormErrorsComponent {
  @Input() errors: string[];
}
