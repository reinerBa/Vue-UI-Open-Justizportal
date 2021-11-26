import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

import { Akteneinsicht, AppConfig, Detail, Datei, AuthStore } from '@jp-suite/core';
import { ConfigService } from '@jp-suite/core';
import { NutzungsstatistikService } from 'libs/core/src/lib/contracts/nutzungsstatistik.service';
import { DtOStatistic, StatisticParams } from 'libs/core/src/lib/model/api';

@Injectable()
export class HttpNutzungsstatistikService implements NutzungsstatistikService {

  private config: AppConfig;

  constructor(private http: HttpClient, private configService: ConfigService, private auth: AuthStore) {
    this.config = configService.getConfig();    
  }

  public getNutzungsstatistiken(params: StatisticParams) : Observable<Array<DtOStatistic>> {
    return this.http.post<Array<DtOStatistic>>(this.config.statisticUrl+ 'usageStatistic/', params);
  }
}
