import {
  Component,
  ChangeDetectionStrategy,
  ViewChild,
  ElementRef,
  ChangeDetectorRef,
} from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { HttpClient } from "@angular/common/http";
import { finalize } from "rxjs/operators";

@Component({
    selector: "sd-stats",
    templateUrl: "stats.html",
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: false
})
export class StatsComponent {
  statsForm: FormGroup;

  loading = false;

  @ViewChild("downloadLink", { static: true })
  private downloadLink: ElementRef;

  constructor(
    fb: FormBuilder,
    private http: HttpClient,
    private cd: ChangeDetectorRef,
  ) {
    this.createStatsForm(fb);
  }

  downloadStats(): void {
    this.loading = true;
    this.http
      .get(this.statsUrl, { responseType: "blob" })
      .pipe(
        finalize(() => {
          this.loading = false;
          this.cd.markForCheck();
        }),
      )
      .subscribe((blob) => this.openBlob(blob));
  }

  private createStatsForm(fb: FormBuilder): void {
    this.statsForm = fb.group({
      year: [new Date().getFullYear(), Validators.required],
      month: [
        null,
        Validators.compose([Validators.min(1), Validators.max(12)]),
      ],
    });
  }

  private openBlob(blob: Blob): void {
    const fileUrl = window.URL.createObjectURL(blob);
    const link = this.downloadLink.nativeElement;
    link.href = fileUrl;
    link.download = this.statsFileName;
    link.click();
    window.URL.revokeObjectURL(fileUrl);
  }

  private get statsUrl(): string {
    let url = `/api/admin/stats/${this.year}`;
    if (this.month) url += `/${this.zeroPad(this.month)}`;
    return url;
  }

  private get statsFileName(): string {
    let name = `raar-stats-${this.year}`;
    if (this.month) name += this.zeroPad(this.month);
    return `${name}.csv`;
  }

  private get year(): number {
    return this.statsForm.controls.year.value;
  }

  private get month(): number | null {
    return this.statsForm.controls.month.value;
  }

  private zeroPad(n: number): string {
    return ("0" + n).slice(-2);
  }
}
