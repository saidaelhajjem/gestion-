import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { DashboardService } from '../_services/dashboard.service';
import { ModelsManagementService } from '../_services/models-management.service';
import { NotificationService } from '../_services/notification.service';
import { UserService } from '../_services/user.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  item: MenuItem[];
  importDisplayModal: boolean = false;
  listStatique: any;
  listModele: any;
  listDocument: any;
  notifications: any;
  selected: any;
  filterDay = "-7 days";
  listUser;
  displayModal:boolean = false;
  direction:string;
  constructor(
    private dashboardServise: DashboardService,
    private ModelsManagementService: ModelsManagementService,
    private userService: UserService,
    private notificationService: NotificationService) { }

  ngOnInit(): void {
    this.allFilter();
    this.notification();
    this.getAllUser();
    this.item = [
      {
        label: 'Options',
        items: [
          {
            label: 'Options 1',
          },
          {
            label: 'Options 2',
          }
        ]
      },
    ];
  }


  notification() {
    this.notificationService.alerte().subscribe(
      (res: any) => {
        if (res.status == 200) {
          this.notifications = res.body.data;
        }
      },
      error => console.log(error));

  }

  allFilter() {
    const body = {
      filterby_auteur_id: 1,
      filterby_created_at: this.filterDay,
    }
    this.dashboardServise.getInfoDashboard(body).subscribe(
      (res: any) => {
        this.listStatique = res.body.data.cards[0];
        this.listDocument = res.body.data.derniers_vus;
        this.listModele = res.body.data.modeles;

      },
      error => console.log(error));
  }

  importModal(): void {
    this.importDisplayModal = !this.importDisplayModal;
  }

  close() {
    this.importDisplayModal = false;
  }

  getDay(element) {
    this.filterDay = element;
    this.allFilter();

  }

  filterUser(event) {
    let filtered: any[] = [];
    let query = event.query;
    for (let i = 0; i < this.listUser.length; i++) {
      let user = this.listUser[i];
      if ((user.firstname.toLowerCase().indexOf(query.toLowerCase()) == 0) || (user.lastname.toLowerCase().indexOf(query.toLowerCase()) == 0)) {
        filtered.push(user);
      }
    }
    this.listUser = filtered;

  }

  getAllUser() {
    this.userService.getListUser().subscribe(res => {
      if (res.body.success) {
        this.listUser = res.body.data;
      }

    }, err => console.log(err))
  }


  ajouterModele(){
this.displayModal=!this.displayModal;
this.direction="/elements-modele"
  }
  closeModal($event){
    this.displayModal=$event;
  }

}
