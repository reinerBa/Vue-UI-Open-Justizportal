import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { HomeComponent } from "./home/home.component";
import { KontaktComponent } from "./kontakt/kontakt.component";
import { ImpressumComponent } from "./impressum/impressum.component";
import { DatenschutzComponent } from "./datenschutz/datenschutz.component";

const routes: Routes = [
  {
    path: "home",
    component: HomeComponent
  }, {
    path: "kontakt",
    component: KontaktComponent
  }, {
    path: "impressum",
    component: ImpressumComponent
  }, {
    path: "datenschutz",
    component: DatenschutzComponent
  }];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [
    RouterModule
  ]
})
export class MainRoutingModule { }