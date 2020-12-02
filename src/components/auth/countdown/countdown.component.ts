import { Component, Input } from '@angular/core';
import { Moment, Duration, duration, now } from 'moment';
import { BehaviorSubject, Observable, timer, Subscription } from 'rxjs';

@Component({
  selector: 'jp-countdown',
  templateUrl: './countdown.component.html',
  styleUrls: ['./countdown.component.css']
})
export class CountdownComponent {

  private _expiresIn: BehaviorSubject<Duration> = new BehaviorSubject<Duration>(null);
  public expiresIn$: Observable<Duration> = this._expiresIn.asObservable();

  private _expiresAt: Moment;

  private _updateTimerSub: Subscription;

  constructor() { }

  @Input()
  set expiresAt(expiresAt: Moment) {
    this._expiresAt = expiresAt;
    this.resetTimer();
  }

  resetTimer() {
    if(this._updateTimerSub != null) {
      this._updateTimerSub.unsubscribe();
      this._updateTimerSub = null;
    }

    this._updateTimerSub = timer(0, 1000).subscribe(t => {
      this._expiresIn.next(duration(this._expiresAt.diff(now())));
    });
  }  
}
