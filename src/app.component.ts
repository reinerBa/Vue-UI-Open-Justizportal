import { Component, OnInit, AfterViewInit } from './services/interceptors/@angular/core';
import { Title } from '@angular/platform-browser';
import { PortalStateService, PortalState  } from '@jp-suite/core';
import { version } from '../../package.app.json';


declare var componentHandler: any;

@Component({
  selector: 'jp-portal-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements AfterViewInit {
  title = 'Justizportal';

  public constructor(private stateService: PortalStateService, private titleService: Title) {
    this.stateService.stateChanged$.subscribe(state => {
      this.title = state.title;
      this.titleService.setTitle('Justizportal | ' + this.title);
    });
    console.log("Justizportal v." + version);
  }

  ngAfterViewInit(): void {
    componentHandler.upgradeAllRegistered();
  }
}
