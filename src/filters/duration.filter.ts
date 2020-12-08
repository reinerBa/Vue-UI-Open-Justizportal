import { Duration } from 'moment'

export function durationFilter (value: any) : string {
    var dur: Duration = value
    if (dur) {
      return [
        dur.minutes().toString(), 
        dur.seconds().toString().padStart(2, "0")
      ].join(":")
    }
    return value
  }
}
