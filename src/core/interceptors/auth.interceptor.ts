import { Injectable, Inject } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';

import { AuthStore } from '../services/auth-store';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private auth: AuthStore) { 
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    let authInfo = this.auth.getAuthInfo();

    if(authInfo && !authInfo.isExpired()) {
      const cloned = req.clone({
        headers: req.headers.set("Authorization", 'Bearer ' + authInfo.token)
      });

      return next.handle(cloned);
    }
    else 
    {
      return next.handle(req);
    }
  }
}