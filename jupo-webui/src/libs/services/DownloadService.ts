import { JpHttpServiceAbstract } from './JpHttpServiceAbstract'
import { InjectionKey } from 'vue'

declare const window: any

export const DownloadServiceKey: InjectionKey<DownloadService> = Symbol('DownloadService')

export class DownloadService extends JpHttpServiceAbstract{
  private getToken() {return this._authStore.useStore().token.value}

  public download(datei: WebApi.DtoDatei) {
      const url = this.GetConfig().dateienUrl + '/' + datei.id + '/download?access_token=' + this.getToken()

      let a = document.createElement('a')
      document.body.appendChild(a)
      a.setAttribute('style', 'display: none')
      a.href = url

      if(window.testcase === true) {
        a.setAttribute("class", "test-download-link")
        a.setAttribute("data-size", `${datei.size}`)
        a.setAttribute("data-mimetype", datei.mimeType)
        a.setAttribute("data-dateiname", datei.dateiname)
        a.setAttribute("data-id", datei.id)

        setTimeout(() => a.remove(), 5e2)
        return
      }

      a.click()
      a.remove()
  }

  public preview(datei: WebApi.DtoDatei, escaped: boolean = false): string {
    let equ="="
    if (escaped) equ="%3D"

    // wenn ein relativer Pfad in der Config eingetragen ist, muss die Base-URL vorgestellt werden
    // ansonsten geht das eigenständige PDF-JS von seiner eigenen Base-URL aus
    let dateienUrl: string = this.GetConfig().dateienUrl
    
    if (dateienUrl.indexOf("http")<0)
      dateienUrl=location.origin + '/' + dateienUrl
    

    const url = dateienUrl + '/' + datei.id + '/preview?access_token'+ equ + this.getToken()
    return url
  }
}
