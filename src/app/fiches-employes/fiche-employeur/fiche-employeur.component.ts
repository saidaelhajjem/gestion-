import { Component, OnDestroy, OnInit } from '@angular/core';
import { Document } from './../../_models/document';
import { DocumentService } from '../../_services/documentservice';
import { MenuItem } from 'primeng/api';
import { EmployersAndEmployeesManagementService } from 'src/app/_services/employers-and-employees-management.service';
import { Subscription } from 'rxjs';
import { FilterService } from 'src/app/_services/filter.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-fiche-employeur',
  templateUrl: './fiche-employeur.component.html',
  styleUrls: ['./fiche-employeur.component.scss']
})
export class FicheEmployeurComponent implements OnInit, OnDestroy {
  items: MenuItem[];
  documents: Document[];
  listEmployer: [];
  rows = 10;
  page = 1;
  searchText;
  totalRecords;
  filterActif;
  selectedItem;
  subscription: Subscription;
  subscriptionEmployeur: Subscription;
  createEmployeurFileModal:boolean = false;
  title;
  button;
  employId;
  constructor(
    private filterService: FilterService,
    private router:Router,
    private employersAndEmployeesManagementService: EmployersAndEmployeesManagementService) { }

  ngOnInit(): void {
    this.getAllEmployer();
    this.filterByType();
    this.filterEmployeur();
    this.items = [
      {
        items: [
          {
            label: 'Ouvrir Fiche Employeur',
            command: () => this.openDatailModele(this.selectedItem),
          },
          {
            label: 'Editer Fiche Employeur',
            command: () => this.editerModele(this.selectedItem),
          },
          {
            label: 'Supprimer Fiche Employeur',
            command: () => this.CloseModele(this.selectedItem),
            
          }
        ]
      },
    ];


  }

  getAllEmployer() {
    let body: any;
    if (this.filterActif !== "all") {
      body = {
        filterby_is_actif: this.filterActif
      }
    }
    this.employersAndEmployeesManagementService.getAllEmployer({ limit_per_page: this.rows, page: this.page }, body).subscribe(
      (res: any) => {
        if (res.body.success) {
          this.listEmployer = res.body.data.list;
          this.totalRecords = res.body.data.total;
        }
      },
      error => console.log(error));
  }

  paginate($event) {
    this.rows = $event.rows;
    this.page = $event.page+1;
    this.getAllEmployer();
  }

  filterByType() {
    this.subscription = this.filterService.getFilter().subscribe(message => {
      if (message == "all") {
        this.getAllEmployer();
      } else {
        this.filterActif = message.text;
        this.getAllEmployer();
      }

    });
  }

  filterEmployeur() {
    this.subscriptionEmployeur = this.filterService.getFilter().subscribe(message => {
      if (message.text == "/fiches-employes/fiche-employeur") {
        this.createEmployeurFileModal =true;
        this.title="Création d’une nouvelle fiche";
        this.button="Créer"
      } 
    });
  }

  close($event) {
    this.createEmployeurFileModal = $event;
  }

  actualiserEmployeur($event) {
    if ($event == true) {
      this.getAllEmployer();
    }
  }

  openDatailModele(element){
    this.router.navigate(['/fiches-employes/fiche-employeur-item/'+element.id]);

  }

  editerModele(element){
    this.employId=element;
    this.title="Edition de la fiche ";
    this.button="Mettre à jour";
    this.createEmployeurFileModal=true;
  }

  CloseModele(element){
    this.employId=element;
    this.title="Suppression de la fiche ";
    this.button="Supprimer";
    this.createEmployeurFileModal=true;
  }
  

  ngOnDestroy() {
    this.subscription.unsubscribe();
    this.subscriptionEmployeur.unsubscribe();
  }
}
