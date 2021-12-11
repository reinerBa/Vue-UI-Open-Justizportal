import { Moment, Duration, now, duration } from "moment";
import moment from "moment"

export class AuthInfo {
  token: string;
  username: string;
  expiresAt: number// Moment;

  constructor(init?:Partial<AuthInfo>){
    Object.assign(this, init)
  }
/*  get isExpired(): boolean {
    return moment().isAfter(this.expiresAt);
  } */
}