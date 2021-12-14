import { AxiosRequestConfig } from "axios"
import { AuthStore } from "src/store/authStore"
import { AppConfig } from "../models/app-config"

export type AppConfigGetter = () => AppConfig
interface Headers {Authorization: string}

export abstract class JpHttpServiceAbstract{
  protected _token: string =''
  protected _authStore: AuthStore
  
  protected GetConfig: AppConfigGetter
  
  protected GetHeaders(): AxiosRequestConfig<Headers> {
    return {headers: {Authorization: `Bearer ${this._authStore.useStore().token.value}`}}
  }

  constructor(authStore: AuthStore,  getConfig: AppConfigGetter) {
    this.GetConfig = getConfig 
    this._authStore = authStore
  }
}
