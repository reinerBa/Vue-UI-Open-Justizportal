import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { AppConfig, AppOperator, ConfigService } from '@jp-suite/core';

const headers = new HttpHeaders()
  .set("Content-Type", "application/json");

@Injectable()
export class JsonConfigService implements ConfigService {
  private config: AppConfig;
  private operatorConfig: AppOperator;

  constructor(private http: HttpClient) { }

  load(urlAppConfig: string, urlOperatorConfig: string) {
    let promise1 = new Promise((resolve) => {
      this.http.get<AppConfig>(urlAppConfig, { headers }).subscribe(config => {
        this.config = config;
        resolve();
      });
    });

    let promise2 = new Promise((resolve) => {
      this.http.get<AppOperator>(urlOperatorConfig, { headers }).subscribe(config => {
        this.operatorConfig = config;
        resolve();
      });
    });

    return Promise.all([promise1, promise2]);
  }

  getConfig(): AppConfig {
    return this.config;
  }
  getOperatorConfig(): AppOperator {
    return this.operatorConfig;
  }
}
