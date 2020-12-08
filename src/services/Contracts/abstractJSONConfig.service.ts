import { AppConfig, AppOperator } from '../../ressources/model'

export abstract class AbstractJSONConfigService {

  public abstract async getAppConfig(url: string) : Promise<AppConfig>

  public abstract async getAppOperatorConfig(url: string) : Promise<AppOperator>

}
