import { NgModule, Optional, SkipSelf, ModuleWithProviders, LOCALE_ID } from '../services/interceptors/@angular/core';
import { CommonModule } from '@angular/common';
import { HTTP_INTERCEPTORS } from '../services/interceptors/@angular/common/http';
import { registerLocaleData } from '@angular/common';
import localeDe from '@angular/common/locales/de';

import { PortalStateService } from './services/portal-state.service';
import { AuthStore } from './services/auth-store';
import { DownloadService } from './services/download.service';
import { FilesizePipe } from './pipes/filesize.pipe';
import { MimetypePipe } from './pipes/mimetype.pipe';
import { DurationPipe } from './pipes/duration.pipe';
import { AuthInterceptor } from '../services/interceptors/auth.interceptor';
import { LocalStoreService, AuthService } from './services';

registerLocaleData(localeDe);

@NgModule({
  imports: [CommonModule],
  exports: [FilesizePipe, MimetypePipe, DurationPipe],
  declarations: [FilesizePipe, MimetypePipe, DurationPipe],
  providers: [AuthStore, DownloadService, LocalStoreService, AuthService]
})
export class CoreModule {
  constructor(@Optional() @SkipSelf() parentModule: CoreModule) {
    if (parentModule) {
      throw new Error(
        'CoreModule is already loaded. Import it in the AppModule only');
    }
  }

  static forRoot(): ModuleWithProviders {
    return {
      ngModule: CoreModule,
      providers: [
        { provide: LOCALE_ID, useValue: "de" },
        { provide: PortalStateService, useClass: PortalStateService },
        { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }
      ]
    }
  }
}
