import { Input, Output, EventEmitter } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { EmployersAndEmployeesManagementService } from 'src/app/_services/employers-and-employees-management.service';

@Component({
  selector: 'app-employeur-employe',
  templateUrl: './employeur-employe.component.html',
  styleUrls: ['./employeur-employe.component.scss']
})
export class EmployeurEmployeComponent implements OnInit {
  @Input() childEmployeur;
  @Input() allTitle;
  @Output() modalOpned = new EventEmitter<boolean>();
  @Output() OpnedModal = new EventEmitter<boolean>();
  @Output() employee = new EventEmitter<any>();
  @Output() employeur = new EventEmitter<any>();
  searchText;

  createNewFileModal: boolean = false;
  createEmployeurFileModal: boolean = false;

  constructor(private employersAndEmployeesManagementService: EmployersAndEmployeesManagementService) { }

  ngOnInit(): void {
  }

  createNewFileModalFct(): void {
    if (this.allTitle == "employeur") {
      this.createEmployeurFileModal = true;
      this.OpnedModal.emit(this.createEmployeurFileModal);
    }
    else {
      this.createNewFileModal = true;
      this.modalOpned.emit(this.createNewFileModal);
    }

  }


  findByIdEmployee(id) {
    this.employersAndEmployeesManagementService.findByIdEmployee(id).subscribe(
      (res: any) => {
        if (res.body.success) {
          this.employee.emit(res.body.data);
        }
      },
      error => console.log(error));
  }



  findByIdEmployer(id) {
    this.employersAndEmployeesManagementService.findByIdEmployer(id).subscribe(
      (res: any) => {
        if (res.body.success) {
          this.employeur.emit(res.body.data);

        }
      },
      error => console.log(error));
  }

}
