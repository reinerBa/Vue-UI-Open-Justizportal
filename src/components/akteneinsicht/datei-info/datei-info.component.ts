import { Component, OnInit, Input, Output, EventEmitter } from '../../../services/interceptors/@angular/core';
import { Datei } from '@jp-suite/core';

@Component({
  selector: 'jp-datei-info',
  templateUrl: './datei-info.component.html',
  styleUrls: ['./datei-info.component.css']
})
export class DateiInfoComponent implements OnInit {
  @Output() download = new EventEmitter()
  @Output() showPdfSource = new EventEmitter<Datei>()
  @Input() datei: Datei;
  @Input() downloadRestricted: boolean;

  constructor() { }

  ngOnInit() {
  }

  showPreview(){
    this.showPdfSource.emit(this.datei)
  }
  doDownload() {
    if(!this.downloadRestricted)
      this.download.emit();
  }
}
