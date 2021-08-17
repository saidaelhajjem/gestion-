import { Component, Input, OnInit, Output,EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ConditionsManagementService } from 'src/app/_services/conditions-management.service';

@Component({
  selector: 'app-modal-condition',
  templateUrl: './modal-condition.component.html',
  styleUrls: ['./modal-condition.component.scss']
})
export class ModalConditionComponent implements OnInit {
  @Input() modalCondition:boolean;
  @Output() closeModalCondition=new EventEmitter<boolean>();
  @Output() refreshCondition=new EventEmitter<boolean>();
  createConditionForm: FormGroup;
  conditionSubmitted:boolean = false;
  createConditionModal:boolean = false;
  refreshCon:boolean = false;
  constructor(
    private formBuilder: FormBuilder,
    private conditionsManagementService: ConditionsManagementService,
  ) { }

  ngOnInit(): void {
    
    this.initConditionForm();
  }

  get condition() {
    return this.createConditionForm.controls;
  }
  
  initConditionForm() {
    this.createConditionForm = this.formBuilder.group({
      titre: [null, Validators.required],
      reponse_obligatoire: [null, Validators.required],
      reponse_multiple: [null, Validators.required],
    });
  }

  conditionSubmit() {
    this.conditionSubmitted = true;
    if (this.createConditionForm.invalid) {
      return false;
    }
    const body = this.createConditionForm.value;
    this.conditionsManagementService.create(body).subscribe(
      (res: any) => {
        if (res.body.success) {
         
          this.createConditionForm.reset();
          this.conditionSubmitted = false;
          this.exit();
          //TODO appeler la liste des conditions.

        }
      },
      error => console.log(error));
  }


  cancel() {
    this.modalCondition = false;
    this.conditionSubmitted = false;
    this.createConditionForm.reset();
    this.closeModalCondition.emit(this.modalCondition);
  }

  
  exit() {
    this.modalCondition = false;
     this.refreshCon = true; 
    this.closeModalCondition.emit(this.modalCondition);
    this.refreshCondition.emit(this.refreshCon); 
  }

}
