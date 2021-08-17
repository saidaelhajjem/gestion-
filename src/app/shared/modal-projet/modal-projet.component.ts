
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { Component, Input, OnInit,EventEmitter, Output} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProjetsManagementService } from 'src/app/_services/projets-management.service';

@Component({
  selector: 'app-modal-projet',
  templateUrl: './modal-projet.component.html',
  styleUrls: ['./modal-projet.component.scss']
})
export class ModalProjetComponent implements OnInit {
@Input() projectOpen:boolean;
@Input() title;
@Input() button;
@Input () project;
projetInfo;
projectId;
@Output() closeModalProject= new EventEmitter<boolean>();
projectForm:FormGroup;
NewFileSubmitted:boolean=false;
  constructor(
    private formBuilder:FormBuilder,
    private projetManagementService: ProjetsManagementService
  ) { }

  ngOnInit(): void {
    if(this.project)this.findProjectById(this.project)
    this.initProjectForm();
  }

  initProjectForm(){
    this.projectForm=this.formBuilder.group({
      nom:[null,Validators.required],
      modele_id:[null],
      accessible_to_id:[null],
      statut_project_id:[null],
    })
  }
  get f() {
    return this.projectForm.controls;
  }

  createProject() {
    this.NewFileSubmitted=true;
    if (this.projectForm.invalid) {
      return false;
    }
    const body = this.projectForm.value;
    
    this.projetManagementService.create( body).subscribe(
      (res: any) => {
        if (res.body.success) {
         this.exit();
        }
      },
      error => console.log(error));
  }

  cancel() {
    this.projectOpen = false;
    this.NewFileSubmitted = false;
    this.projectForm.reset();
    this.closeModalProject.emit(this.projectOpen);
  }

  
  findProjectById(element) {
    this.projetManagementService.findById(element.id).subscribe(
      (res: any) => {
        if (res.body.success) {
          this.projetInfo = res.body.data;
          this.projectId=this.projetInfo.id;
          this.setValue(this.projetInfo);
        }
      },
      error => console.log(error));
  }


  updateProjectById() {
    const body = this.projectForm.value;
    this.projetManagementService.update(this.projectId ,body).subscribe(
      (res: any) => {
        if (res.body.success) {
         this.exit();
        }
      },
      error => console.log(error));
  }

  deleteProjectById() {
    const body = this.projectForm.value;
    this.projetManagementService.deleteById(this.projectId ,body).subscribe(
      (res: any) => {
        if (res.body.success) {
         this.exit();
        }
      },
      error => console.log(error));
  }

  setValue($event) {
    this.projectForm.setValue({
      nom: $event.project_nom ? $event.project_nom : null,
      modele_id: $event.modele_id ? $event.modele_id : null,
      accessible_to_id: $event.accessible_to_id ? $event.accessible_to_id : null,
      statut_project_id: $event.statut_project_id ? $event.statut_project_id : null,
     
    });
  }


  submit() {
    switch (this.button) {
      case 'Créer':
        this.createProject();
        break;
      case 'Mettre à jour':
        this.updateProjectById();
        break;
      case 'Supprimer':
         this.deleteProjectById(); 
        break;
    }
  }

  exit(){
    this.NewFileSubmitted = false;
    this.projectOpen=false;
    this.projectForm.reset();
    this.closeModalProject.emit(this.projectOpen);
  }

}
