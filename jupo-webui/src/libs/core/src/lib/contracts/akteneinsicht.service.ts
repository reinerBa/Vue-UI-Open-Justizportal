import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { Akteneinsicht, Detail } from '@jp-suite/core';

@Injectable()
export abstract class AkteneinsichtService {

  public abstract getAkteneinsichten() : Observable<Akteneinsicht[]>;

  public abstract getAkteneinsicht(id: string) : Observable<Akteneinsicht>;

  public abstract getDetails(akteneinsicht: Akteneinsicht) : Observable<Detail[]>;

}
