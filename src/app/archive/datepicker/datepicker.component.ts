import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { ISubscription } from 'rxjs/Subscription';
import * as moment from 'moment';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/interval';
import 'rxjs/add/operator/startWith';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/distinctUntilChanged';

const TODAY_UPDATE_INTERVAL = 5000;

@Component({
  moduleId: module.id,
  selector: 'sd-datepicker',
  templateUrl: 'datepicker.html'
})
export class DatepickerComponent implements OnInit, OnDestroy  {

  public today$ = Observable.interval(TODAY_UPDATE_INTERVAL)
    .startWith(0)
    .map(() => moment().format('YYYY-MM-DD'))
    .distinctUntilChanged()
    .map(dateStr => new Date(dateStr));

  private _date: Date | void;
  private sub: ISubscription;

  public constructor(private router: Router) {
  }

  ngOnInit() {
    this.sub = this.router.events.subscribe(e => {
      if (e instanceof NavigationEnd) {
        this.setDateFromRoute();
      }
    });
  }

  ngOnDestroy() {
    if (this.sub) {
      this.sub.unsubscribe();
    }
  }

  public get date(): Date | void {
    return this._date;
  }

  public set date(date: Date | void) {
    this._date = date;

    if (date !== undefined) {
      this.router.navigate([date.getFullYear(), date.getMonth() + 1, date.getDate()]);
    }
  }

  public getMode(): string {
    return 'day';
  }

  public today(): Date {
    return new Date();
  }

  private setDateFromRoute() {
    const state = <any>this.router.routerState;
    const dateRoute = state.firstChild(state.firstChild(state.root));
    if (dateRoute && dateRoute.url.value[0] && /\d{4}/.test(dateRoute.url.value[0].path)) {
      this.setDateFromParams(dateRoute.snapshot.params);
    }
  }

  private setDateFromParams(params: any) {
    let year = params['year'];
    let month = params['month'];
    let day = params['day'];
    if (year && month && day) {
      this._date = new Date(+year, +month - 1, +day);
    } else {
      this._date = undefined;
    }
  }

}
