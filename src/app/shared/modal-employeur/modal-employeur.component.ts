import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EmployersAndEmployeesManagementService } from 'src/app/_services/employers-and-employees-management.service';

@Component({
  selector: 'app-modal-employeur',
  templateUrl: './modal-employeur.component.html',
  styleUrls: ['./modal-employeur.component.scss']
})
export class ModalEmployeurComponent implements OnInit {
  @Input() modalOpen: boolean;
  @Input() employeur;
  @Input() Title: string;
  @Input() button: string;
  @Output() closeModal = new EventEmitter<boolean>();
  @Output() refresh = new EventEmitter<boolean>();
  employeurForm: FormGroup;
  NewFileSubmitted: boolean = false;
  refreshList: boolean = false;
  employeurInfo;
  employeurId;
  message: string;
  employeurNom: string = '';
  employeurPrenom: string = '';
  constructor(
    private formBuilder: FormBuilder,
    private employersAndEmployeesManagementService: EmployersAndEmployeesManagementService
  ) { }

  ngOnInit(): void {
    this.initemployeurForm();
    this.getClass();
    if (this.employeur) {
      this.findByIdEmployer(this.employeur.id);
      this.employeurNom = this.employeur.nom_dirigeant;
      this.employeurPrenom = this.employeur.prenom_dirigeant;
    }
    else {
      this.employeurForm.reset();
    }



  }
  initemployeurForm() {
    this.employeurForm = this.formBuilder.group({
      raison_sociale: ['', Validators.required],
      siren: ['', [Validators.required, Validators.minLength(9), Validators.maxLength(9)]],
      nom_dirigeant: ['', Validators.required],
      prenom_dirigeant: ['', Validators.required],
      adresse_num_voie: ['', Validators.required],
      adresse_type_voie: ['', Validators.required],
      adresse_nom_voie: ['', Validators.required],
      adresse_complement: [null],
      adresse_code_postal: ['', [Validators.required, Validators.maxLength(5)]],
      adresse_ville: ['', Validators.required]
    });
  }

  get f() {
    return this.employeurForm.controls;
  }



  NewFileSubmit() {
    this.NewFileSubmitted = true;
    if (this.employeurForm.invalid) {
      return false;
    }
    const body = this.employeurForm.value;
    this.employersAndEmployeesManagementService.createEmployer(body).subscribe(
      (res: any) => {
        if (res.body.success) {
          this.exit();
          this.NewFileSubmitted = false;
          this.employeurForm.reset();

        }
        else {
          this.message = res.body.message;
        }
      },
      error => console.log(error));

  }

  editFileSubmit() {
    this.NewFileSubmitted = true;
    if (this.employeurForm.invalid) {
      return false;
    }
    const body = this.employeurForm.value;
    this.employersAndEmployeesManagementService.updateEmployer(this.employeurId, body).subscribe(
      (res: any) => {
        if (res.body.success) {
          this.exit();
        }

      },
      error => console.log(error));

  }

  deleteFileSubmit() {
    this.NewFileSubmitted = true;
    const body = this.employeurForm.value;
    this.employersAndEmployeesManagementService.deleteByIdEmployer(this.employeurId, body).subscribe(
      (res: any) => {
        if (res.body.success) {
          this.exit();
        }
      },
      error => console.log(error));

  }
  exit() {
    this.modalOpen = false;
    this.refreshList = true;
    this.closeModal.emit(this.modalOpen);
    this.refresh.emit(this.refreshList);
  }

  findByIdEmployer(id) {
    this.employersAndEmployeesManagementService.findByIdEmployer(id).subscribe(
      (res: any) => {
        if (res.body.success) {
          this.employeurInfo = res.body.data;
          this.employeurId = this.employeurInfo.id;
          this.setValue(this.employeurInfo);
        }
      },
      error => console.log(error));
  }


  setValue($event) {
    this.employeurForm.setValue({
      raison_sociale: $event.raison_sociale ? $event.raison_sociale : '',
      siren: $event.siren,
      nom_dirigeant: $event.nom_dirigeant ? $event.nom_dirigeant : '',
      prenom_dirigeant: $event.prenom_dirigeant ? $event.prenom_dirigeant : '',
      adresse_num_voie: $event.adresse_num_voie ? $event.adresse_num_voie : '',
      adresse_type_voie: $event.adresse_type_voie ? $event.adresse_type_voie : '',
      adresse_nom_voie: $event.adresse_nom_voie ? $event.adresse_nom_voie : '',
      adresse_complement: $event.adresse_complement ? $event.adresse_complement : '',
      adresse_code_postal: $event.adresse_code_postal ? $event.adresse_code_postal : '',
      adresse_ville: $event.adresse_ville ? $event.adresse_ville : '',
    });

  }

  submit() {
    switch (this.button) {
      case 'Créer':
        this.NewFileSubmit();
        break;
      case 'Mettre à jour':
        this.editFileSubmit();

        break;
      case 'Supprimer':
        this.deleteFileSubmit();

        break;
    }
  }

  cancel() {
    this.modalOpen = false;
    this.NewFileSubmitted = false;
    this.employeurForm.reset();
    this.closeModal.emit(this.modalOpen);
  }

  getClass() {
    switch (this.button) {
      case 'Créer':
        return 'btn-blue"';

        break;
      case 'Mettre à jour':
        return 'btn-blue"';

        break;
      case 'Supprimer':
        return 'btnred';

        break;
    }
  }


}
