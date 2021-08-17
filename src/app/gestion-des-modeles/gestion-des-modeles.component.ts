import { Component, OnDestroy, OnInit } from '@angular/core';
import { Document } from './../_models/document';
import { DocumentService } from '../_services/documentservice';
import { MenuItem } from 'primeng/api';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ModelsManagementService } from '../_services/models-management.service';
import { Subscription } from 'rxjs';
import { FilterService } from '../_services/filter.service';

@Component({
  selector: 'app-gestion-des-modeles',
  templateUrl: './gestion-des-modeles.component.html',
  styleUrls: ['./gestion-des-modeles.component.scss']
})
export class GestionDesModelesComponent implements OnInit, OnDestroy {
  items: MenuItem[];
 totalRecords;
  documents = [];
  displayModal: boolean = false;
  importDisplayModal: boolean = false;
  first = 0;
  rows = 10;
  page=1;
  type: any;
  type_document_id;
  subscription: Subscription;
  title;
  button;
  modeleId;
  orderby_modele_name= "";
  orderby_type_document_libelle= "";
  orderby_created_at= "DESC";
  orderby_updated_at= "";
  orderby_auteur_firstname= "";

  constructor(
    private modelsManagementService: ModelsManagementService,
    private filterService: FilterService
  ) { }

  ngOnInit(): void {
    this.getListModele();
    this.filterByType();
     this.getAllTypeDocument(); 
    this.items = [
      {
        items: [
          {
            label: 'Ouvrir ce modèle',
            command: () => this.editModele(),
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

  showModalDialog(): void {
    this.displayModal = true;
  }

  importModal(): void {
    this.importDisplayModal = !this.importDisplayModal;
  }

  close() {
    this.importDisplayModal = false;
  }


  next() {
    this.first = this.first + this.rows;
  }

  prev() {
    this.first = this.first - this.rows;
  }

  reset() {
    this.first = 0;
  }

  isLastPage(): boolean {
    return this.documents ? this.first === (this.documents.length - this.rows) : true;
  }

  isFirstPage(): boolean {
    return this.documents ? this.first === 0 : true;
  }

  filterby(obj){
    if(this[obj]=="ASC"){
      this[obj]="DESC";
    }
    else{
      this[obj]="ASC";
    }
    
   this.getListModele();
   
  }

  getListModele() {
    const body={
      filterby_type_document_id:this.type_document_id?this.type_document_id:null,
      orderby_modele_name:this.orderby_modele_name?this.orderby_modele_name:null,
      orderby_type_document_libelle:this.orderby_type_document_libelle?this.orderby_type_document_libelle:null,
      orderby_created_at:this.orderby_created_at?this.orderby_created_at:null,
      orderby_updated_at:this.orderby_updated_at?this.orderby_updated_at:null,
      orderby_auteur_firstname:this.orderby_auteur_firstname?this.orderby_auteur_firstname:null,
    }
    this.modelsManagementService.getListModele({ limit_per_page:  this.rows, page: this.page },body).subscribe(
      (res: any) => {
        if (res.body.success) {
          this.documents = res.body.data.list;
         this.totalRecords=res.body.data.total;

        }
      },
      error => console.log(error));
  }

  editModele() {
    this.title = "Edition de la fiche";
    this.button = "Mettre à jour";
   /* this.modeleId = this.employeurInfo;
     this.isCreateNewEmployer = true; */
  }

   getAllTypeDocument() {
    this.modelsManagementService.getAllTypeDocument().subscribe(
      (res: any) => {
        if (res.body.success) {
          this.type = res.body.data;
        }
      },
      error => console.log(error));
  }
 

  getLibelleId(lib) {
    const finded = this.type.find(cat => cat.libelle == lib.text);
    return finded ? finded.id : null;
  }



  filterByType() {
    this.subscription = this.filterService.getFilter().subscribe(message => {
      if (message) {
        
      this.type_document_id= this.getLibelleId(message);
      this.getListModele();

      } else {
        this.type_document_id=null;
        this.getListModele();
      }
    });
  }

  paginate($event) {
        this.rows=$event.rows;
        this.page=$event.page+1;
        this.getListModele();
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
