import { PortalState } from '../ressources/model'
import { reactive } from 'vue'

export class PortalStateService {

  private stateChangedSource = new Subject<PortalState>();

  public changeState(state: PortalState) {
    this.stateChangedSource.next(state);
  }

  stateChanged$ = this.stateChangedSource.asObservable();
}
