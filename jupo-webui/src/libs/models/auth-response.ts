// SPDX-FileCopyrightText: © 2019 Oberverwaltungsgericht Rheinland-Pfalz <poststelle@ovg.jm.rlp.de>, Reiner Bamberger <4329883+reinerBa@users.noreply.github.com>
// SPDX-License-Identifier: EUPL-1.2
export class AuthResponse {
  returnCode: string
  
  authInfo: {
    token: string
    expiresIn: number
  };

  errorInfo: {
    unlockedIn: number
  };
}