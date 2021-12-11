import { AuthInfo } from '../ressources/model'
import * as moment from 'moment'

const EXPIRES_AT = 'expiresAt';
const TOKEN = 'id_token';
const USER = 'user';

  export function getAuthInfo(): AuthInfo {
    var authInfo = new AuthInfo();

    authInfo.expiresAt = moment(localStorage.getItem(EXPIRES_AT));
    authInfo.username = localStorage.getItem(USER);
    authInfo.token = localStorage.getItem(TOKEN);

    return authInfo;
  } 

  export function setAuthInfo(authInfo: AuthInfo) {
    if(authInfo) {
      localStorage.setItem(USER, authInfo.username);
      localStorage.setItem(TOKEN, authInfo.token);
      localStorage.setItem(EXPIRES_AT, authInfo.expiresAt.toISOString());
    } else {
      this.clearAuthInfo();
    }
  }

  export function clearAuthInfo() {
    localStorage.removeItem(USER);
    localStorage.removeItem(TOKEN);
    localStorage.removeItem(EXPIRES_AT);
  }

