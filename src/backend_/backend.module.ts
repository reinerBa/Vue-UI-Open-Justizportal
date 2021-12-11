import { NgModule, Optional, SkipSelf, ModuleWithProviders } from '../services/interceptors/@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '../services/interceptors/@angular/common/http';

import { HttpAkteneinsichtService } from './services/http-akteneinsicht.service';

import { AkteneinsichtService } from '@jp-suite/core';

@NgModule({
  imports: [CommonModule, HttpClientModule],
  providers: [
    { provide: AkteneinsichtService, useClass: HttpAkteneinsichtService },
  ]
})
export class BackendModule { }
