import { Datei } from './datei'

export class Preview {
  id: string
  open: boolean
  datei: WebApi.DtoDatei

  constructor(datei: WebApi.DtoDatei){
    this.datei = datei
    this.open = true
    this.id = datei.id
  }
}
