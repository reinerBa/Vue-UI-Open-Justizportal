import { Datei, AuthInfo } from '../../ressources/model'

export abstract class AbstractDownloadService {

  public abstract download(datei: Datei, auth: AuthInfo): void 

  public abstract preview(datei: Datei, escaped: boolean, auth: AuthInfo): string
}
  