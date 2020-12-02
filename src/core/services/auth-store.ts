import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

import { AuthInfo } from '../model/auth-info';

@Injectable()
export class AuthStore {
  private _authInfo: BehaviorSubject<AuthInfo> = new BehaviorSubject(null);
  public readonly authInfo$: Observable<AuthInfo> = this._authInfo.asObservable();

  constructor() { 
  }

  public setAuthInfo(authInfo: AuthInfo) {
    this._authInfo.next(authInfo);
  }

  public getAuthInfo(): AuthInfo {
    return this._authInfo.getValue();
  }
}