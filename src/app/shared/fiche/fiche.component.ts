import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EmployersAndEmployeesManagementService } from 'src/app/_services/employers-and-employees-management.service';

@Component({
  selector: 'app-fiche',
  templateUrl: './fiche.component.html',
  styleUrls: ['./fiche.component.scss']
})
export class FicheComponent implements OnInit {
  @Input() openModal: boolean;
  @Input() employee;
  @Output() modalClosed = new EventEmitter<boolean>();
  @Output() refreshList = new EventEmitter<boolean>();
  @Input() Title;
  @Input() button;
  @Input() id;
  NewFileSubmitted: boolean = false;
  createNewFileModal: boolean = false;
  refresh: boolean = false;
  createFileForm: FormGroup;
  employeeInfo;
  employeurId;
  message;
  employeNom: string = '';
  employePrenom: string = '';
  constructor(
    private formBuilder: FormBuilder,
    private employersAndEmployeesManagementService: EmployersAndEmployeesManagementService) { }

  ngOnInit(): void {
    this.initNewFileForm();
    this.getClass();
    if (this.employee) {

      this.findByIdEmployee(this.employee.id);
      this.employeNom = this.employee.nom;
      this.employePrenom = this.employee.prenom;
    }
    else {
      this.createFileForm.reset();
    }
  }

  initNewFileForm() {
    this.createFileForm = this.formBuilder.group({
      nom: ['', Validators.required],
      prenom: ['', Validators.required],
      date_naissance: ['', Validators.required],
      lieu_naissance: ['', Validators.required],
      num_securite_sociale: ['', [Validators.required, Validators.minLength(15), Validators.maxLength(15)]],
      adresse_num_voie: ['', [Validators.required, Validators.min(0)]],
      adresse_type_voie: ['', Validators.required],
      adresse_nom_voie: ['', Validators.required],
      adresse_complement: [null],
      adresse_code_postal: ['', [Validators.required, Validators.maxLength(5)]],
      adresse_ville: ['', Validators.required]
    });
  }

  get f() {
    return this.createFileForm.controls;
  }

  NewFileSubmit() {
    this.NewFileSubmitted = true;
    if (this.createFileForm.invalid) {
      return false;
    }
    const body = this.createFileForm.value;
    this.employersAndEmployeesManagementService.createEmployee(body).subscribe(
      (res: any) => {
        if (res.body.success) {
          this.exit();
          this.createFileForm.reset();
          this.NewFileSubmitted = false;
        }
        else {
          this.message = res.body.message;
        }

      },
      error => console.log(error));

  }

  exit() {
    this.openModal = false;
    this.refresh = true;
    this.modalClosed.emit(this.openModal);
    this.refreshList.emit(this.refresh);
  }


  cancel() {
    this.openModal = false;
    this.modalClosed.emit(this.openModal);
    this.createFileForm.reset();
    this.NewFileSubmitted = false;
  }

  editFileSubmit() {
    this.NewFileSubmitted = true;
    if (this.createFileForm.invalid) {
      return false;
    }
    const body = this.createFileForm.value;
    this.employersAndEmployeesManagementService.updateEmployee(this.employeurId, body).subscribe(
      (res: any) => {
        if (res.body.success) {
          this.exit();
        }
      },
      error => console.log(error));

  }

  deleteFileSubmit() {
    this.NewFileSubmitted = true;
    const body = this.createFileForm.value;
    this.employersAndEmployeesManagementService.deleteByIdEmployee(this.employeurId, body).subscribe(
      (res: any) => {
        if (res.body.success) {
          this.exit();
        }
      },
      error => console.log(error));

  }

  findByIdEmployee(id) {
    this.employersAndEmployeesManagementService.findByIdEmployee(id).subscribe(
      (res: any) => {
        if (res.body.success) {
          this.employeeInfo = res.body.data;
          this.employeurId = this.employeeInfo.id;
          this.setValue(this.employeeInfo);
        }
      },
      error => console.log(error));
  }




  setValue($event) {
    this.createFileForm.setValue({
      nom: $event.nom ? $event.nom : '',
      prenom: $event.prenom ? $event.prenom : '',
      date_naissance: $event.date_naissance ? $event.date_naissance : null,
      lieu_naissance: $event.lieu_naissance ? $event.lieu_naissance : '',
      num_securite_sociale: $event.num_securite_sociale ? $event.num_securite_sociale : null,
      adresse_num_voie: $event.adresse_num_voie ? $event.adresse_num_voie : null,
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
