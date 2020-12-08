import { Akteneinsicht, Detail, Datei } from '../../ressources/model'

export abstract class AbstractAkteneinsichtService {

  public abstract async getAkteneinsichten() : Promise<Akteneinsicht[]>

  public abstract async getAkteneinsicht(id: string) : Promise<Akteneinsicht>

  public abstract async getDetails(akteneinsicht: Akteneinsicht) : Promise<Detail[]>

  public abstract async downloadDatei(datei: Datei) : Promise<Object>
}
