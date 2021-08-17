import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MenuItem } from 'primeng/api';
import { threadId } from 'worker_threads';
import { ConditionsManagementService } from '../_services/conditions-management.service';
import { ModelsManagementService } from '../_services/models-management.service';
import { ReferencesManagementService } from '../_services/references-management.service';
import { TagsManagementService } from '../_services/tags-management.service';
import { Location } from '@angular/common';
import {AppService} from "../_services/app.service";
import {Modele} from "../_models/modele";
import {Subscription} from "rxjs";
import {DocumentsManagementService} from "../_services/documents-management.service";

@Component({
  selector: 'app-elements-modele',
  templateUrl: './elements-modele.component.html',
  styleUrls: ['./elements-modele.component.scss']
})
export class ElementsModeleComponent implements OnInit {
  status: boolean = false;
  condition: boolean = false;
  items: MenuItem[];
  importDisplayModal: boolean = false;
  documentId;
  document;
  listCondition;
  listTags;
  allReferences;
  reference: boolean = false;
  addReferencesModal:boolean = false;
  addConditionModal:boolean = false;
  documentSmartTag;
  documentReference;
  documentCondition;
  idSmartTag;
  idCondition;
  idReference;
  addtagsModal:boolean = false;
  currentModele: Modele;
  private currentModeleSubscription: Subscription;
  currentModeleId: any;
  term;
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private location: Location,
    private app: AppService,
    private modelsManagementService: ModelsManagementService,
    private documentsManagementService: DocumentsManagementService,
    private conditionsManagementService: ConditionsManagementService,
    private tagsManagementService: TagsManagementService,
    private referencesManagementService: ReferencesManagementService,
  ) { }

  ngOnInit(): void {
    this.route.queryParams.subscribe(data => {
      this.currentModeleId = data.id;
    });
    this.currentModeleSubscription =  this.app.getCurrentModele().subscribe(currentModele => {
      if (currentModele) {
        this.currentModele = currentModele;
        this.document = currentModele.documents[0];
        this.documentId = currentModele.documents[0]?.id;
      }
    });
    if (!this.currentModele) {
      this.router.navigate(['/']).then();
    }else {
      this.getModeleById();
    }
    this.getAllCondition();
    this.getAllListTag();
    this.getAllReference();

    this.items = [
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
    this.sideBarSmartTagsClickEvent();
    this.sideBarSmartTagsRemove();

  }

  sideBarSmartTagsClickEvent(): void {
    this.status = !this.status;
  }
  sideBarSmartTagsRemove(): void {
    this.status = false;
  }

  sideBarConditionClickEvent(): void {
    this.condition = !this.condition;
  }
  sideBarConditionRemove(): void {
    this.condition = false;
  }

  sideBarReferenceClickEvent(): void {
    this.reference = !this.reference;
  }
  sideBarReferenceRemove(): void {
    this.reference = false;
  }


  addDoc() {
    this.importDisplayModal = !this.importDisplayModal;
  }

  onFinish($event) {
    this.importDisplayModal = $event;
    this.getModeleById();
  }

  editerDocument() {
    if (this.documentId) {
      this.router.navigate(['contrat-edit'], { queryParams: { id: this.documentId } })
    }
  }


  getModeleById() {
    let id = this.currentModele.id;
    if(this.currentModeleId !== this.currentModele.id){
      id = this.currentModele.id;
    }
    this.modelsManagementService.findById(id).subscribe(res => {
      if (res.body.success) {
        this.document = res.body.data?.documents[0];
        this.documentSmartTag = this.document.smart_tags;
        this.documentCondition= this.document.conditions;
        this.documentReference=this.document.references;
        this.app.setCurrentModeleObservable(res.body.data);
      }

    },
      err => console.log(err))
  }


  getAllCondition() {
    this.conditionsManagementService.getListCondition().subscribe(res => {
      if (res.body.success) {
        this.listCondition = res.body.data;
      }
    },
      err => console.log(err))
  }

  getAllListTag() {
    this.tagsManagementService.getListSmartTag().subscribe(res => {
      if (res.body.success) {
        this.listTags = res.body.data;

      }
    },
      err => console.log(err))
  }


  getAllReference() {
    this.referencesManagementService.getAllReference().subscribe(
      (res: any) => {
        if (res.body.success) {
          this.allReferences = res.body.data;


        }

      },
      error => console.log(error));
  }

  updateDocument() {
    const body = {
      smart_tags: this.idSmartTag,
      conditions:this.idCondition,
      references:this.idReference,
    };
    this.documentsManagementService.update(this.documentId, body).subscribe(res => {
      if(res.body.success){
        this.getModeleById();
      }

     },
      err => console.log(err))

  }


  RemoveElementFromTagsArray(key: number) {
    this.documentSmartTag?.forEach((value, index) => {
      if (value.id == key) this.documentSmartTag.splice(index, 1);
    });
    this.idSmartTag = [];
    this.documentSmartTag?.forEach(element => this.idSmartTag.push(element.id));
    this.updateDocument();
  }

  addElementFromTagsArray(key: number) {
    this.idSmartTag = [];
    this.documentSmartTag?.forEach(element => this.idSmartTag.push(element.id));
    this.idSmartTag.push(key)
    this.updateDocument();
  }


  RemoveElementFromConditionArray(key: number) {
    this.documentCondition?.forEach((value, index) => {
      if (value.id == key) this.documentCondition.splice(index, 1);
    });
    this.idCondition = [];
    this.documentCondition?.forEach(element => this.idCondition.push(element.id));
    this.updateDocument();
  }

  addElementFromConditionArray(key: number) {
    this.idCondition = [];
    this.documentCondition?.forEach(element => this.idCondition.push(element.id));
    this.idCondition.push(key)
    this.updateDocument();
  }


  RemoveElementFromReferenceArray(key: number) {
    this.documentReference?.forEach((value, index) => {
      if (value.id == key) this.documentReference.splice(index, 1);
    });
    this.idReference = [];
    this.documentReference?.forEach(element => this.idReference.push(element.id));
    this.updateDocument();
  }

  addElementFromReferenceArray(key: number) {
    this.idReference = [];
    this.documentReference?.forEach(element => this.idReference.push(element.id));
    this.idReference.push(key)
    this.updateDocument();
  }


  addNewReference(){
    this.addReferencesModal = !this.addReferencesModal;
  }

  closeRef($event){
  this.addReferencesModal =$event;
  }
  actualiseRef($event){
    this.getAllReference();

  }

  addNewCondition(){
    this.addConditionModal = !this.addConditionModal;
  }

  closeCondition($event){
    this.addConditionModal=$event;

  }
   actualiseCondition($event){
    this.getAllCondition();
  }
  addNewtags(){
    this.addtagsModal = !this.addtagsModal;
  }

  closeModalTag($event){
    this.addtagsModal =$event;
  }

  actualiseModalTag($event){
    this.getAllListTag();
  }

  back(): void {
    this.location.back()
  }
  ngOnDestroy() {
    if (this.currentModeleSubscription) {
      this.currentModeleSubscription.unsubscribe();
    }
  }
}
