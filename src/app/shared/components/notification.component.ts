import {
  Component,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  inject,
} from "@angular/core";
import {
  NotificationService,
  Notification,
} from "../services/notification.service";
import { Subject } from "rxjs";
import { takeUntil } from "rxjs/operators";

const NOTIFICATION_DURATION = 5000;

@Component({
  selector: "sd-notification",
  templateUrl: "notification.html",
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NotificationComponent {
  private cd = inject(ChangeDetectorRef);

  current: Notification | undefined;
  show = false;

  private timer: number | undefined;
  private readonly destroy$ = new Subject();

  constructor() {
    const notifications = inject(NotificationService);

    notifications.pipe(takeUntil(this.destroy$)).subscribe((n) => {
      this.current = n;
      this.show = true;
      this.clearTimer();
      this.timer = setTimeout(
        () => this.close(),
        NOTIFICATION_DURATION,
      ) as unknown as number;
      this.cd.markForCheck();
    });
  }

  onDestroy() {
    this.destroy$.next();
  }

  close() {
    this.show = false;
    this.clearTimer();
    this.timer = undefined;
    this.cd.markForCheck();
  }

  private clearTimer(): void {
    if (this.timer) clearTimeout(this.timer);
  }
}
