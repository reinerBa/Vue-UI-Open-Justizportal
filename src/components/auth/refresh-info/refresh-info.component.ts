import { Component, OnInit } from '@angular/core';
import { AuthService, AuthStore } from '@jp-suite/core';
import { DebugContext } from '@angular/core/src/view';
import { debug } from 'util';

import { Subscription } from 'rxjs/internal/Subscription';
import { timer } from 'rxjs';
import { duration, now } from 'moment';
import { AuthInfo } from 'libs/core/src/lib/model/auth-info';

@Component({
  selector: 'jp-refresh-info',
  templateUrl: './refresh-info.component.html',
  styleUrls: ['./refresh-info.component.css']
})
export class RefreshInfoComponent implements OnInit {

  private _updateTimerSub: Subscription;
  public SnackbarVisible:boolean;
  public ShowSnackbar:boolean;
  private SECONDS = 60;

  constructor(private authService: AuthService, public auth: AuthStore) {
  }

  ngOnInit() {
    this.resetTimer();
  }

  resetTimer() {
    this._updateTimerSub = timer(0, 1000).subscribe(t => {
      const authInfo:AuthInfo = this.auth.getAuthInfo();
      if(!authInfo) {
        this.ShowSnackbar=false;
        this.SnackbarVisible=false;
      }
      if(authInfo) {
        const sec=duration(authInfo.expiresAt.diff(now())).asSeconds();
        if (sec<this.SECONDS) { this.ShowSnackbar=true; }
        else { this.ShowSnackbar=false; }
        if (sec<=(this.SECONDS+1)) { this.SnackbarVisible=true; }
        else { this.SnackbarVisible=false; }
      }
    });
  }

  refresh() {
    this.authService.refresh().subscribe(
      () => { }
    );
    this.ShowSnackbar=false;
  }

}
