import { NgModule } from "../../services/interceptors/@angular/core";
import { Routes, RouterModule } from "@angular/router";

import { AkteneinsichtenComponent } from "./akteneinsichten/akteneinsichten.component";
import { AkteneinsichtComponent } from "./akteneinsicht/akteneinsicht.component";
import { AuthGuard } from "../auth/auth.guard";

const routes: Routes = [{
  path: "akteneinsichten",
  component: AkteneinsichtenComponent,
  canActivate: [AuthGuard]
}, {
  path: 'akteneinsichten/:id',
  component: AkteneinsichtComponent,
  canActivate: [AuthGuard]
}];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [
    RouterModule
  ]
})
export class AkteneinsichtRoutingModule { }