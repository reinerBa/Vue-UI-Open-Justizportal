import { Component, OnInit } from '../../../services/interceptors/@angular/core';
import { PortalStateService, ConfigService, AppOperator  } from '@jp-suite/core';

@Component({
  selector: 'jp-datenschutz',
  templateUrl: './datenschutz.component.html',
  styleUrls: ['./datenschutz.component.css']
})
export class DatenschutzComponent implements OnInit {
  private config: AppOperator = <AppOperator>{};
  private dataProtectionHtml: string = '';

  constructor(private stateService: PortalStateService, private configService: ConfigService) { 
    this.config = configService.getOperatorConfig();

    this.stateService.changeState({
      title: 'Datenschutz'
    });

    let dsContent = sessionStorage.getItem("dataProtectionContent")
    
    if (Boolean(dsContent)) {
      this.dataProtectionHtml = dsContent;
    } else if (this.config.privacyPolicyUrl !== 'default') {
      fetch(this.config.privacyPolicyUrl)
      .then(response => response.body.getReader().read()
        .then(d => {
          let { value: chunk, done: readerDone } = d;
          let utf8Decoder = new TextDecoder('utf-8');
          let content = chunk ? utf8Decoder.decode(chunk) : '';
          this.dataProtectionHtml = content
          sessionStorage.setItem('dataProtectionContent', content);
        })
      )
    }
  }

  ngOnInit() {
  }

  get useDefault() : boolean {
    return this.config == null ? false : this.config.privacyPolicyUrl === 'default'
  }
}
