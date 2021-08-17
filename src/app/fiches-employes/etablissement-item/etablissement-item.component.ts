import { Component, OnInit } from '@angular/core';
import { Document } from './../../_models/document';
import { DocumentService } from '../../_services/documentservice';
import { MenuItem } from 'primeng/api';
import { FilterService } from 'src/app/_services/filter.service';
import { ActivatedRoute, Router } from '@angular/router';
import { EtablissementsManagementService } from 'src/app/_services/etablissements-management.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-etablissement-item',
  templateUrl: './etablissement-item.component.html',
  styleUrls: ['./etablissement-item.component.scss']
})
export class EtablissementItemComponent implements OnInit {
  items: MenuItem[];
  documents: Document[];
  listETablissement: [];
  rows = 10;
  page = 1;
  searchText;
  totalRecords;
  filterActif;
  title;
  button;
  etablissementInfo;
  subscription: Subscription;
  selectedItem;
  subscriptionEtablissement:Subscription;
  isCreateNewEtablissement:boolean=false;
  EtablissementInfo;
  etablissementId;

  constructor(
    private filterService: FilterService,
    private router:Router,
    private route:ActivatedRoute,
    private etablissementsManagementService: EtablissementsManagementService) { }

  ngOnInit(): void {
    this.etablissementId=this.route.snapshot.params;
    if(this.etablissementId)this.findByIdEtablissement(this.etablissementId);
    this.getAllEtablissement();
      this.filterEtablissement();
      this.filterByType();
      this.items = [
        {
          items: [
            {
              label: 'Ouvrir Fiche établissement',
              command: () => this.openDatailModele(this.selectedItem),
            },
            {
              label: 'Editer Fiche établissement',
              command: () => this.editerModele(this.selectedItem),
            },
            {
              label: 'Supprimer Fiche établissement',
              command: () => this.deleteModele(this.selectedItem),
            }
          ]
        },
      ];
  }

  findByIdEtablissement(element) {
    this.etablissementsManagementService.findById(element.id).subscribe(
      (res: any) => {
        if (res.body.success) {
          this.etablissementInfo = res.body.data;
          console.log(  this.etablissementInfo )
          
        }
      },
      error => console.log(error));
  }

  openDatailModele(element){
    this.router.navigate(['/fiches-employes/etablissement-item/'+element.id]); 

 }

 editerModele(element){
   this.EtablissementInfo=element;
   this.title="Edition de la fiche ";
   this.button="Mettre à jour";
   this.isCreateNewEtablissement=true;
 }

 deleteModele(element){
   this.EtablissementInfo=element;
   this.title="Suppression de la fiche ";
   this.button="Supprimer";
   this.isCreateNewEtablissement=true;
 }

 getAllEtablissement() {
   let body: any;
   if (this.filterActif !== "all") {
     body = {
       filterby_is_actif: this.filterActif
     }
   }
   this.etablissementsManagementService.getAllEtablissement({ limit_per_page: this.rows, page: this.page }, body).subscribe(
     (res: any) => {
       if (res.body.success) {
         this.listETablissement = res.body.data.list;
         this.totalRecords = res.body.data.total;
       }
     },
     error => console.log(error));
 }

 paginate($event) {
   this.rows = $event.rows;
   this.page = $event.page+1;
   this.getAllEtablissement();
 }

 filterByType() {
   this.subscription = this.filterService.getFilter().subscribe(message => {
     if (message == "all") {
       this.getAllEtablissement();
     } else {
       this.filterActif = message.text;
       this.getAllEtablissement();
     }

   });
 }

 filterEtablissement() {
   this.subscriptionEtablissement = this.filterService.getFilter().subscribe(message => {
     if (message.text == "/fiches-employes/etablissement") {
       this.isCreateNewEtablissement=true;
       this.title="Création d’une nouvelle établissement";
       this.button="Créer"
     } 
   });
 }

 closeEtablissement($event){
   this.isCreateNewEtablissement=$event;
   this.getAllEtablissement();

 }

 ngOnDestroy() {
   this.subscription.unsubscribe();
 }

}
