import { Component, OnInit } from '../../../services/interceptors/@angular/core';
import { PortalStateService, ConfigService, AppOperator, Contact } from '@jp-suite/core';

@Component({
  selector: 'jp-impressum',
  templateUrl: './impressum.component.html',
  styleUrls: ['./impressum.component.styl']
})
export class ImpressumComponent implements OnInit {
  private config: AppOperator = <AppOperator>{};

  constructor(private stateService: PortalStateService, private configService: ConfigService) { 
    this.config = configService.getOperatorConfig();
    this.stateService.changeState({
      title: 'Impressum'
    });
  }

  ngOnInit() {
  }

  public get operator(): Contact {
    return this.config == null ? new Contact() : this.config.impressum;
  }

}
