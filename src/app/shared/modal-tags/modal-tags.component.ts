import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TagsManagementService } from 'src/app/_services/tags-management.service';

@Component({
  selector: 'app-modal-tags',
  templateUrl: './modal-tags.component.html',
  styleUrls: ['./modal-tags.component.scss']
})
export class ModalTagsComponent implements OnInit {
  @Input() modalTags:boolean;
  @Output() closeModalTags=new EventEmitter<boolean>();
  @Output() refreshTag=new EventEmitter<boolean>();
  tagsForm: FormGroup;
  conditionSubmitted:boolean = false;
  createConditionModal:boolean = false;
  refreshtTag:boolean = false;
  constructor(
    private formBuilder: FormBuilder,
    private tagsManagementService: TagsManagementService,
  ) { }

  ngOnInit(): void {
    
    this.inittagsForm();
  }

  get condition() {
    return this.tagsForm.controls;
  }
  
  inittagsForm() {
    this.tagsForm = this.formBuilder.group({
      libelle: [null, Validators.required],
    });
  }


  conditionSubmit() {
    this.conditionSubmitted = true;
    if (this.tagsForm.invalid) {
      return false;
    }
    const body = this.tagsForm.value;
    this.tagsManagementService.create(body).subscribe(
      (res: any) => {
        if (res.body.success) {
         
          this.tagsForm.reset();
          this.conditionSubmitted = false;
          this.exit();
          //TODO appeler la liste des conditions.

        }
      },
      error => console.log(error));
  }


  cancel() {
    this.modalTags = false;
    this.conditionSubmitted = false;
    this.tagsForm.reset();
    this.closeModalTags.emit(this.modalTags);
  }

  
  exit() {
    this.modalTags = false;
     this.refreshtTag = true; 
    this.closeModalTags.emit(this.modalTags);
    this.refreshTag.emit(this.refreshtTag); 
  }





}
