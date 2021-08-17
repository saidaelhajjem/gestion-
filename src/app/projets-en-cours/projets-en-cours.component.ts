import { Component, OnDestroy, OnInit } from '@angular/core';
import { ProjetsEnCoursDocument } from './../_models/projets-en-cours-document';
import { ProjetsEnCoursService } from './../_services/projets-en-cours-service';
import { MenuItem } from 'primeng/api';
import { ProjetManagementService } from '../_services/projets-encours-management.service';
import { Subscription } from 'rxjs';
import { FilterService } from '../_services/filter.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-projets-en-cours',
  templateUrl: './projets-en-cours.component.html',
  styleUrls: ['./projets-en-cours.component.scss']
})
export class ProjetsEnCoursComponent implements OnInit, OnDestroy {
  items: MenuItem[];
  itemsTwo: MenuItem[];
  totalRecords;
  documents: ProjetsEnCoursDocument[];
  importDisplayModal: boolean = false;
  addNewProjectDisplayModal: boolean = false;
  listStatus: any;
  subscription: Subscription;
  subscriptionFilter: Subscription;
  statut_project_id;
  createdby_admin: boolean;
  rows = 10;
  page = 1;
  title;
  button;
  projectId;
  selectedItem;
     
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
    private projetManagementService: ProjetManagementService,
    private projetService: ProjetsEnCoursService,
    private filterService: FilterService,
    private router:Router,
  ) { }

  ngOnInit(): void {
    this.getAllListStatus();
    this.getListProject();
    this.filterByEtat();
    this.choiseFilter();
    this.items = [
      {
        items: [
          {
            label: 'Ouvrir ce projet',
            command: (event) => {
              this.openProject(this.selectedItem)
            }
          },
          {
            label: 'Editer ce projet',
            command: () => this.editProject(this.selectedItem),
          },
          {
            label: 'Supprimer ce projet',
            command: () => this.deleteProject(this.selectedItem),
          },
          {
            label: 'Ouvrir contrat',
            command: () => {
              this.gotoContrat()
            }
          },
        ]
      },
    ];
    this.itemsTwo = [
      {
        label: 'Nouveau projet',
      },
      {
        label: 'Nouveau modèle',
      }
    ];

  }

  importModal(): void {
    this.importDisplayModal = !this.importDisplayModal;
  }

  close() {
    this.importDisplayModal = false;
  }
  gotoContrat(){
    this.router.navigate(['/preparation-contrat'])
  }

  addNewProjectModal(): void {
    this.addNewProjectDisplayModal = true;
    this.title="Ajouter un nouveau projet";
    this.button ="Créer"
  }
  closeProject($event){
    this.addNewProjectDisplayModal = $event;
    this.getListProject();
  }

  filterby(obj){
    if(this[obj]=="ASC"){
      this[obj]="DESC";
    }
    else{
      this[obj]="ASC";
    }
    
   this.getListProject();
   
  }



  getListProject() {
    const body = {
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

  getAllListStatus() {
    this.projetService.getAllListStatus().subscribe(
      (res: any) => {
        if (res.body.success) {
          this.listStatus = res.body.data;


        }
      },
      error => console.log(error));
  }

  filterByEtat() {
    this.subscription = this.filterService.getFilter().subscribe(message => {
      if (message) {
        this.statut_project_id = this.getLibelleId(message);
        this.getListProject();
      }
      else {
        this.statut_project_id = null;
        this.createdby_admin = false;
        this.getListProject();
      }
    });
  }

  choiseFilter() {
    this.subscriptionFilter = this.filterService.getFilte().subscribe(message => {
      switch (message.text) {
        case "byAdmin":
          this.createdby_admin = true;
          this.getListProject();
          break;
      }

    });
  }


  getLibelleId(lib) {
    const finded = this.listStatus.find(cat => cat.label == lib.text);
    return finded ? finded.id : null;
  }
  paginate($event) {
    this.rows = $event.rows;
    this.page = $event.page+1;
    this.getListProject();
  }

  openProject(element) {
    this.router.navigate(['/fiches-employes/fiche-projet/', { id: element.id }]);
  }


  editProject(element) {
    this.projectId=element;
    this.addNewProjectDisplayModal = true;
    this.title="Edition du projet";
    this.button ="Mettre à jour"
  }


  deleteProject(element) {
    this.projectId=element;
    this.addNewProjectDisplayModal = true;
    this.title="Suppression du projet";
    this.button ="Supprimer"
  }


  ngOnDestroy() {
    this.subscription.unsubscribe();
    this.subscriptionFilter.unsubscribe();
  }
}
