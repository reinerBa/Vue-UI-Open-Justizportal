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
