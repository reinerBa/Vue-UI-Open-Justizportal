// SPDX-FileCopyrightText: © 2019 Oberverwaltungsgericht Rheinland-Pfalz <poststelle@ovg.jm.rlp.de>, Reiner Bamberger <4329883+reinerBa@users.noreply.github.com>
// SPDX-License-Identifier: EUPL-1.2
import axios, { AxiosRequestConfig, AxiosResponse } from 'axios'
import { config } from '../../store/configStore'
import { DtoAkteneinsicht, DtoDetail} from './../../libs/models/api'
import { InjectionKey } from "@vue/runtime-core";
import {JpHttpServiceAbstract} from './JpHttpServiceAbstract'

interface Headers {Authorization: string}
export const AktenServiceKey: InjectionKey<AktenService> = Symbol('AktenService')

export class AktenService extends JpHttpServiceAbstract {

  public GetAkteneinsichten(): Promise<AxiosResponse<Array<DtoAkteneinsicht>>> {
    return axios.get(this.GetConfig().akteneinsichtenUrl, this.GetHeaders())
  }
  public GetAkteneinsicht(id: String): Promise<AxiosResponse<DtoAkteneinsicht>> {
    return axios.get<DtoAkteneinsicht>(this.GetConfig().akteneinsichtenUrl + '/' + id, this.GetHeaders())
  }

  public GetDetails(akteneinsicht: DtoAkteneinsicht): Promise<AxiosResponse<Array<DtoDetail>>> {
    return axios.get<Array<DtoDetail>>(this.GetConfig().akteneinsichtenUrl + '/' + akteneinsicht.id + '/details', this.GetHeaders())
  }
}
