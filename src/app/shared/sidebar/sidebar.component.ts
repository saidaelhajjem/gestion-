import { Component, OnDestroy, OnInit } from '@angular/core';
import { NavigationEnd, Event,NavigationError, NavigationStart, Router, ActivatedRoute } from '@angular/router';
import { filter } from 'rxjs/operators';
import { FilterService } from 'src/app/_services/filter.service';
import { SendTitleService } from 'src/app/_services/send-title.service';
import { SidebarFilterService } from './../../_services/sidebarFilter.service';
import { Location } from '@angular/common';
@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit,OnDestroy {
  status: boolean = false;
  statutFilter: boolean = false;
  ProjetsStatutFilter: boolean = false;
  EmployesFilter: boolean = false;
  sidebarFilter: boolean = false;
  mainStatus: boolean = false;
  componentBeforeNavigation;
  componentAfterNavigation;
  constructor(
    private filterService: FilterService,
    private SendTitleService:SendTitleService,
    private sidebarFilterService: SidebarFilterService,
    private location:Location
  ) {

  }

  ngOnInit(): void {
    this.clickEvent();
    this.gestionModelesFilter();
    this.homeFilter();
    
    this.location.onUrlChange(url =>{
      if(url =='/' || url =='/preparation-contrat' ){this.homeFilter();}
     
      
    } );
    
  }

  clickEvent(): void {
    this.status = !this.status;
  }

  gestionModelesFilter(): void {
    this.statutFilter = !this.statutFilter;
    this.sidebarFilter = !this.sidebarFilter;
    this.mainStatus = true;
    if (!this.statutFilter) {
      this.mainStatus = false;
    }
    this.ProjetsStatutFilter = false;
    this.EmployesFilter = false;
    this.sidebarFilterService.send(this.mainStatus);
  }

  projetsFilter(): void {
    this.ProjetsStatutFilter = !this.ProjetsStatutFilter;
    this.sidebarFilter = !this.sidebarFilter;
    this.mainStatus = true;
    if (!this.ProjetsStatutFilter) {
      this.mainStatus = false;
    }
    this.EmployesFilter = false;
    this.statutFilter = false;
    this.sidebarFilterService.send(this.mainStatus);
  }

  fichesEmployesFilter(): void {
    this.EmployesFilter = !this.EmployesFilter;
    this.sidebarFilter = !this.sidebarFilter;
    this.mainStatus = true;
    if (!this.EmployesFilter) {
      this.mainStatus = false;
    }
    this.ProjetsStatutFilter = false;
    this.statutFilter = false;
    this.sidebarFilterService.send(this.mainStatus);
  }

  homeFilter(): void {
    this.statutFilter = false;
    this.ProjetsStatutFilter = false;
    this.EmployesFilter = false;
    this.sidebarFilter = false;
    this.mainStatus = false;
    this.sidebarFilterService.send(this.mainStatus);
  }

  sendFilter(value): void {
    this.filterService.sendFilter(value);
  }
  choiseFilter(value): void {
    this.filterService.choiseFilter(value);
  }
  clearFilter(): void {
    this.filterService.clearFilter();
  }

  sendTitle(value): void {
    this.SendTitleService.sendTitle(value);
  }

  ngOnDestroy(): void {
   
    
  }

}
