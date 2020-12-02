import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Datei, Preview  } from '@jp-suite/core';

@Component({
  selector: 'jp-tray-scroll',
  templateUrl: './tray-scroll.component.html',
  styleUrls: ['./tray-scroll.component.styl']
})
export class TrayScrollComponent implements OnInit {
  @Output() removePreview = new EventEmitter<string>()
  @Output() maximizePdf = new EventEmitter<Preview>()
  @Input() trayObjects: Preview[]

  leftHidden: string[]
  rightHidden: string[]
  visibleTrayObjects: Preview[]

  constructor() { }

  ngOnInit() {
  }

  get hasLeftHidden (): boolean {
    return this.leftHidden.length > 0
  }  
  get hasRightHidden (): boolean {
    return this.rightHidden.length > 0
  }
  moveRight () {

  }
  moveLeft () {

  }
}
