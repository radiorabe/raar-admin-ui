import {Component} from '@angular/core';
import {Router, ActivatedRoute} from '@angular/router';
import {Observable} from 'rxjs/Observable';
import {ISubscription} from 'rxjs/Subscription';
import {BroadcastModel} from '../../shared/models/broadcast.model';
import {BroadcastsService} from '../../shared/services/broadcasts.service';
import {DateParamsService, RouteParams} from '../../shared/services/date_params.service';
import * as moment from 'moment/moment';

@Component({
  moduleId: module.id,
  selector: 'sd-broadcasts-date',
  templateUrl: 'broadcasts_date.html'
})
export class BroadcastsDateComponent {

  date: Date;
  dateWithTime: Date;
  broadcasts: Observable<BroadcastModel[]>;

  private dateSub: ISubscription;
  private dateWithTimeSub: ISubscription;

  constructor(private route: ActivatedRoute,
              private router: Router,
              private broadcastsService: BroadcastsService) {
  }

  ngOnInit() {
    const paramsObservable = this.route.params.distinctUntilChanged();
    const dateObservable = paramsObservable.map(params => this.getDate(params));

    this.dateSub = dateObservable.subscribe(date => this.date = date);
    this.dateWithTimeSub = paramsObservable
      .subscribe(params => this.dateWithTime = this.getDateWithTime(params));
    this.broadcasts = dateObservable
      .map(date => date.getTime()) // required to test date changes
      .distinctUntilChanged()
      .flatMap(date => this.broadcastsService.getListForDate(new Date(date)))
      .map(list => list.entries);
  }

  ngOnDestroy() {
    this.dateSub.unsubscribe();
    this.dateWithTimeSub.unsubscribe();
  }

  prevDate() {
    this.navigateTo(moment(this.date).subtract(1, 'd').toDate());
  }

  nextDate() {
    if (!this.nextDateDisabled()) {
      this.navigateTo(moment(this.date).add(1, 'd').toDate());
    }
  }

  nextDateDisabled(): boolean {
    return this.date >= moment().startOf('day').toDate();
  }

  getCrudIdentifier(i: number, model: BroadcastModel): number {
    return model.id;
  }

  isExpanded(broadcast: BroadcastModel): boolean {
    return this.dateWithTime && broadcast.isCovering(this.dateWithTime);
  }

  private navigateTo(date: Date) {
    this.router.navigate([date.getFullYear(), date.getMonth() + 1, date.getDate()]);
  }

  private getDate(params: RouteParams): Date {
    if (params['year']) {
      return DateParamsService.dateFromParams(params);
    } else {
      return new Date();
    }
  }

  private getDateWithTime(params: RouteParams): Date {
    if (params['time'] && params['time'].length >= 4) {
      return DateParamsService.timeFromParams(params);
    } else {
      return undefined;
    }
  }
}