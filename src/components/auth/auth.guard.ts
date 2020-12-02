import { Injectable } from "@angular/core";
import { CanActivateChild, Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from "@angular/router";
import { AuthStore } from "@jp-suite/core";

@Injectable()
export class AuthGuard implements CanActivate {

  constructor(private auth: AuthStore, private router: Router) {

  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    let url: string = state.url;

    return this.checkAuth(url);
  }

  checkAuth(url: string): boolean {
    let authInfo = this.auth.getAuthInfo();

    if(authInfo && !authInfo.isExpired()) {
      return true;
    }

    this.router.navigate(['/login']);
    return false;
  }
}