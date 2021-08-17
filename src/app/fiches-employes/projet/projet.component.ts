import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MenuItem } from 'primeng/api';
import { Subscription } from 'rxjs';
import { ProjetsEnCoursDocument } from 'src/app/_models/projets-en-cours-document';
import { FilterService } from 'src/app/_services/filter.service';
import { ProjetsManagementService } from 'src/app/_services/projets-management.service';

@Component({
  selector: 'app-projet',
  templateUrl: './projet.component.html',
  styleUrls: ['./projet.component.scss']
})
export class ProjetComponent implements OnInit {

  items: MenuItem[];
  documents: ProjetsEnCoursDocument[];
  listProjet: [];
  rows = 10;
  page = 1;
  searchText;
  totalRecords;
  filterActif;
  subscription: Subscription;
  subscriptionProject: Subscription;
  isNewProject: boolean = false;
  title: string;
  projectId;
  button;
  selectedItem;
  statut_project_id;
  createdby_admin: boolean;
  filterby_statut_project_id: null;
  orderby_statut_project_label;
  orderby_project_name;
  orderby_employe_prenom;
  orderby_employeur_raison_social;
  orderby_etablissement_raison_sociale;
  orderby_modele_name;
  orderby_created_at = "DESC";
  orderby_updated_at;

  constructor(
    private filterService: FilterService,
    private router: Router,
    private projetManagementService: ProjetsManagementService) { }

  ngOnInit(): void {
    this.getAllProject();
    this.filterByType();
    this.filterProject();
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
          }
        ]
      },
    ];


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
      orderby_project_name: this.orderby_project_name ? this.orderby_project_name : null,
      orderby_employe_prenom: this.orderby_employe_prenom ? this.orderby_employe_prenom : null,
      orderby_employeur_raison_social: this.orderby_employeur_raison_social ? this.orderby_employeur_raison_social : null,
      orderby_etablissement_raison_sociale: this.orderby_etablissement_raison_sociale ? this.orderby_etablissement_raison_sociale : null,
      orderby_modele_name: this.orderby_modele_name ? this.orderby_modele_name : null,
      orderby_created_at: this.orderby_created_at ? this.orderby_created_at : null,
      orderby_updated_at: this.orderby_updated_at ? this.orderby_updated_at : null,
    }
    this.projetManagementService.getAllProjets({ limit_per_page: this.rows, page: this.page }, body).subscribe(
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

  filterby(obj){
    if(this[obj]=="ASC"){
      this[obj]="DESC";
    }
    else{
      this[obj]="ASC";
    }
    
   this.getAllProject();
   
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

  openProject(element) {
    this.router.navigate(['/fiches-employes/fiche-projet/', { id: element.id }]);
  }

  createProject() {
    this.isNewProject = true;
    this.title = "Ajouter un nouveau projet";
    this.button = "Créer"
  }

  editProject(element) {
    this.projectId = element;
    this.isNewProject = true;
    this.title = "Edition du projet";
    this.button = "Mettre à jour"
  }


  deleteProject(element) {
    this.projectId = element;
    this.isNewProject = true;
    this.title = "Suppression du projet";
    this.button = "Supprimer"
  }


  filterProject() {
    this.subscriptionProject = this.filterService.getFilter().subscribe(message => {
      if (message.text == "/fiches-employes/projet") {
        this.createProject();
      }

    });
  }

  close($event) {
    this.isNewProject = $event;
    this.getAllProject();
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
    this.subscriptionProject.unsubscribe();
  }
}


