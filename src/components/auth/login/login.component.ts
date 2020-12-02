import { Component, OnInit, AfterViewInit } from '@angular/core';
import { AuthService, PortalStateService, PortalState, AuthResponse } from '@jp-suite/core';
import { Router } from '@angular/router';
import { AuthErrorCodes } from 'libs/core/src/lib/model/auth-error-codes';
import moment = require('moment');
declare var componentHandler: any;

@Component({
  selector: 'jp-suite-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit, AfterViewInit {
  username: string = '';
  password: string = '';
  hidePW: boolean = true;
  
  isLoading: boolean;
  errorMessage: string;

  constructor(private authService: AuthService, private stateService: PortalStateService, private router: Router) {
    this.isLoading = false;
    this.errorMessage = '';

    this.stateService.changeState({
      title: 'Login'
    });
  }

  ngOnInit() {
    this.hidePW = true;
  }

  ngAfterViewInit(): void {
    componentHandler.upgradeAllRegistered();
  }

  public onLogin() {
    this.isLoading = true;

    this.authService.login(this.username, this.password).subscribe(
      res => {
        if(res.returnCode == AuthErrorCodes.Ok) {
          this.router.navigateByUrl('/akteneinsichten')
        } else {
          this.errorMessage = this.getMessageFromAuthResponse(res);
        }

        this.isLoading = false;
      },
      err => {
        this.errorMessage = "Fehler bei der Anmeldung.";
        this.isLoading = false;
      },
      () => {
      }
    );
  }

  private getMessageFromAuthResponse(response: AuthResponse) : string {
    if(response.returnCode == AuthErrorCodes.Ok)
      return "Anmeldung erfolgreich";
    else if (response.returnCode == AuthErrorCodes.ErrorUserLocked) {
      return "Der Benutzer ist bis " + moment().add(response.errorInfo.unlockedIn, "seconds").format("LT") + " Uhr gesperrt.";
    }
    else if (response.returnCode == AuthErrorCodes.ErrorWrongCredentials)
      return "Die Anmeldedaten sind leider nicht korrekt.";
    else
      return "Fehler bei der Anmeldung.";
  }
}
