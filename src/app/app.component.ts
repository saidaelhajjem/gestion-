import { Component, OnInit, OnDestroy } from '@angular/core';
import { SidebarFilterService } from './_services/sidebarFilter.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {
  title = 'alea';
  mainStatus: boolean = false;
  private subscription: Subscription;

  constructor(
    private sidebarFilterService: SidebarFilterService
  ) { }

  ngOnInit(): void {
    this.getAction();
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  getAction(): void {
    this.subscription = this.sidebarFilterService.get().subscribe(res => {
      this.mainStatus = res.actif;
    });
  }
}
