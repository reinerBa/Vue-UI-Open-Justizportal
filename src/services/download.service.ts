import { Datei, AppConfig } from '../ressources/model/index'
import { AbstractDownloadService } from './Contracts/abstractDownload.service'
import { AuthInfo } from '../ressources/model/index'

export class DownloadService extends AbstractDownloadService {

  private readonly config: AppConfig

  constructor(config: AppConfig) {
    super()
    this.config = config
  }

  public download(datei: Datei, auth: AuthInfo) {

    if(auth && !auth.isExpired()) {
      var url = this.config.dateienUrl + '/' + datei.id + '/download?access_token=' + authInfo.token;
      var a = document.createElement('a');
      document.body.appendChild(a);
      a.setAttribute('style', 'display: none');
      a.href = url;
      a.click();
      a.remove();
    }
  }

  public preview(datei: Datei, escaped:boolean = false, auth: AuthInfo): string {
    if(!auth || auth.isExpired()) return ''
    let equ="="
    if (escaped) equ="%3D"

    // wenn ein relativer Pfad in der Config eingetragen ist, muss die Base-URL vorgestellt werden
    // ansonsten geht das eigenständige PDF-JS von seiner eigenen Base-URL aus
    let dateienUrl:string =this.config.dateienUrl;
    if (dateienUrl.indexOf("http")<0) {
      dateienUrl=location.origin + '/' + dateienUrl
    }

    const url = dateienUrl + '/' + datei.id + '/preview?access_token'+ equ + auth.token;

    return url
  }
}
