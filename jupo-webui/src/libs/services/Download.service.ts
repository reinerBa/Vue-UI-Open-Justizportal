import { config } from '../../store/configStore'
import {authState } from '../../store/authStore'
import { Datei } from '../models/datei';

declare const window: any

export class DownloadService {

  public download(datei: Datei) {

    if(authState.token && !authState.isExpired()) {
      var url = config.dateienUrl + '/' + datei.id + '/download?access_token=' + authState.token

      var a = document.createElement('a');
      document.body.appendChild(a);
      a.setAttribute('style', 'display: none');
      a.href = url;

      if(window.testcase === true) {
        a.setAttribute("class", "test-download-link")
        a.setAttribute("data-size", `${datei.size}`)
        a.setAttribute("data-mimetype", datei.mimeType)
        a.setAttribute("data-dateiname", datei.dateiname)
        a.setAttribute("data-id", datei.id)

        setTimeout(() => a.remove(), 5e2)
        return
      }

      a.click();
      a.remove();
    }
  }

  public preview(datei: Datei, escaped:boolean = false): string {
    if(authState.token && !authState.isExpired()) return ''
    let equ="="
    if (escaped) equ="%3D"

    // wenn ein relativer Pfad in der Config eingetragen ist, muss die Base-URL vorgestellt werden
    // ansonsten geht das eigenständige PDF-JS von seiner eigenen Base-URL aus
    let dateienUrl: string = config.dateienUrl
    if (dateienUrl.indexOf("http")<0) {
      dateienUrl=location.origin + '/' + dateienUrl
    }

    const url = dateienUrl + '/' + datei.id + '/preview?access_token'+ equ + authState.token;

    return url
  }
}
