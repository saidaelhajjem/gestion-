import { Component, OnInit } from '@angular/core';
import { Document } from './../../_models/document';
import { DocumentService } from '../../_services/documentservice';
import { MenuItem } from 'primeng/api';
import { ActivatedRoute } from '@angular/router';
import { ProjetManagementService } from 'src/app/_services/projets-encours-management.service';
import { DocumentsManagementService } from 'src/app/_services/documents-management.service';

@Component({
  selector: 'app-fiche-projet',
  templateUrl: './fiche-projet.component.html',
  styleUrls: ['./fiche-projet.component.scss']
})
export class FicheProjetComponent implements OnInit {
  items: MenuItem[];
  documents: Document[];
  projectId;
  projectInfo;
  modeleId;
  listDocument;
  constructor(private documentService: DocumentService,
    private projetManagementService:ProjetManagementService,
    private documentsManagementService: DocumentsManagementService,
    private route: ActivatedRoute,) { }

  ngOnInit(): void {
    this.projectId = this.route.snapshot.params.id;
    if(this.projectId){
      this.findById();
    }
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

    this.documentService.getDocumentsSmall().then(data => this.documents = data);
  }


  findById(){
    const body= this.projectId;
    this.projetManagementService.findById(body).subscribe(res=>{
      
      this.projectInfo=res.body.data;
      this.modeleId=this.projectInfo.modele_id;
      this.getAllByModelId();
    },
      err=>console.log(err))
  }

  getAllByModelId(){
    const body= this.modeleId;
    this.documentsManagementService.getAllByModelId(body).subscribe(res=>{
      
     
     console.log("doc",res.body.data)
     this.listDocument=res.body.data;
     this.listDocument.forEach(element => {
      if (element.is_actif == true) {
        element.className = "actif";
        element.status = "actif"
      }
      else {
        element.className = "non-actif";
        element.status = "non actif"
      }})
    },
      err=>console.log(err))
  }

}
