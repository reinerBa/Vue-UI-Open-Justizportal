// SPDX-FileCopyrightText: © 2019 Oberverwaltungsgericht Rheinland-Pfalz <poststelle@ovg.jm.rlp.de>, Reiner Bamberger <4329883+reinerBa@users.noreply.github.com>
// SPDX-License-Identifier: EUPL-1.2
import { DtoDatei } from './../../libs/models/api'

export class Preview {
  id: string
  open: boolean
  datei: DtoDatei

  constructor(datei: DtoDatei){
    this.datei = datei
    this.open = true
    this.id = datei.id
  }
}
