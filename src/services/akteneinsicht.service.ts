import { Akteneinsicht, AppConfig, Detail, Datei } from '../ressources/model';
import { AbstractAkteneinsichtService } from './Contracts';
import { AxiosInstance, AxiosResponse } from 'axios'

export class AkteneinsichtService extends AbstractAkteneinsichtService {
  private http: AxiosInstance
  private config: AppConfig

  public constructor (config: AppConfig, http: AxiosInstance)
  {
    super()
    this.config = config
    this.http = http
  }

  public async getAkteneinsichten() : Promise<Akteneinsicht[]> {
    const response = await this.http.get<Akteneinsicht[]>(this.config.akteneinsichtenUrl)
    return response.data
  }

  public async getAkteneinsicht(id: string) : Promise<Akteneinsicht> {
    const response = await this.http.get<Akteneinsicht>(this.config.akteneinsichtenUrl + '/' + id)
    return response.data
  }

  public async getDetails(akteneinsicht: Akteneinsicht) : Promise<Detail[]> {
    const response = await this.http.get<Detail[]>(this.config.akteneinsichtenUrl + '/' + akteneinsicht.id + '/details');
    return response.data
  }
  
  // unused
  public async downloadDatei(datei: Datei) : Promise<Object> {
    const response = await this.http.get(this.config.dateienUrl + '/' + datei.id + '/download', {responseType: 'blob'});
    return response.data
  }
}
