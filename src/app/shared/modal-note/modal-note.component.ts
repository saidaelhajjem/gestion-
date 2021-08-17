import { Component, Input, OnInit, Output ,EventEmitter} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NoteManagementService } from 'src/app/_services/note-management.service';

@Component({
  selector: 'app-modal-note',
  templateUrl: './modal-note.component.html',
  styleUrls: ['./modal-note.component.scss']
})
export class ModalNoteComponent implements OnInit {
@Input() openNote:boolean;
@Output() closeModalNote=new EventEmitter<any>();
createNoteForm:FormGroup;
createNoteSubmitted:boolean = false;
createNoteModal:boolean=false;
  constructor(
    private formBuilder:FormBuilder,
    private noteManagementService: NoteManagementService,
  ) { }

  ngOnInit(): void {
    this.initNoteForm();
  }

  get note() {
    return this.createNoteForm.controls;
  }


  initNoteForm() {
    this.createNoteForm = this.formBuilder.group({
      commentaire: [null, Validators.required],
      type_affichage: [null, Validators.required]
    });
  }



  createNoteSubmit() {
    this.createNoteSubmitted = true;
    if (this.createNoteForm.invalid) {
      return false;
    }
    const body = this.createNoteForm.value;
    this.noteManagementService.create(body).subscribe(
      (res: any) => {
        if (res.body.success) {
          this.openNote = !this.openNote;
          this.createNoteForm.reset();
          this.createNoteSubmitted = false;
          this.closeModalNote.emit(res.body.data);
          //TODO appeler la liste des notes.

        }
      },
      error => console.log(error));
  }


  updateNote(noteId: number) {
    this.noteManagementService.findById(noteId).subscribe(
      (res: any) => {
        if (res.body.success) {
          const body = res.data;
          this.noteManagementService.update(body, body).subscribe(
            (res: any) => {
              if (res.body.success) {
                this.createNoteForm.reset();

                //TODO appeler la liste des notes.

              }
            })
        }
      },
      error => console.log(error));
  }

  cancel() {
    this.openNote = false;
    this.createNoteSubmitted = false;
    this.createNoteForm.reset();
    this.closeModalNote.emit(this.openNote);
  }
}
