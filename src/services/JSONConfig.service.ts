import { AppConfig, AppOperator } from '../ressources/model';
import { AbstractJSONConfigService } from './Contracts';
import { AxiosInstance } from 'axios'

export class JSONConfigService  extends AbstractJSONConfigService {
  http: AxiosInstance

  public constructor ( http: AxiosInstance)
  {
    super()
    this.http = http
  }

  public async getAppConfig(url: string): Promise<AppConfig> {
    const response = await this.http.get<AppConfig>(url)
    return response.data
  }
  public async getAppOperatorConfig(url: string): Promise<AppOperator> {
    const response = await this.http.get<AppOperator>(url)
    return response.data
  }
}
