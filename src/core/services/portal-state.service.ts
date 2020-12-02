import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { PortalState } from '../model';

@Injectable()
export class PortalStateService {

  private stateChangedSource = new Subject<PortalState>();

  public changeState(state: PortalState) {
    this.stateChangedSource.next(state);
  }

  stateChanged$ = this.stateChangedSource.asObservable();
}
