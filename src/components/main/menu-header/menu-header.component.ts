import { Component, OnInit } from '@angular/core';
import { ConfigService, AppConfig, AppOperator } from '@jp-suite/core';

@Component({
  selector: 'jp-menu-header',
  templateUrl: './menu-header.component.html',
  styleUrls: ['./menu-header.component.css']
})
export class MenuHeaderComponent implements OnInit {

  private config: AppConfig;
  public operatorConfig: AppOperator;

  constructor(private configService: ConfigService) {
    this.config = configService.getConfig();
    this.operatorConfig = configService.getOperatorConfig();
  }

  ngOnInit() {
  }

  isLabor() : boolean {
    return this.config === null || this.config === undefined ? true : this.config.appInfo.indexOf('abor') > 0;
  }
  get headerTitle(): string{
    return this.operatorConfig ? this.operatorConfig.headerTitle : ""
  }
}
