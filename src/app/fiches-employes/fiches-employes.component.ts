import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { FilterService } from '../_services/filter.service';
import { SendTitleService } from '../_services/send-title.service';

@Component({
  selector: 'app-fiches-employes',
  templateUrl: './fiches-employes.component.html',
  styleUrls: ['./fiches-employes.component.scss']
})
export class FichesEmployesComponent implements OnInit {
url;
title:string="Employeurs";
subscription:Subscription;
  constructor(
     private SendTitleService:SendTitleService,
     private  filterService:FilterService,
    private router: Router 
  ) { }

  ngOnInit(): void {
  this.filterByType();
  }

  sendFilter() {
    this.url=this.router.url;
   
    this.filterService.sendFilter(this.url);
  }

  filterByType() {
    this.subscription = this.SendTitleService.getTitle().subscribe(message => {
      if (message) {
        this.title=message.text
      }
    });
  }

}
