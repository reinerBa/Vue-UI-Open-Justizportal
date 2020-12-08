import { NgModule } from "../../services/interceptors/@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";

import { CoreModule } from "@jp-suite/core";
import { MainRoutingModule } from "./main-routing.module";
import { HomeComponent } from "./home/home.component";
import { KontaktComponent } from "./kontakt/kontakt.component";
import { ImpressumComponent } from "./impressum/impressum.component";
import { MenuHeaderComponent } from "./menu-header/menu-header.component";
import { MenuComponent } from "./menu/menu.component";
import { DatenschutzComponent } from "./datenschutz/datenschutz.component";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    CoreModule,
    MainRoutingModule
  ],
  declarations: [
    HomeComponent,
    DatenschutzComponent,
    KontaktComponent,
    ImpressumComponent,
    MenuComponent,
    MenuHeaderComponent
  ],
  exports: [
    MenuComponent,
    MenuHeaderComponent
  ]
})
export class MainModule { }