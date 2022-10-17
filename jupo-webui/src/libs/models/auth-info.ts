// SPDX-FileCopyrightText: © 2019 Oberverwaltungsgericht Rheinland-Pfalz <poststelle@ovg.jm.rlp.de>, Reiner Bamberger <4329883+reinerBa@users.noreply.github.com>
// SPDX-License-Identifier: EUPL-1.2
import { Moment, Duration, now, duration } from 'moment'
import moment from 'moment'

export class AuthInfo {
  token: string
  username: string
  expiresAt: number// Moment;

  constructor (init?: Partial<AuthInfo>) {
    Object.assign(this, init)
  }
/*  get isExpired(): boolean {
    return moment().isAfter(this.expiresAt);
  } */
}
