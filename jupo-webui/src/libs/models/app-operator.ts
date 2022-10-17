// SPDX-FileCopyrightText: © 2019 Oberverwaltungsgericht Rheinland-Pfalz <poststelle@ovg.jm.rlp.de>, Reiner Bamberger <4329883+reinerBa@users.noreply.github.com>
// SPDX-License-Identifier: EUPL-1.2
import { Contact } from './contact'

export class AppOperator {
  headerTitle: string
  homeWelcomeText: string
  impressum: Contact
  contact: Contact
  supportEmail: string
  privacyPolicyUrl: string
}
// als favicon.ico bitte passende Datei in asset Ordner kopieren!
// Farbschema unter "./assets/css/color-scheme.css" kopieren
// Landeswappen muss logo.png heißen
