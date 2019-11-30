import {Injectable, OnDestroy} from '@angular/core';
import {Subject, Subscription} from 'rxjs';
import {Alert} from 'selenium-webdriver';

export type AlertType = 'success' | 'warning' | 'danger';

export interface Alert {
  type: string;
  text: string;
}

@Injectable()

export class AlertService implements OnDestroy {
  public alert$ = new Subject<Alert>();

  alertSub: Subscription;

  success(text: string) {
    // @ts-ignore
    this.alert$.next({type: 'success', text});
  }

  warnig(text: string) {
    // @ts-ignore
    this.alert$.next({type: 'warnig', text});
  }

  danger(text: string) {
    // @ts-ignore
    this.alert$.next({type: 'danger', text});
  }

  ngOnDestroy(): void {
    if (this.alertSub) {
      this.alertSub.unsubscribe();
    }
  }
}
