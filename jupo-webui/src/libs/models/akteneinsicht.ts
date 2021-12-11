import { Datei } from './datei'

export class Akteneinsicht {
  id: string
  aktenzeichen: string
  ablauf: string
  bereitstellung: string
  kurzrubrum: string
  nurVorschau: boolean
  datei?: Datei
}
