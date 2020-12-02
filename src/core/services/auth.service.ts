import { Injectable } from '@angular/core';
import { Observable, Subscription, timer } from 'rxjs';
import { AuthResponse } from '../model/auth-response';
import { AuthInfo } from '../model/auth-info';
import { AuthStore } from './auth-store';
import { HttpClient } from '@angular/common/http';
import { ConfigService } from '../contracts';
import { AppConfig } from '../model';
import { tap, shareReplay } from 'rxjs/operators';
import { LocalStoreService } from './local-store.service';
import moment = require('moment');
import { AuthErrorCodes } from '../model/auth-error-codes';
import { Router } from '@angular/router';

interface AuthRequest {
  username: string;
  password: string;
}

@Injectable()
export class AuthService {

  private _config: AppConfig;
  private _expiredTimer: Subscription;

  constructor(private http: HttpClient, private auth: AuthStore, private localStore: LocalStoreService, private configService: ConfigService, private router: Router) {
    this._config = configService.getConfig();
    this.storeAuthInfo(this.loadFromLocalStore());
  }

  private loadFromLocalStore(): AuthInfo {
    const authInfo = this.localStore.getAuthInfo()

    if (authInfo.username && authInfo.token && authInfo.expiresAt && !authInfo.isExpired()) {
      return authInfo;
    } else {
      return null;
    }
  }

  public login(userName: string, password: string): Observable<AuthResponse> {
    const authRequest: AuthRequest = {
      username: userName,
      password: password
    };

    return this.http.post<AuthResponse>(
      this._config.tokenUrl, authRequest
    ).pipe(
      tap(res => {
        if(res.returnCode === AuthErrorCodes.Ok)
          this.storeAuthResponse(authRequest.username, res)
      }),
      shareReplay()
    );
  }

  public refresh() {
    const authInfo = this.auth.getAuthInfo();
    if (authInfo && !authInfo.isExpired()) {
      return this.http.get<AuthResponse>(
        this._config.tokenUrl + '/refresh'
      ).pipe(
        tap(res => this.storeAuthResponse(authInfo.username, res)),
        shareReplay()
      );
    }
  }
  
  private storeAuthInfo(authInfo: AuthInfo) : void {
    this.auth.setAuthInfo(authInfo);
    this.setTimer(authInfo);
  }

  private setTimer(authInfo: AuthInfo) {
    if(this._expiredTimer) {
      this._expiredTimer.unsubscribe();
      this._expiredTimer = null;
    }

    if(authInfo) {
      const dueTime = moment.duration(authInfo.expiresAt.diff(moment.now())).asMilliseconds();

      this._expiredTimer = timer(dueTime).subscribe(t => {
        this._expiredTimer.unsubscribe();
        this._expiredTimer = null;
        this.logout();
      });
    }
  }

  private storeAuthResponse(username: string, response: AuthResponse) : void {
    const authInfo: AuthInfo = new AuthInfo();

    authInfo.username = username;
    authInfo.token = response.authInfo.token;
    authInfo.expiresAt = moment().add(response.authInfo.expiresIn, 'seconds');

    this.localStore.setAuthInfo(authInfo);
    this.storeAuthInfo(authInfo);
  }

  public logout() {
    this.localStore.clearAuthInfo();
    this.auth.setAuthInfo(null);
    this.router.navigateByUrl('/home');
  }
}
