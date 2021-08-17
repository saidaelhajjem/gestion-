import { Component, Input, OnInit, Output ,EventEmitter} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EmployersAndEmployeesManagementService } from 'src/app/_services/employers-and-employees-management.service';
import { EtablissementsManagementService } from 'src/app/_services/etablissements-management.service';

@Component({
  selector: 'app-modal-etablissement',
  templateUrl: './modal-etablissement.component.html',
  styleUrls: ['./modal-etablissement.component.scss']
})
export class ModalEtablissementComponent implements OnInit {

  @Input() openEtablissement: boolean;
  @Input() employeur;
  @Input() Title: string;
  @Input() button: string;
  @Output() closeModalEtablissement = new EventEmitter<boolean>();
  @Output() refresh = new EventEmitter<boolean>();
  etablissementForm: FormGroup;
  NewFileSubmitted: boolean = false;
  refreshList: boolean = false;
  employeurInfo;
  employeurId;
  message: string;
  employeurNom: string = '';
  employeurPrenom: string = '';
  constructor(
    private formBuilder: FormBuilder,
    private EtablissementsManagementService:EtablissementsManagementService,
    private employersAndEmployeesManagementService: EmployersAndEmployeesManagementService
  ) { }

  ngOnInit(): void {
    this.initEtablissementForm();
    this.getClass();
    if (this.employeur) {
      this.findByIdEmployer(this.employeur.id);
    }
    else {
      this.etablissementForm.reset();
    }



  }
  initEtablissementForm() {
    this.etablissementForm = this.formBuilder.group({
      raison_sociale: ['', Validators.required],
      siren: ['', [Validators.required, Validators.minLength(9), Validators.maxLength(9)]],
      siret: ['', [Validators.required, Validators.minLength(13), Validators.maxLength(14)]],
      adresse_num_voie: ['', Validators.required],
      adresse_type_voie: ['', Validators.required],
      adresse_nom_voie: ['', Validators.required],
      adresse_complement: [null],
      adresse_code_postal: ['', [Validators.required, Validators.maxLength(5)]],
      adresse_ville: ['', Validators.required],
      nbre_salaries: [null],
      type_etablissement: ['', Validators.required],
      statut_juridique_id:[null],
      ape_code:[null],
      adresse_num_voie_etab:[''],
      adresse_type_voie_etab:[''],
      adresse_nom_voie_etab:[''],
      adresse_complement_etab:[''],
      adresse_code_postal_etab:[''],
      adresse_ville_etab:[''],

    
     

    });
  }

  get f() {
    return this.etablissementForm.controls;
  }



  NewFileSubmit() {
    this.NewFileSubmitted = true;
    if (this.etablissementForm.invalid) {
      return false;
    }
    this.etablissementForm.get('statut_juridique_id').setValue(6);
    const body = this.etablissementForm.value;
    this.EtablissementsManagementService.create(body).subscribe(
      (res: any) => {
        if (res.body.success) {
          console.log(res.body)
          this.exit();
          this.NewFileSubmitted = false;
          this.etablissementForm.reset();

        }
        else {
          this.message = res.body.message;
        }
      },
      error => console.log(error));

  }

  editFileSubmit() {
    this.NewFileSubmitted = true;
    if (this.etablissementForm.invalid) {
      return false;
    }
    const body = this.etablissementForm.value;
    this.EtablissementsManagementService.update(this.employeurId, body).subscribe(
      (res: any) => {
        if (res.body.success) {
          this.exit();
        }

      },
      error => console.log(error));

  }

  deleteFileSubmit() {
    this.NewFileSubmitted = true;
    const body = this.etablissementForm.value;
    this.employersAndEmployeesManagementService.deleteByIdEmployer(this.employeurId, body).subscribe(
      (res: any) => {
        if (res.body.success) {
          this.exit();
        }
      },
      error => console.log(error));

  }
  exit() {
    this.openEtablissement = false;
    this.refreshList = true;
    this.closeModalEtablissement.emit(this.openEtablissement);
    this.refresh.emit(this.refreshList);
  }

  findByIdEmployer(id) {
    this.EtablissementsManagementService.findById(id).subscribe(
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
    this.etablissementForm.setValue({
      raison_sociale: $event.raison_sociale ? $event.raison_sociale : '',
      siren: $event.siren,
      siret: $event.siret,
      adresse_num_voie: $event.adresse_num_voie ? $event.adresse_num_voie : '',
      adresse_type_voie: $event.adresse_type_voie ? $event.adresse_type_voie : '',
      adresse_nom_voie: $event.adresse_nom_voie ? $event.adresse_nom_voie : '',
      adresse_complement: $event.adresse_complement ? $event.adresse_complement : '',
      adresse_code_postal: $event.adresse_code_postal ? $event.adresse_code_postal : '',
      adresse_ville: $event.adresse_ville ? $event.adresse_ville : '',
      nbre_salaries: $event.nbre_salaries ? $event.nbre_salaries : '',
      type_etablissement: $event.type_etablissement ? $event.type_etablissement : '',
      statut_juridique_id: $event.statut_juridique_id ? $event.statut_juridique_id : '',
      ape_code: $event.ape_code ? $event.ape_code : '',
      adresse_num_voie_etab: $event.adresse_num_voie_etab ? $event.adresse_num_voie_etab : '',
      adresse_type_voie_etab: $event.adresse_type_voie_etab ? $event.adresse_type_voie_etab : '',
      adresse_nom_voie_etab: $event.adresse_nom_voie_etab ? $event.adresse_nom_voie_etab : '',
      adresse_complement_etab: $event.adresse_complement_etab ? $event.adresse_complement_etab : '',
      adresse_code_postal_etab: $event.adresse_code_postal_etab ? $event.adresse_code_postal_etab : '',
      adresse_ville_etab: $event.adresse_ville_etab ? $event.adresse_ville_etab : '',
    
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
    this.openEtablissement = false;
    this.NewFileSubmitted = false;
    this.etablissementForm.reset();
    this.closeModalEtablissement.emit(this.openEtablissement);
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

