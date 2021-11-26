import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { Datei, AppConfig } from '../model';

import { ConfigService } from '../contracts/config.service';
import { AuthStore } from './auth-store';
declare const window: any

@Injectable()
export class DownloadService {

  private readonly config: AppConfig;

  constructor(private auth: AuthStore, configService: ConfigService) {
    this.config = configService.getConfig();
  }

  public download(datei: Datei) {
    let authInfo = this.auth.getAuthInfo();

    if(authInfo && !authInfo.isExpired()) {
      var url = this.config.dateienUrl + '/' + datei.id + '/download?access_token=' + authInfo.token;

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
    const authInfo = this.auth.getAuthInfo();
    if(!authInfo || authInfo.isExpired()) return ''
    let equ="="
    if (escaped) equ="%3D"

    // wenn ein relativer Pfad in der Config eingetragen ist, muss die Base-URL vorgestellt werden
    // ansonsten geht das eigenständige PDF-JS von seiner eigenen Base-URL aus
    let dateienUrl:string =this.config.dateienUrl;
    if (dateienUrl.indexOf("http")<0) {
      dateienUrl=location.origin + '/' + dateienUrl
    }

    const url = dateienUrl + '/' + datei.id + '/preview?access_token'+ equ + authInfo.token;

    return url
  }
}
