import { Component, OnInit } from '@angular/core';

import { Akteneinsicht, AkteneinsichtService, PortalStateService } from '@jp-suite/core';
import {Router} from '@angular/router';

@Component({
  selector: 'jp-akteneinsicht',
  templateUrl: './akteneinsichten.component.html',
  styleUrls: ['./akteneinsichten.component.css']
})
export class AkteneinsichtenComponent implements OnInit {

  constructor(private akteneinsichtService: AkteneinsichtService, private stateService: PortalStateService, private router: Router) { 
    this.stateService.changeState({
      title: 'Elektronische Akteneinsicht'
    });
  }

  akteneinsichten: Akteneinsicht[];

  ngOnInit() {
    this.akteneinsichtService.getAkteneinsichten().subscribe(result => {
      this.akteneinsichten = result;
      //redirect if its just one
      if(this.akteneinsichten.length === 1) this.router.navigate(['akteneinsichten//'+this.akteneinsichten[0].id])
    });
  }
}
