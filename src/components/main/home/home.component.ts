import { Component, OnInit } from '../../../services/interceptors/@angular/core';
import { PortalStateService } from '@jp-suite/core';
import { AuthStore, ConfigService, AppOperator } from '@jp-suite/core';

@Component({
  selector: 'jp-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  private config: AppOperator;

  constructor(private stateService: PortalStateService, public auth: AuthStore, private configService: ConfigService) { 
    this.config = configService.getOperatorConfig();
    this.stateService.changeState({
      title: 'Home'
    });
  }

  ngOnInit() {
  }

  get homeWelcomeText(): string {
    return this.config === null || this.config === undefined ? "" : this.config.homeWelcomeText
  }
  get IsLoggedIn(): boolean{
    return !!(this.auth && this.auth.getAuthInfo() && this.auth.getAuthInfo().username)
  }
}
