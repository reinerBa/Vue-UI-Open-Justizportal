import { AxiosInstance } from 'axios'
import { AppConfig, AppOperator } from '../ressources/model'
import { AuthService, DownloadService, JSONConfigService, AkteneinsichtService } from './index';

export const APPOPERATORCONFIG: symbol = Symbol()
export const APPCONFIG: symbol = Symbol()

export const AKTENEINSICHTSERVICE: symbol = Symbol()
export const DOWNLOADSERVICE: symbol = Symbol()
export const JSONCONFIGSERVICE: symbol = Symbol()

export function ProvideServices(app: App<Element>, config: AppConfig, http: AxiosInstance){
    app.provide(AKTENEINSICHTSERVICE, new AkteneinsichtService(config, http))
    app.provide(DOWNLOADSERVICE, new DownloadService(config))
}

export async function ProvideConfigs(app: App<Element>, appConfig: AppConfig, operatorConfig: AppOperator) {
    app.provide(APPCONFIG, appConfig)
    app.provide(APPOPERATORCONFIG, operatorConfig)
}