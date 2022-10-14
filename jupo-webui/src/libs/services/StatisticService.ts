// SPDX-FileCopyrightText: © 2019 Oberverwaltungsgericht Rheinland-Pfalz <poststelle@ovg.jm.rlp.de>, Reiner Bamberger <4329883+reinerBa@users.noreply.github.com>
// SPDX-License-Identifier: EUPL-1.2
import axios, { AxiosResponse } from "axios";
import { InjectionKey } from "vue"
import {JpHttpServiceAbstract} from './JpHttpServiceAbstract'
import { DtOStatistic, StatisticParams } from './../../libs/models/api'

export const StatisticServiceKey: InjectionKey<StatisticService> = Symbol('StatisticService')

export class StatisticService extends JpHttpServiceAbstract{
    
  public async getNutzungsstatistiken(params: StatisticParams) : Promise<AxiosResponse<Array<DtOStatistic>>> {
    return axios.post<Array<DtOStatistic>>(this.GetConfig().statisticUrl+ 'usageStatistic/', params)
  }
}