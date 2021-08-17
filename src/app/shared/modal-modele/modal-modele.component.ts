import { Component, Input, OnInit, Output,EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ModelsManagementService } from 'src/app/_services/models-management.service';
import {AppService} from "../../_services/app.service";

@Component({
  selector: 'app-modal-modele',
  templateUrl: './modal-modele.component.html',
  styleUrls: ['./modal-modele.component.scss']
})
export class ModalModeleComponent implements OnInit {
  @Input() modeleOpen: boolean;
  @Input() redirectTo;
  @Output() closeModal = new EventEmitter<boolean>();
  fileToUpload: any;
  modalForm: FormGroup;
  NewFileSubmitted: boolean = false;
  nameFile:string=".doc, .docx, .txt, .rtf"
  fileUrl;
  constructor(
    private router: Router,
    private modelsManagementService: ModelsManagementService,
    public app: AppService,
    private formBuilder: FormBuilder
  ) { }

  ngOnInit(): void {
    this.initForm();
  }

  initForm() {
    this.modalForm = this.formBuilder.group({
      nom: [null,Validators.required],
      type_document_id: [null],
      accessible_to_id: [null],
      fichier: [null],
    })
  }


  cancel() {
    this.modeleOpen = false;
    this.NewFileSubmitted = false;
    this.modalForm.reset();
    this.nameFile=".doc, .docx, .txt, .rtf";
     this.closeModal.emit(this.modeleOpen);
  }




  create() {
    this.NewFileSubmitted = true;
    if (this.modalForm.invalid) {
      return false;
    }
    const body = this.modalForm.value;
    let formData = new FormData();
    formData.append('fichier', this.fileToUpload);
    formData.append('nom', this.modalForm.controls['nom'].value);

    this.modelsManagementService.createModele(formData).subscribe(res => {
      if(res.body.success){
        this.app.setCurrentModeleObservable(res.body.data);
        this.router.navigate([this.redirectTo], { queryParams: { id: res.body.data?.id } })
      }


    }, err => console.log(err))



  }

  get f() {
    return this.modalForm.controls;
  }

  upload($event) {
    this.fileToUpload = $event.target.files[0];
    this.modalForm.get('fichier').setValue(this.fileToUpload.name);
    this.nameFile=this.fileToUpload.name;
  }

}
