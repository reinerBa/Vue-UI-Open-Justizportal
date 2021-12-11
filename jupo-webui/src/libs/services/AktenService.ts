import { AppConfig } from "../models/app-config";
import axios, { AxiosResponse } from 'axios'
import { config } from '../../store/configStore'
import {Akteneinsicht} from '../../libs/models/akteneinsicht'
import {Detail} from '../../libs/models/detail'

export function GetAkteneinsichten(): Promise<AxiosResponse<Array<Akteneinsicht>>> {
    return axios.get(config.akteneinsichtenUrl)
}

export function GetAkteneinsicht(id: String): Promise<AxiosResponse<Akteneinsicht>> {
    return axios.get<Akteneinsicht>(config.akteneinsichtenUrl + '/' + id);
  }

export function GetDetails(akteneinsicht: Akteneinsicht): Promise<AxiosResponse<Array<Detail>>> {
    return axios.get<Array<Detail>>(config.akteneinsichtenUrl + '/' + akteneinsicht.id + '/details');
  }