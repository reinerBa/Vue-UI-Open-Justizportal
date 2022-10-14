// SPDX-FileCopyrightText: © 2019 Oberverwaltungsgericht Rheinland-Pfalz <poststelle@ovg.jm.rlp.de>, Reiner Bamberger <4329883+reinerBa@users.noreply.github.com>
// SPDX-License-Identifier: EUPL-1.2
import { AuthResponse } from '../models/auth-response'
import { AuthInfo } from '../models/auth-info'
import moment from 'moment'
import axios, { AxiosResponse } from 'axios'
import { InjectionKey } from 'vue'
import { JpHttpServiceAbstract } from './JpHttpServiceAbstract'
import { DtoAkteneinsicht, DtOStatistic, ReturnCodes, LoginInformations } from './../../libs/models/api'

export const AuthServiceKey: InjectionKey<AuthService> = Symbol('AuthService')

export class AuthService  extends JpHttpServiceAbstract{

  private _lastErrorInfo: ''
  public LastErrorInfo() { return this._lastErrorInfo }

  public async Login(userName: string, password: string): Promise<ReturnCodes>{
    const authRequest: LoginInformations = {
      username: userName,
      password: password
    }
  
    let response = await axios.post<AuthResponse>(this.GetConfig().tokenUrl, authRequest)
    let data = response.data
    if (response.status === 200 && data.returnCode === ReturnCodes.Ok) {

      this._token = data.authInfo.token
      let rValue = new AuthInfo({
        token: data.authInfo.token, 
        username: userName, 
        expiresAt: moment.now() + data.authInfo.expiresIn * 1e3
      })
      this._authStore.setAuthInfo(rValue)
    }
  
    return response.data.returnCode as ReturnCodes  
  }

  public async Refresh(): Promise<ReturnCodes> { // Promise<AxiosResponse<AuthResponse>> {
    let response = await axios.get<AuthResponse>(this.GetConfig().tokenUrl + '/refresh', this.GetHeaders())
  
    if (response.status === 200) {
      let data = response.data
      this._authStore.ResetTimer(data.authInfo.token, data.authInfo.expiresIn)
    } 
  
    return response.data.returnCode as ReturnCodes
  }

  Logout(): void {
    this._authStore.logout()
  }

  public async verifyStatisticPassword (password: string): Promise<boolean>{
    try{
      let response = await axios.post(this.GetConfig().statisticUrl + "verifyPassword/"+ password)
    if(response)
      return true
    }catch(e){
      console.error(e)
    }
    return false
  }
}
/*
export async function Login(userName: string, password: string): Promise<AuthErrorCodes> {//Promise<AxiosResponse<AuthResponse>> {
  const authRequest: LoginInformations = {
    username: userName,
    password: password
  }

  let response = await axios.post<AuthResponse>(config.tokenUrl, authRequest)
  if (response.status === 200) {
    let data = response.data
    let rValue = new AuthInfo({
      token: data.authInfo.token, 
      username: userName, 
      expiresAt: moment.now() + data.authInfo.expiresIn * 1e3
    })
    useStore().setAuthInfo(rValue)
  }

  return response.data.returnCode as AuthErrorCodes
}

export async function Refresh(): Promise<AuthErrorCodes> { // Promise<AxiosResponse<AuthResponse>> {
  let response = await axios.get<AuthResponse>(config.tokenUrl + '/refresh')

  if (response.status === 200) {
    let data = response.data
    useStore().resetTimer(data.authInfo.token, data.authInfo.expiresIn)
  } 

  return response.data.returnCode as AuthErrorCodes
/*  .then((response: AxiosResponse<AuthResponse>) => {
    if (response.data.returnCode !== AuthErrorCodes.Ok) return response.data.returnCode 
    useStore().setAuthInfo()
    useStore().resetTimer()
    return true
  })
  .catch((error) => {
    return false
  }) */
// }
/*
export function Logout(): void {
  useStore().logout()
}
/*
export class AuthService {

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

  public async verifyStatisticPassword (password: string) {
    let response = await fetch(
      this._config.statisticUrl + "verifyPassword/"+ password, {method: "POST"}
    )
    let result = await response.json()
    if(result)
      return true
    return false
  }
}
*/
