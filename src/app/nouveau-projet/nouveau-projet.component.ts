import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MenuItem } from 'primeng/api';
import { Employee } from '../_models/employee';
import { Employer } from '../_models/employer';
import { EmployersAndEmployeesManagementService } from '../_services/employers-and-employees-management.service';

@Component({
  selector: 'app-nouveau-projet',
  templateUrl: './nouveau-projet.component.html',
  styleUrls: ['./nouveau-projet.component.scss']
})
export class NouveauProjetComponent implements OnInit {
  status: boolean = false;
  items: MenuItem[];
  listEmployer: Employer[] = [];
  listEmployee: Employee[] = [];
  createNewFileModal: boolean = false;
  createEmployeurFileModal: boolean = false;
  employeeForm: FormGroup;
  employeurForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private employersAndEmployeesManagementService: EmployersAndEmployeesManagementService) { }

  ngOnInit(): void {
    this.getActifEmployer();
    this.getActifEmployes();
    this.initEmployeeForm();
    this.initEmployeurForm();
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

    this.sideBarSmartTagsRemove();
  }

  initEmployeeForm() {
    this.employeeForm = this.formBuilder.group({
      nom: [''],
      prenom: [''],
      date_naissance: [null],
      lieu_naissance: [''],
      num_securite_sociale: [null],
      adresse_num_voie: [null],
      adresse_type_voie: [''],
      adresse_nom_voie: [''],
      adresse_complement: [''],
      adresse_code_postal: [null],
      adresse_ville: ['']
    });
  }

  initEmployeurForm() {
    this.employeurForm = this.formBuilder.group({
      raison_sociale: [''],
      siren: [''],
      nom_dirigeant: [''],
      prenom_dirigeant: [''],
      adresse_num_voie: [null],
      adresse_type_voie: [''],
      adresse_nom_voie: [''],
      adresse_complement: [''],
      adresse_code_postal: [null],
      adresse_ville: ['']
    });
  }

  sideBarSmartTagsClick(event): void {
    event.preventDefault();
    this.status = !this.status;
  }
  sideBarSmartTagsRemove(): void {
    this.status = false;
  }

  getActifEmployer() {
    this.employersAndEmployeesManagementService.getActifsEmployer().subscribe(
      (res: any) => {
        if (res.body.success) {
          this.listEmployer = res.body.data;
        }
      },
      error => console.log(error));
  }

  getActifEmployes() {
    this.employersAndEmployeesManagementService.getActifEmployes().subscribe(
      (res: any) => {
        if (res.body.success) {
          this.listEmployee = res.body.data;
        }
      },
      error => console.log(error));
  }

  createNewFileModalFct(): void {
    this.createNewFileModal = true;
  }

  openModal($event) {
    this.createNewFileModal = $event;
  }

  closeModal($event) {
    this.createNewFileModal = $event;
  }
  close($event) {
    this.createEmployeurFileModal = $event;
  }

  EmployeurModal($event) {
    this.createEmployeurFileModal = $event;
  }


  employeeInfo($event) {
    this.employeeForm.setValue({
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
  employeurInfo($event) {
    this.employeurForm.setValue({
      raison_sociale: $event.raison_sociale ? $event.raison_sociale : '',
      siren: $event.siren ? $event.siren : '',
      nom_dirigeant: $event.nom_dirigeant ? $event.nom_dirigeant : null,
      prenom_dirigeant: $event.prenom_dirigeant ? $event.prenom_dirigeant : '',
      adresse_num_voie: $event.adresse_num_voie ? $event.adresse_num_voie : null,
      adresse_type_voie: $event.adresse_type_voie ? $event.adresse_type_voie : '',
      adresse_nom_voie: $event.adresse_nom_voie ? $event.adresse_nom_voie : '',
      adresse_complement: $event.adresse_complement ? $event.adresse_complement : '',
      adresse_code_postal: $event.adresse_code_postal ? $event.adresse_code_postal : '',
      adresse_ville: $event.adresse_ville ? $event.adresse_ville : '',
    });

  }

  actualiserEmployeur($event) {
    if ($event == true) {
      this.getActifEmployer();
    }
  }

  actualiserEmployee($event) {
    if ($event == true) {
      this.getActifEmployes();
    }
  }




}
