import { Component, OnInit, Input, Output, EventEmitter, IterableDiffers, OnChanges, SimpleChanges } from '../../../services/interceptors/@angular/core';
import { Preview, DownloadService } from '@jp-suite/core';
import { DomSanitizer, SafeResourceUrl, SafeUrl} from '@angular/platform-browser';

@Component({
  selector: 'jp-pdf-modal',
  templateUrl: './pdf-modal.component.html',
  styleUrls: ['./pdf-modal.component.styl']
})
export class PdfModalComponent implements OnChanges {
  @Output() closePdfId = new EventEmitter<string>()
  @Input() downloadRestricted: boolean;
  @Input() singlePdf: Preview
  openPdfSrc: SafeResourceUrl = null
  openUrl = ''

  constructor(private downloadService: DownloadService, private sanitizer: DomSanitizer) {
  }

  ngOnChanges(changes: SimpleChanges) {
    if (this.hasPdfsToDisplay) {
      this.openUrl = this.downloadService.preview(this.singlePdf.datei, this.downloadRestricted)
      this.openPdfSrc = this.sanitizer.bypassSecurityTrustResourceUrl(this.openUrl)
    } else {
      this.openUrl =  ''
      this.openPdfSrc = null
    }
  }

  get openPdfId () {
    if (this.hasPdfsToDisplay)
      return this.singlePdf.id
    return ''
  }

  get hasPdfsToDisplay(){
    return Boolean(this.singlePdf)
  }
  get openPdfName(){
    if(!this.hasPdfsToDisplay) return ''
    return this.singlePdf.datei.dateiname
  }

  removePreview(id: string){
    this.closePdfId.emit(id)
  }

  closeModal(){
    this.singlePdf.open = false
    this.closePdfId.emit(this.openPdfId)
  }
}
