import { AuthInfo } from '../ressources/model'
import moment from 'moment'

const EXPIRES_AT = 'expiresAt';
const TOKEN = 'id_token';
const USER = 'user';

export class LocalStoreService {

  public getAuthInfo(): AuthInfo {
    var authInfo = new AuthInfo();

    authInfo.expiresAt = moment(localStorage.getItem(EXPIRES_AT));
    authInfo.username = localStorage.getItem(USER);
    authInfo.token = localStorage.getItem(TOKEN);

    return authInfo;
  } 

  public setAuthInfo(authInfo: AuthInfo) {
    if(authInfo) {
      localStorage.setItem(USER, authInfo.username);
      localStorage.setItem(TOKEN, authInfo.token);
      localStorage.setItem(EXPIRES_AT, authInfo.expiresAt.toISOString());
    } else {
      this.clearAuthInfo();
    }
  }

  public clearAuthInfo() {
    localStorage.removeItem(USER);
    localStorage.removeItem(TOKEN);
    localStorage.removeItem(EXPIRES_AT);
  }
}
