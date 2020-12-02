import { resolveTiming } from '@angular/animations/browser/src/util';
import { Component, OnInit } from '@angular/core';
import { PortalStateService, ConfigService, AppOperator, Contact } from '@jp-suite/core';

@Component({
  selector: 'jp-kontakt',
  templateUrl: './kontakt.component.html',
  styleUrls: ['./kontakt.component.css']
})
export class KontaktComponent implements OnInit {
  public config: AppOperator = <AppOperator>{};

  constructor(private stateService: PortalStateService, private configService: ConfigService) { 
    this.config = configService.getOperatorConfig();
    
    this.stateService.changeState({
      title: 'Kontakt'
    });
  }

  ngOnInit() {
  }
  public get operator(): Contact {
    return this.config.contact
  }

}
