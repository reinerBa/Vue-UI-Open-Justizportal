import { Component, OnInit } from '../../../services/interceptors/@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { AkteneinsichtService, Akteneinsicht, Detail, Datei, PortalStateService, DownloadService, Preview } from '@jp-suite/core';

@Component({
  selector: 'jp-akteneinsicht',
  templateUrl: './akteneinsicht.component.html',
  styleUrls: ['./akteneinsicht.component.css']
})
export class AkteneinsichtComponent implements OnInit {
  akteneinsicht: Akteneinsicht
  details: Detail[]
  openPreviews: Preview[] =[]
  singlePreview: Preview

  constructor(
    private route: ActivatedRoute,
    private akteneinsichtService: AkteneinsichtService,
    private stateService: PortalStateService,
    private downloadService: DownloadService
  ) {
    this.stateService.changeState({
      title: 'Elektronische Akteneinsicht'
    });
  }

  get hasFullscreen(){
    return Boolean(this.singlePreview)
    // Nur notwendig wenn pdf Liste sichtbar sein soll
    // const openPdf = this.openPreviews.filter(e => e.open).pop()
    // return !!openPdf
  }

  download(datei: Datei) {
	if(!this.akteneinsicht.nurVorschau)
	  this.downloadService.download(datei);
  }

  openPreview(pdf: Datei) {
    const includedPdf = this.openPreviews.find(element => element.id === pdf.id)
    this.singlePreview = new Preview(pdf)
  
  // Nur notwendig wenn pdf Liste sichtbar sein soll
  /* this.openPreviews.forEach(e => e.open = false)
    if(!!includedPdf){
      includedPdf.open = true
    }else{
      const newInclude = new Preview(pdf)
      this.openPreviews.push(newInclude)
    } */
  }

  closePreview(id: string) {
    this.singlePreview = null
    // Nur notwendig wenn pdf Liste sichtbar sein soll
    const idx = this.openPreviews.findIndex(element => element.id === id)
    this.openPreviews.splice(idx, 1)
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.akteneinsichtService.getAkteneinsicht(params['id']).subscribe(akteneinsicht => {
        this.akteneinsicht = akteneinsicht;

        this.stateService.changeState({
          title: this.akteneinsicht.aktenzeichen
        });

        this.akteneinsichtService.getDetails(this.akteneinsicht).subscribe(details => {
          this.details = details.sort((d1, d2) => {
            if(d1.nummer < d2.nummer) {
              return -1;
            } else {
              return 1;
            }
          });
        })
      });
    });
  }
}
