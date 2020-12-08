import { Datei } from './datei'

export class Preview {
  id: string
  open: boolean
  datei: Datei

  constructor(datei: Datei){
    this.datei = datei
    this.open = true
    this.id = datei.id
  }
}
