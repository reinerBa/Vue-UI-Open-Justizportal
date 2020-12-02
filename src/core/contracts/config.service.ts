import { Injectable } from '@angular/core';

import { AppConfig, AppOperator } from '@jp-suite/core';

@Injectable()
export abstract class ConfigService {
  abstract getConfig(): AppConfig;
  abstract getOperatorConfig(): AppOperator;
}
