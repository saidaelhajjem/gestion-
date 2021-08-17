import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MenuItem } from 'primeng/api';
import { EmployersAndEmployeesManagementService } from '../_services/employers-and-employees-management.service';

@Component({
  selector: 'app-preparation-contrat',
  templateUrl: './preparation-contrat.component.html',
  styleUrls: ['./preparation-contrat.component.scss']
})
export class PreparationContratComponent implements OnInit {
  documentGenerationModal: boolean = false;
  section: number = 0;
  items: MenuItem[];
  itemEmploye: MenuItem[];
  isCreateNewEmployer: boolean = false;
  isCreateNewEmployee: boolean = false;
  title;
  button;
  employeurInfo;
  employeurId;
  employeeInfo
  employeeId
  employeurForm: FormGroup;
  employeeForm: FormGroup;
  employId;
  emploInfo;
  employBoolean: boolean = false;
  idEmployeur: number = 16;
  idEmployee: number = 12;
  constructor(private formBuilder: FormBuilder,
    private employersAndEmployeesManagementService: EmployersAndEmployeesManagementService) { }

  ngOnInit(): void {

    this.itemEmploye = [
      {
        label: 'Options',
        items: [
          {
            label: 'Créer un nouvel employee',
            command: () => this.createNewEmployee(),
          },
          {
            label: 'Éditer la fiche',
            command: () => this.editEmployee(),
          },
          {
            label: 'Supprimer la fiche',
            command: () => this.deleteEmployee(),
          }
        ]
      },
    ];
    this.items = [
      {
        label: 'Options',
        items: [
          {
            label: 'Créer un nouvel employeur',
            command: () => this.createNewEmployer(),
          },
          {
            label: 'Éditer la fiche',
            command: () => this.editEmployer(),
          },
          {
            label: 'Supprimer la fiche',
            command: () => this.deleteEmployer(),
          }
        ]
      },
    ];
    this.initemployeurForm();
    this.initEmployeurForm();
    this.findByIdEmployer(this.idEmployeur);
    this.findByIdEmployee(this.idEmployee);
  }

  initemployeurForm() {
    this.employeurForm = this.formBuilder.group({
      raison_sociale: [''],
      siren: [''],
      nom_dirigeant: [''],
      prenom_dirigeant: [''],
      adresse_num_voie: [''],
      adresse_type_voie: [''],
      adresse_nom_voie: [''],
      adresse_complement: [''],
      adresse_code_postal: [''],
      adresse_ville: ['']
    });
  }
  initEmployeurForm() {
    this.employeeForm = this.formBuilder.group({
      nom: [''],
      prenom: [''],
      date_naissance: [''],
      lieu_naissance: [''],
      num_securite_sociale: [''],
      adresse_num_voie: [''],
      adresse_type_voie: [''],
      adresse_nom_voie: [''],
      adresse_complement: [''],
      adresse_code_postal: [''],
      adresse_ville: ['']
    });
  }
  createNewEmployer() {
    this.isCreateNewEmployer = true;
    this.title = "Création d’une nouvelle fiche";
    this.button = "Créer";

  }

  editEmployer() {
    this.title = "Edition de la fiche";
    this.button = "Mettre à jour";
    this.employId = this.employeurInfo;
    this.isCreateNewEmployer = true;


  }

  deleteEmployer() {
    this.title = "Suppression de la fiche";
    this.button = "Supprimer";
    this.employId = this.employeurInfo;
    this.isCreateNewEmployer = true;
  }

  createNewEmployee() {
    this.isCreateNewEmployee = true;
    this.title = "Création d’une nouvelle fiche";
    this.button = "Créer";

  }

  editEmployee() {
    this.title = "Edition de la fiche";
    this.button = "Mettre à jour";
    this.emploInfo = this.employeeInfo;
    this.isCreateNewEmployee = true;

  }

  deleteEmployee() {
    this.title = "Suppression de la fiche";
    this.button = "Supprimer";
    this.emploInfo = this.employeeInfo;
    this.isCreateNewEmployee = true;
  }


  checkNumber(): void {
    const sectionElement = document.querySelectorAll<HTMLElement>('.sections .section');
    const next = document.querySelector<HTMLElement>('.next');
    const prev = document.querySelector<HTMLElement>('.prev');

    this.section === 0 ? prev.classList.add('disapled') : prev.classList.remove('disapled');

    // choose active section
    sectionElement.forEach((element) => element.classList.remove('active'));
    sectionElement[this.section].classList.add('active');
    next.setAttribute('form', `section${this.section}`);
  }

  /* prev Steps */
  prevStepsFct(event): void {
    event.preventDefault();
    if (this.section > 0) {
      this.section--;
    }
    this.checkNumber();
  }

  /* next Steps */
  nextStepsFct(event): void {
    event.preventDefault();
    if (this.section < 4) {
      this.section++;
    }
    this.checkNumber();
  }


  documentGenerationModalFct(): void {
    this.documentGenerationModal = true;
  }

  close($event) {
    this.isCreateNewEmployer = $event;
    this.employId = undefined;

  }
  closeModal($event) {
    this.isCreateNewEmployee = $event;
    this.emploInfo = undefined;
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



  findByIdEmployee(id) {
    this.employersAndEmployeesManagementService.findByIdEmployee(id).subscribe(
      (res: any) => {
        if (res.body.success) {
          this.employeeInfo = res.body.data;
          this.employeeId = this.employeeInfo.id;
          this.setValueEmployee(this.employeeInfo);

        }
      },
      error => console.log(error));
  }




  setValueEmployee($event) {
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



  actualiserEmployer($event) {
    if ($event == true) {
      this.employId = undefined;
      this.findByIdEmployer(this.idEmployeur);
    }
  }
  actualiserEmployee($event) {
    if ($event == true) {
      this.emploInfo = undefined;
      this.findByIdEmployee(this.idEmployee);
    }
  }

}
