import { NgModule } from "../../services/interceptors/@angular/core";
import { CommonModule } from "@angular/common";

import { AuthInfoComponent } from "./auth-info/auth-info.component";
import { AuthRoutingModule } from "./auth-routing.module";
import { LoginComponent } from "./login/login.component";
import { CountdownComponent } from "./countdown/countdown.component";
import { FormsModule } from "@angular/forms";
import { CoreModule } from "@jp-suite/core";
import { AuthGuard } from "./auth.guard";
import { RefreshInfoComponent } from './refresh-info/refresh-info.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    CoreModule,
    AuthRoutingModule
  ],
  providers: [
    AuthGuard
  ],
  declarations: [
    AuthInfoComponent,
    LoginComponent,
    CountdownComponent,
    RefreshInfoComponent
  ],
  exports: [
    AuthInfoComponent,
    RefreshInfoComponent
  ]
})
export class AuthModule { }
