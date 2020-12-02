import { Component, OnInit, OnDestroy, AfterViewInit } from '@angular/core';
import { AuthService, AuthStore } from '@jp-suite/core';

import { timer, Subscription, Observable, BehaviorSubject } from 'rxjs';
import { Duration, duration, now } from 'moment';
import { AuthInfo } from 'libs/core/src/lib/model/auth-info';

declare var componentHandler: any;

@Component({
  selector: 'jp-auth-info',
  templateUrl: './auth-info.component.html',
  styleUrls: ['./auth-info.component.css']
})
export class AuthInfoComponent implements OnInit, OnDestroy, AfterViewInit {
  updateTimer: any;
  updateTimerSub: Subscription;

  constructor(private authService: AuthService, public auth: AuthStore) { 
    const authInfo = this.auth.getAuthInfo();
  }

  ngOnInit() {
  }

  ngOnDestroy() {
    this.updateTimerSub.unsubscribe();
    this.updateTimer = null;
  }

  ngAfterViewInit(): void {
    componentHandler.upgradeAllRegistered();
  }

  logout() {
    this.authService.logout();
  }

  refresh() {
    this.authService.refresh().subscribe(
      () => { }
    );
  }
}
