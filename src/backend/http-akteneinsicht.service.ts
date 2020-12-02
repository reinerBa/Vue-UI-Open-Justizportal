import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

import { Akteneinsicht, AppConfig, Detail, Datei, AuthStore } from '@jp-suite/core';
import { AkteneinsichtService, ConfigService } from '@jp-suite/core';

@Injectable()
export class HttpAkteneinsichtService implements AkteneinsichtService {

  private config: AppConfig;

  constructor(private http: HttpClient, private configService: ConfigService, private auth: AuthStore) {
    this.config = configService.getConfig();    
  }

  public getAkteneinsichten() : Observable<Akteneinsicht[]> {
    return this.http.get<Akteneinsicht[]>(this.config.akteneinsichtenUrl);
  }

  public getAkteneinsicht(id: string) : Observable<Akteneinsicht> {
    return this.http.get<Akteneinsicht>(this.config.akteneinsichtenUrl + '/' + id);
  }

  public getDetails(akteneinsicht: Akteneinsicht) : Observable<Detail[]> {
    return this.http.get<Detail[]>(this.config.akteneinsichtenUrl + '/' + akteneinsicht.id + '/details');
  }

  public downloadDatei(datei: Datei) : Observable<Object> {
    return this.http.get(this.config.dateienUrl + '/' + datei.id + '/download', {responseType: 'blob'});
  }
}
