import { Component, OnDestroy, Input, inject } from "@angular/core";
import { Router, NavigationEnd, RouterOutlet } from "@angular/router";

@Component({
  selector: "sd-layout",
  templateUrl: "layout.html",
  imports: [RouterOutlet],
})
export class LayoutComponent implements OnDestroy {
  @Input() collapsibleNav = true;

  private _showNav = false;

  private routerSub = inject(Router).events.subscribe((e) => {
    if (e instanceof NavigationEnd) this._showNav = false;
  });

  get showNav(): boolean {
    return this._showNav;
  }

  get currentYear(): number {
    return new Date().getFullYear();
  }

  toggleNav() {
    this._showNav = !this._showNav;
  }

  ngOnDestroy() {
    this.routerSub.unsubscribe();
  }
}
