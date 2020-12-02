import { APP_INITIALIZER, NgModule, LOCALE_ID } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { NxModule } from '@nrwl/nx';

import { MomentModule } from 'ngx-moment';
import 'moment/locale/de';
import { registerLocaleData } from "@angular/common";
import localeDe from "@angular/common/locales/de";

import { AppRoutingModule } from './app.routing';

import { CoreModule, ConfigService, AuthStore, Datei } from '@jp-suite/core';
import { BackendModule, JsonConfigService } from '@jp-suite/backend';
import { AuthModule } from './auth/auth.module';
import { MainModule } from './main/main.module';
import { AkteneinsichtModule } from './akteneinsicht/akteneinsicht.module';
import moment = require('moment');

export function ConfigLoader(configService: JsonConfigService) {
  return () => configService.load('./assets/config.json', './assets/operator-config.json');
}

registerLocaleData(localeDe);
moment.locale("de");

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    NxModule.forRoot(),
    BrowserAnimationsModule,
    CoreModule.forRoot(),
    BackendModule,
    MomentModule,
    MainModule,
    AuthModule,
    AkteneinsichtModule,
    AppRoutingModule
  ],
  providers: [
    {
      provide: LOCALE_ID,
      useValue: "de"
    },
    JsonConfigService,
    {
      provide: APP_INITIALIZER,
      useFactory: ConfigLoader,
      deps: [JsonConfigService],
      multi: true
    },
    {
      provide: ConfigService,
      useExisting: JsonConfigService
    },
    AuthStore
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
