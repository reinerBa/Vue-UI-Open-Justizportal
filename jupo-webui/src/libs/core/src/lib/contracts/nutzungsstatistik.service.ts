import { Injectable, Inject } from '@angular/core';
import { Observable } from 'rxjs';

import { Akteneinsicht, Detail, Datei } from '@jp-suite/core';
import { DtOStatistic, StatisticParams } from '../model/api';

@Injectable()
export abstract class NutzungsstatistikService {

  public abstract getNutzungsstatistiken(params: StatisticParams) : Observable<Array<DtOStatistic>>;

}
