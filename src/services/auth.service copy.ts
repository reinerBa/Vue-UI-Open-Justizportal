import { AuthResponse } from '../model/auth-response';
import { AuthInfo } from '../model/auth-info';
import { ConfigService } from '../contracts';
import { tap, shareReplay } from 'rxjs/operators';
import { LocalStoreService } from './local-store.service';
import moment from 'moment'
import { AuthErrorCodes } from '../model/auth-error-codes';
import { Router } from '@angular/router';
import { AbstractAuthService } from './Contracts/abstractAuth.service';
import {AxiosInstance} from 'axios'
import { AppConfig, AuthResponse } from '../ressources/model'

interface AuthRequest {
  username: string;
  password: string;
}

// eher etwas für vuex actions
export class AuthService extends AbstractAuthService {

  private _config: AppConfig;
  private _expiredTimer: Subscription;

  constructor(private http: AxiosInstance, 
    config: AppConfig,
    private localStore: LocalStoreService, 
    private configService: ConfigService, 
    private router: Router) {
    this._config = config
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

  public async login(userName: string, password: string): Promise<AuthResponse> {
    const authRequest: AuthRequest = {
      username: userName,
      password: password
    }
    const response = await this.http.post<AuthResponse>(this._config.tokenUrl, authRequest)
    if(response.statusText === AuthErrorCodes.Ok) {
      this.storeAuthResponse(authRequest.username, response)
    }
  }

  public async refresh() {
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

  public async logout() {
    this.localStore.clearAuthInfo();
    this.auth.setAuthInfo(null);
    this.router.navigateByUrl('/home');
  }
}
