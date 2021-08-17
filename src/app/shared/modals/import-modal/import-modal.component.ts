import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ModelsManagementService } from 'src/app/_services/models-management.service';
import { finalize } from 'rxjs/operators';
import { DocumentsManagementService } from 'src/app/_services/documents-management.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-import-modal',
  templateUrl: './import-modal.component.html',
  styleUrls: ['./import-modal.component.scss']
})
export class ImportModalComponent implements OnInit {
  @ViewChild('fileInput') fileInput;
  @Output() closeModal = new EventEmitter<boolean>();
  @Output() closeImporDocument = new EventEmitter<boolean>();

  @Input() openImportation: boolean;
  @Input() modeleId: string;
  importerDocumentForm: FormGroup;
  importerDocumentSubmitted: boolean = false;
  detectReferencesModal: boolean = false;
  importDisplayModal: boolean = true;
  isSubmitted: boolean = false;
  avatarFile: any[] = [];
  files: File[] = [];
  filesToUpload: Array<File> = [];
  File: any;
  isLoading: boolean = false;
  docSubmitted: boolean = false;
  balisePredf;
  nextModal;
  fileToUpload: any;
  fileUrl;
  constructor(private formBuilder: FormBuilder,
    private router: Router,
    private documentsManagementService: DocumentsManagementService,
    private modelsManagementService: ModelsManagementService) { }

  ngOnInit(): void {
    this.initImporterDocumentForm();
  }

  initImporterDocumentForm() {
    this.importerDocumentForm = this.formBuilder.group({
      fichier: [null,Validators.required],
      modele_id: [null],
      nom: [null],
      type_document_id: [null],
      accessible_to_id: [null],
      balise_reference_ouvrante: [null],
      balise_reference_fermante: [null],
    });
  }


  get importerDocument() {
    return this.importerDocumentForm.controls;
  }

  detectReferencesModalFct() {
    this.importerDocumentSubmitted = true;
    if (this.importerDocumentForm.invalid) {
      return false;
    }
    this.detectReferencesModal = true;
    this.importDisplayModal = false;
  }

  onSelect(event): void {
    const file = event.target.files[0];
    this.files.push(file);
  }


  upload($event) {
    this.files=[];
    this.fileToUpload = $event.target.files[0];
    this.files.push(this.fileToUpload);
    this.importerDocumentForm.get('fichier').setValue(this.fileToUpload.name);
  }

  onRemove(): void {
   // this.files.splice(this.files.indexOf(event), 1);
  }


  annuler() {
    this.openImportation=false;
    this.closeModal.emit(false);
    this.detectReferencesModal = false;
    this.closeImporDocument.emit(this.openImportation);
 
  }


  /*   detectModalFct() {

      this.nextModal = true;
      this.importDisplayModal = false;
      this. openImportation= false;
    } */


  importDocument() {
    this.docSubmitted = true;
    const body = this.importerDocumentForm.value;
    if (this.importerDocumentForm.invalid) {
      return false;
    }
    let formData = new FormData();
    formData.append('fichier', this.fileToUpload);
    formData.append('nom', this.importerDocumentForm.controls['nom'].value);
    formData.append('modele_id', this.modeleId);
    formData.append('balise_reference_ouvrante', this.importerDocumentForm.controls['balise_reference_ouvrante'].value);
    formData.append('balise_reference_fermante', this.importerDocumentForm.controls['balise_reference_fermante'].value);
    this.documentsManagementService.create(formData).subscribe(res => {
      if(res.body.success){

        this.closeImporDocument.emit(false);
        this.closeImport();
      }


    }, err => console.log(err))


  }

  closeImport() {
    this.openImportation = false;
    this.docSubmitted = false;
    this.importerDocumentForm.reset();
    this.closeImporDocument.emit(this.openImportation);
    this.closeModal.emit(false);
    this.detectReferencesModal = false;
  }

}
