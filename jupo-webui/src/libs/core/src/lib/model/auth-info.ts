import { Moment, Duration, now, duration } from "moment";
import moment = require("moment");

export class AuthInfo {
  token: string;
  username: string;
  expiresAt: Moment;

  isExpired(): boolean {
    return moment().isAfter(this.expiresAt);
  }
}