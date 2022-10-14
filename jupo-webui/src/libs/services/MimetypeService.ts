// SPDX-FileCopyrightText: © 2019 Oberverwaltungsgericht Rheinland-Pfalz <poststelle@ovg.jm.rlp.de>, Reiner Bamberger <4329883+reinerBa@users.noreply.github.com>
// SPDX-License-Identifier: EUPL-1.2
interface filetype {
  name: string,
  mime: string
}
const FILETYPES: Array<filetype> = [
  {
    mime: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    name: 'Word-Dokument'
    }, {
    mime: 'application/pdf',
    name: 'Pdf-Dokument'
    }, {
    mime: 'application/msword',
    name: 'Word-Dokument'
    }, {
    mime: 'application/x-zip-compressed',
    name: 'Zip-Datei'
  }
]
const UNKNOWN_FILE: string = "Dokument";

// const map1 = new Map<string, string>()

export function GetMimetypeName(mime: string): string {
    for (let i = 0; i < FILETYPES.length; i++) {
        let entry = FILETYPES[i]
        if (entry.mime === mime) return entry.name
    }
    return UNKNOWN_FILE
}
