import axios, { AxiosRequestConfig, AxiosResponse } from 'axios'
import { config } from '../../store/configStore'
import {Akteneinsicht} from '../../libs/models/akteneinsicht'
import { InjectionKey } from "@vue/runtime-core";
import {JpHttpServiceAbstract} from './JpHttpServiceAbstract'

interface Headers {Authorization: string}
export const AktenServiceKey: InjectionKey<AktenService> = Symbol('AktenService')

export class AktenService extends JpHttpServiceAbstract {

  public GetAkteneinsichten(): Promise<AxiosResponse<Array<WebApi.DtoAkteneinsicht>>> {
    return axios.get(this.GetConfig().akteneinsichtenUrl, this.GetHeaders())
  }
  public GetAkteneinsicht(id: String): Promise<AxiosResponse<WebApi.DtoAkteneinsicht>> {
    return axios.get<WebApi.DtoAkteneinsicht>(this.GetConfig().akteneinsichtenUrl + '/' + id, this.GetHeaders())
  }

  public GetDetails(akteneinsicht: Akteneinsicht): Promise<AxiosResponse<Array<WebApi.DtoDetail>>> {
    return axios.get<Array<WebApi.DtoDetail>>(this.GetConfig().akteneinsichtenUrl + '/' + akteneinsicht.id + '/details', this.GetHeaders())
  }
}
