import { Component, OnDestroy, OnInit } from '@angular/core';
import { Document } from './../../_models/document';
import { DocumentService } from '../../_services/documentservice';
import { MenuItem } from 'primeng/api';
import { EmployersAndEmployeesManagementService } from 'src/app/_services/employers-and-employees-management.service';
import { Employee } from 'src/app/_models/employee';
import { Subscription } from 'rxjs';
import { FilterService } from 'src/app/_services/filter.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-fiches-employe',
  templateUrl: './fiche-employe.component.html',
  styleUrls: ['./fiche-employe.component.scss']
})
export class FicheEmployeComponent implements OnInit, OnDestroy {
  items: MenuItem[];
  listEmployee: Employee[] = [];
  rows = 10;
  page = 1;
  totalRecords;
  filterActif;
  createNewFileModal:boolean = false;
  subscription: Subscription;
  subscriptionEmploye:Subscription;
  selectedItem;
  title;
  button;
  emploInfo;
  constructor(private filterService: FilterService,
    private router:Router,
    private employersAndEmployeesManagementService: EmployersAndEmployeesManagementService) { }

  ngOnInit(): void {
    this.getAllEmployes();
    this.filterByType();
this.filterEmploye();
    this.items = [
      {
        items: [
          {
            label: 'Ouvrir Fiche Employé',
            command: () => this.openDatailModele(this.selectedItem),
          },
          {
            label: 'Editer Fiche Employé',
            command: () => this.editerModele(this.selectedItem),
          },
          {
            label: 'Supprimer Fiche Employé',
            command: () => this.deleteModele(this.selectedItem),
          }
        ]
      },
    ];


  }

  getAllEmployes() {
    let body: any;
    if (this.filterActif !== "all") {
      body = {
        filterby_is_actif: this.filterActif
      }
    }
    this.employersAndEmployeesManagementService.getAllEmployes({ limit_per_page: this.rows, page: this.page }, body).subscribe(
      (res: any) => {
        if (res.body.success) {
          this.listEmployee = res.body.data.list;
          this.totalRecords = res.body.data.total;
          this.listEmployee.forEach(element => {
            if (element.is_actif == true) {
              element.className = "actif";
              element.status = "actif"
            }
            else {
              element.className = "non-actif";
              element.status = "non actif"
            }
            if (element.avertissement == true) {
              element.avertissementString = "oui";
            }
            else {
              element.avertissementString = "non";
            }
          });
        }
      },
      error => console.log(error));
  }

  paginate($event) {
    this.rows = $event.rows;
    this.page = $event.page+1;
    this.getAllEmployes();
  }

  filterByType() {
    this.subscription = this.filterService.getFilter().subscribe(message => {
      if (message) {
        if (message == "all") {
          this.getAllEmployes();
        } else {
          this.filterActif = message.text;
          this.getAllEmployes();
        }


      }
    });
  }

  filterEmploye() {
    this.subscriptionEmploye = this.filterService.getFilter().subscribe(message => {
      if (message.text == "/fiches-employes/list-employe") {
        this.createNewFileModal=true;
      } 
    });
  }

  close($event) {
    this.createNewFileModal = $event;
    this.getAllEmployes();
  }

  openDatailModele(element){
    this.router.navigate(['/fiches-employes/fiche-employe/'+element.id]);

  }

  
  editerModele(element){
    this.emploInfo=element;
    this.title="Edition de la fiche ";
    this.button="Mettre à jour";
    this.createNewFileModal=true;
  }

  deleteModele(element){
    this.emploInfo=element;
    this.title="Suppression de la fiche ";
    this.button="Supprimer";
    this.createNewFileModal=true;
  }
 

  ngOnDestroy() {
    this.subscription.unsubscribe();
    this.subscriptionEmploye.unsubscribe();
  }


}
