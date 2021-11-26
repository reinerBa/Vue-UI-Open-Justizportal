import { Injectable } from '@angular/core';
import { AuthInfo } from '../model/auth-info';
import moment = require('moment');

const EXPIRES_AT = 'expiresAt';
const TOKEN = 'id_token';
const USER = 'user';

@Injectable()
export class LocalStoreService {
  static username: string = ''
  
  public getAuthInfo(): AuthInfo {
    var authInfo = new AuthInfo();

    authInfo.expiresAt = moment(sessionStorage.getItem(EXPIRES_AT));
    authInfo.username = sessionStorage.getItem(USER);
    authInfo.token = sessionStorage.getItem(TOKEN);

    if (LocalStoreService.username.length >0 && authInfo.username.length >0 && LocalStoreService.username !== authInfo.username) {
      location.reload()
    }
    return authInfo;
  } 
  
  public setAuthInfo(authInfo: AuthInfo) {
    LocalStoreService.username = authInfo? authInfo.username : ''
    if(authInfo) {
      sessionStorage.setItem(USER, authInfo.username);
      sessionStorage.setItem(TOKEN, authInfo.token);
      sessionStorage.setItem(EXPIRES_AT, authInfo.expiresAt.toISOString());
    } else {
      this.clearAuthInfo();
    }
  }

  public clearAuthInfo() {
    sessionStorage.removeItem(USER);
    sessionStorage.removeItem(TOKEN);
    sessionStorage.removeItem(EXPIRES_AT);
  }
}
