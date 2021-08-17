import { Component, OnInit } from '@angular/core';
import { Document } from './../../_models/document';
import { DocumentService } from '../../_services/documentservice';
import { MenuItem } from 'primeng/api';
import { EmployersAndEmployeesManagementService } from 'src/app/_services/employers-and-employees-management.service';
import { Subscription } from 'rxjs';
import { FilterService } from 'src/app/_services/filter.service';
import { ProjetManagementService } from 'src/app/_services/projets-encours-management.service';
import { ProjetsEnCoursDocument } from 'src/app/_models/projets-en-cours-document';

@Component({
  selector: 'app-list-projet',
  templateUrl: './list-projet.component.html',
  styleUrls: ['./list-projet.component.scss']
})
export class ListProjetComponent implements OnInit {
  items: MenuItem[];
  documents: ProjetsEnCoursDocument[];
  listEmployer: [];
  rows = 10;
  page = 1;
  searchText;
  totalRecords;
  filterActif;
  subscription: Subscription;
  statut_project_id;
  createdby_admin: boolean;
  filterby_statut_project_id : null;
  orderby_statut_project_label;
  orderby_project_name ;
  orderby_employe_prenom ;
  orderby_employeur_raison_social ;
  orderby_etablissement_raison_sociale ; 
  orderby_modele_name ; 
  orderby_created_at="DESC" ;
  orderby_updated_at ;
  constructor(
    private filterService: FilterService,
    private projetManagementService: ProjetManagementService,) { }

  ngOnInit(): void {
    this.getAllProject();
    this.filterByType();
    this.items = [
      {
        items: [
          {
            label: 'Ouvrir ce modèle',
          },
          {
            label: 'Créer un projet à partir du modèle',
          },
          {
            label: 'Supprimer',
          }
        ]
      },
    ];


  }
  filterby(obj){
    if(this[obj]=="ASC"){
      this[obj]="DESC";
    }
    else{
      this[obj]="ASC";
    }
    
   this.getAllProject();
   
  }

  getAllProject() {
    let body: any;
    if (this.filterActif !== "all") {
      body = {
        filterby_is_actif: this.filterActif
      }
    }
     body = {
      filterby_statut_project_id: this.statut_project_id ? this.statut_project_id : null,
      filterby_createdby_admin: this.createdby_admin ? this.createdby_admin : false,
      orderby_statut_project_label: this.orderby_statut_project_label ? this.orderby_statut_project_label : null,
      orderby_project_name : this.orderby_project_name ? this.orderby_project_name : null,
      orderby_employe_prenom : this.orderby_employe_prenom ? this.orderby_employe_prenom : null,
      orderby_employeur_raison_social : this.orderby_employeur_raison_social ? this.orderby_employeur_raison_social : null,
      orderby_etablissement_raison_sociale : this.orderby_etablissement_raison_sociale ? this.orderby_etablissement_raison_sociale : null, 
      orderby_modele_name : this.orderby_modele_name ? this.orderby_modele_name : null, 
      orderby_created_at: this.orderby_created_at ? this.orderby_created_at : null,
      orderby_updated_at : this.orderby_updated_at ? this.orderby_updated_at : null,
    }
    this.projetManagementService.getListProjet({ limit_per_page: this.rows, page: this.page }, body).subscribe(
      (res: any) => {
        if (res.body.success) {
          this.documents = res.body.data.list;
          this.documents.forEach(element => {
            element.class = element.statut_project_libelle.toLowerCase().replace(/\s/g, '');
          });
          this.totalRecords = res.body.data.total;
        }
      },
      error => console.log(error));
  }

  paginate($event) {
    this.rows = $event.rows;
    this.page = $event.page+1;
    this.getAllProject();
  }

 

  filterByType() {
    this.subscription = this.filterService.getFilter().subscribe(message => {
      if (message == "all") {
        this.getAllProject();
      } else {
        this.filterActif = message.text;
        this.getAllProject();
      }

    });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
