import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { CoreModule } from "@jp-suite/core";

import { PdfJsViewerModule } from 'ng2-pdfjs-viewer';

import { AkteneinsichtRoutingModule } from "./akteneinsicht-routing.module";
import { AkteneinsichtComponent } from "./akteneinsicht/akteneinsicht.component";
import { AkteneinsichtenComponent } from "./akteneinsichten/akteneinsichten.component";
import { DateiInfoComponent } from "./datei-info/datei-info.component";
import { PdfModalComponent } from "./pdf-modal/pdf-modal.component";
import { TrayScrollComponent} from "./tray-scroll/tray-scroll.component";


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    CoreModule,
    AkteneinsichtRoutingModule,
    PdfJsViewerModule
  ],
  declarations: [
    AkteneinsichtComponent,
    AkteneinsichtenComponent,
    DateiInfoComponent,
    PdfModalComponent,
    TrayScrollComponent
  ],
  exports: [
  ]
})
export class AkteneinsichtModule { }
