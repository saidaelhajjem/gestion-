import { Component, Input, OnInit ,Output,EventEmitter} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ReferencesManagementService } from 'src/app/_services/references-management.service';
import { TagsManagementService } from 'src/app/_services/tags-management.service';

@Component({
  selector: 'app-modal-reference',
  templateUrl: './modal-reference.component.html',
  styleUrls: ['./modal-reference.component.scss']
})
export class ModalReferenceComponent implements OnInit {
  @Input() modalRefernce: boolean;
  @Output() closeModalRef= new EventEmitter<boolean>();
  @Output() refreshRefrence= new EventEmitter<boolean>();

  addReferencesForm: FormGroup;
  refreshRef:boolean;
  addReferenceSubmitted: boolean = false;
  message: string;
  listReference;
  listSmartTag;
  list;
  listRef;
  listReferenceFormat;
  constructor(
    private formBuilder: FormBuilder,
    private referencesManagementService: ReferencesManagementService,
    private tagsManagementService: TagsManagementService,

  ) { }

  ngOnInit(): void {
    this.initReferencesForm();
    this.getAllReference();
    this.getListTags();
    this.getAllReferenceFormat();
  }

  initReferencesForm() {
    this.addReferencesForm = this.formBuilder.group({
      titre: [null, Validators.required],
      format_id: [null, Validators.required],
      smart_tags: [null],
      references_associees: [null],
    });
  }

  get reference() {
    return this.addReferencesForm.controls;
  }

  addReferencesSubmit() {
    this.addReferenceSubmitted = true;
    this.list = [];
    this.listRef = [];
    if (this.addReferencesForm.invalid) {
      return false;
    }
    if(this.addReferencesForm.get('smart_tags').value){

    this.addReferencesForm.get('smart_tags').value.forEach(element => {
      this.list.push(element.id)

    });}
    if( this.addReferencesForm.get('references_associees').value){
    this.addReferencesForm.get('references_associees').value.forEach(element => {
      this.listRef.push(element.id)

    });}

    const body = {
      titre: this.addReferencesForm.get('titre').value,
      format_id: this.addReferencesForm.get('format_id').value.id,
      smart_tags: this.list,
      references_associees: this.listRef,
    };
    this.referencesManagementService.create(body).subscribe(
      (res: any) => {
        if (res.body.success) {
             this.exit();
             this.addReferenceSubmitted = false;
             this.addReferencesForm.reset();

        }
        else {
          this.message = res.body.message;
        }
      },
      error => console.log(error));
  }

  filterUser(event) {
    let filtered: any[] = [];
    let query = event.query;
    for (let i = 0; i < this.listSmartTag.length; i++) {
      let tag = this.listSmartTag[i];
      if (tag.libelle.toLowerCase().indexOf(query.toLowerCase()) == 0) {
        filtered.push(tag);
      }
    }
    this.listSmartTag = filtered;

  }

  getAllReference() {
    this.referencesManagementService.getAllReference().subscribe(
      (res: any) => {
        if (res.body.success) {
          this.listReference = res.body.data;

        }
        else {
          this.message = res.body.message;
        }
      },
      error => console.log(error));
  }

  getAllReferenceFormat() {
    this.referencesManagementService.getAllReferenceFormat().subscribe(
      (res: any) => {
        if (res.body.success) {
          this.listReferenceFormat = res.body.data;

        }
        else {
          this.message = res.body.message;
        }
      },
      error => console.log(error));
  }


  getListTags() {
    this.tagsManagementService.getListSmartTag().subscribe(
      (res: any) => {
        if (res.body.success) {
          this.listSmartTag = res.body.data;
        }
        else {
          this.message = res.body.message;
        }
      },
      error => console.log(error));
  }

  filterReference(event) {
    let filtered: any[] = [];
    let query = event.query;
    for (let i = 0; i < this.listReference.length; i++) {
      let tag = this.listReference[i];
      if (tag.titre.toLowerCase().indexOf(query.toLowerCase()) == 0) {
        filtered.push(tag);
      }
    }
    this.listReference = filtered;

  }

  filterFormat(event) {
    let filtered: any[] = [];
    let query = event.query;
    for (let i = 0; i < this.listReferenceFormat.length; i++) {
      let tag = this.listReferenceFormat[i];
      if (tag.libelle.toLowerCase().indexOf(query.toLowerCase()) == 0) {
        filtered.push(tag);
      }
    }
    this.listReferenceFormat = filtered;
  }

  exit() {
    this.modalRefernce = false;
     this.refreshRef = true;
    this.closeModalRef.emit(this.modalRefernce);
    this.refreshRefrence.emit(this.refreshRef);
  }



  cancel() {
    this.modalRefernce = false;
    this.addReferenceSubmitted = false;
    this.addReferencesForm.reset();
    this.closeModalRef.emit(this.modalRefernce);
  }
}
