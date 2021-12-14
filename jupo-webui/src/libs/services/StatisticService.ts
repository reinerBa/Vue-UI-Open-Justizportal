import axios, { AxiosResponse } from "axios";
import { InjectionKey } from "vue"
import {JpHttpServiceAbstract} from './JpHttpServiceAbstract'

export const StatisticServiceKey: InjectionKey<StatisticService> = Symbol('StatisticService')

export class StatisticService extends JpHttpServiceAbstract{
    
  public async getNutzungsstatistiken(params: WebApi.StatisticParams) : Promise<AxiosResponse<Array<WebApi.DtOStatistic>>> {
    return axios.post<Array<WebApi.DtOStatistic>>(this.GetConfig().statisticUrl+ 'usageStatistic/', params)
  }
}