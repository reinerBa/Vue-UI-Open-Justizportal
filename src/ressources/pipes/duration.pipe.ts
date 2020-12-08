import { Pipe, PipeTransform } from '@angular/core';
import { Duration, duration } from 'moment';

@Pipe({
  name: 'duration'
})
export class DurationPipe implements PipeTransform {
  transform(value: any, si = true): any {
    var dur: Duration = value;
    if (dur) {
      return [
        dur.minutes().toString(), 
        dur.seconds().toString().padStart(2, "0")
      ].join(":");
    }
    return value;
  }
}
