import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MenuItem } from 'primeng/api';
import { SelectItemGroup } from 'primeng/api';
import { FilterService } from 'primeng/api';
import { ConditionsManagementService } from '../_services/conditions-management.service';
import { NoteManagementService } from '../_services/note-management.service';
import { AssociateUnidentifiedServise } from './../_services/associateUnidentifiedServise';
import { DomSanitizer } from '@angular/platform-browser'
import {$} from "protractor";
import {Delta, DeltaOperation} from "quill";
import Quill from 'quill';
import { ReferencesManagementService } from '../_services/references-management.service';
import { ModelsManagementService } from '../_services/models-management.service';
import { ActivatedRoute } from '@angular/router';
import {DocumentsManagementService} from "../_services/documents-management.service";
import {Document} from '../_models/document';
import {Reference} from "../_models/reference";

const Parchment = Quill.import('parchment')

@Component({
  selector: 'app-contrat-edit',
  templateUrl: './contrat-edit.component.html',
  styleUrls: ['./contrat-edit.component.scss'],
  providers: [AssociateUnidentifiedServise, FilterService]
})
export class ContratEditComponent implements OnInit {
  tooltipStatus: boolean = false;
  items: MenuItem[];
  groupedCities: SelectItemGroup[];
  filteredGroups: any[];
  createNewFileModal: boolean = false;
  selectAssociateUnidentified: any;
  associateUnidentified: any;
  detectionAutomatiqueStatus: boolean = true;
  panelTagDetailStatus: boolean = false;
  associateUnidentifiedTagsModal: boolean = false;
  addReferencesModal: boolean = false;
  createConditionModal: boolean = false;
  createNoteModal: boolean = false;
  EditionFileModal: boolean = false;
  addReferenceBlcStatus: boolean = false;
  addConditionBlcStatus: boolean = false;
  createConditionForm: FormGroup;
  conditionSubmitted: boolean = false;
  createNoteSubmitted: boolean = false;
  showPanelAutomaticDetection: boolean = true;
  referenceBalises:{in:string,out:string} = {in : '{',out:'}'};
  referencesFound:Reference[] = [];
  referencesUnknowns:string[] = [];
  documentId:number=2;
  selected;
  titreRef;
  refForm:FormGroup;
  allReferences:Reference[] = [{
    id : 1,
    titre : 'dénomination sociale'
  },{
    id : 1,
    titre : 'siren'
  },{
    id : 2,
    titre : 'nom'
  },{
    id : 3,
    titre : 'prénom'
  },{
    id : 4,
    titre : 'ville'
  },{
    id : 5,
    titre : 'pays'
  },{
    id : 6,
    titre : 'adresse'
  },{
    id : 7,
    titre : 'date naissance'
  }];
  quillEditor: any;
  quillConfig = {
    toolbar: [
      [{'header': [1, 2, 3, 4, 5, 6, false]}],
      ['bold', 'italic'],        // toggled buttons
      [{'align': []}],
      [{'indent': '-1'}, {'indent': '+1'}],          // outdent/indent
      ['blockquote'],
      [{'list': 'ordered'}, {'list': 'bullet'}],
      ['link'],              // link
      [{'size': ['small', false, 'large', 'huge']}],  // custom dropdown
      [{'color': []}, {'background': []}],          // dropdown with defaults from theme
      [{'font': []}],
      ['image']                         // link and image, video
    ]
  };
  editorModel: string;
  public panelReferenceDetails: Reference;
  public referenceDetailsOccurrences: {position : number,text:string}[] = [];
  id;
  currentDocument: Document;

  constructor(
    private associateUnidentifiedServise: AssociateUnidentifiedServise,
    private filterService: FilterService,
    private formBuilder: FormBuilder,
    private conditionsManagementService: ConditionsManagementService,
    private sanitizer: DomSanitizer, private fb: FormBuilder,
    private referencesManagementService: ReferencesManagementService,
    private modelsManagementService: ModelsManagementService,
    private documentsManagementService: DocumentsManagementService,
    private route: ActivatedRoute
  ) { }
  ngOnInit(): void {
    this.id = this.route.snapshot.queryParams.id;
    this.contratEditSidebar();
    this.initConditionForm();
    this.getAllReference();
    this.initForm();
    this.getContenuDocument();
    this.associateUnidentifiedServise.getAssociateUnidentified().then(associateUnidentified => {
      this.associateUnidentified = associateUnidentified;
    });

    this.items = [
      {
        label: 'Mode lecture',
      },
      {
        label: 'Mode édition',
      },
      {
        label: 'Mode suggestion',
      }
    ];

    this.initQuill();
  }
  private initQuill(): void {
    const SizeClass = new Parchment.Attributor.Class('size', 'font', { // Telling Quill to prepend class with `font` iso `ql-size`,
      scope: Parchment.Scope.INLINE,
      whitelist: ['xsmall', 'small', 'medium', 'large', 'xlarge']
    });


    /*var refHighlighted = new Parchment.Attributor.Class('ref-highlighted', 'style' , {
      scope: Parchment.Scope.INLINE,
      whitelist: ['orange', 'red', 'blue' , 'green']
    });
    Quill.register(refHighlighted);*/


    let Embed = Quill.import('blots/embed');
    let Inline = Quill.import('blots/inline');
    let BackgroundClass = Quill.import('attributors/class/background');
    let ColorClass = Quill.import('attributors/class/color');
    let SizeStyle = Quill.import('attributors/style/size');

    Quill.register(BackgroundClass, true);
    Quill.register(ColorClass, true);
    Quill.register(SizeStyle, true);
    Quill.register(SizeClass, true, true);

    class QuillBlotCustom extends Embed {
      static blotName: string = 'cmd-custom';
      static className: string = 'quill-cmd-custom';
      static tagName: string = 'span';

      static create(value: { cmd: any }) {
        let node = super.create(value);
        const content = value.cmd.content ? value.cmd.content : '';
        node.innerHTML = `<span>${value.cmd.prefix}${value.cmd.title}: <span contenteditable=true>${content}</span>${value.cmd.postfix}</span>`;
        node.style.color = value.cmd.color;
        node.style.backgroundColor = value.cmd.bgColor;
        node.setAttribute('valueCmd', JSON.stringify(value.cmd));
        node.addEventListener('keydown', function(e) {
          // handling Enter key
          if (e.keyCode === 13) {
            e.preventDefault();
            // HOW TO ACCESS QUILL INSTANCE FROM HERE?

          }
        });
        setTimeout(() => {

          return node;
        });
      }
      static value(node) {
          const val = {
            cmd: JSON.parse(node.getAttribute('valueCmd')),
            //text: node.firstElementChild.firstElementChild.firstElementChild.innerText,
            node: node
          };
          val.cmd.content = node.firstElementChild.firstElementChild.firstElementChild.innerText

          return val;
        }

        update(mutations: MutationRecord[], context: {[key: string]: any}) {

        }
    }
    class refBloc extends Embed {

      static create(value: { titre: any,id:any }){
          let node = super.create();
          node.contentEditable = 'true';
          node.setAttribute('class','ql-ref-bloc references-item mr-1');
          node.setAttribute('data-uid', value.id);
          this._addFnButton(node,value.titre);
          return node;
        }
      static _addFnButton(node,titre) {
          const span = document.createElement('span');
          span.className = 'references-item-btn';
          span.textContent = titre;
          node.appendChild(span);
          const a = document.createElement('a');
          a.className = 'references-item_link';
          node.appendChild(a);
        }
    }
    refBloc.blotName = 'refBloc';
    refBloc.tagName = 'div';
    Quill.register('formats/refBloc', refBloc);


    class noteBloc extends Embed {

      static create(value: { commentaire: any,id:any }){
        let node = super.create();
        node.contentEditable = 'true';
        node.setAttribute('class','ql-ref-bloc references-item mr-1');
        node.setAttribute('data-uid', value.id);
        this._addFnButton(node,value.commentaire);
        return node;
      }
      static _addFnButton(node,titre) {
        const span = document.createElement('span');
        span.className = 'references-item-btn';
        span.textContent = titre;
        node.appendChild(span);
        const a = document.createElement('a');
        a.className = 'references-item_link';
        node.appendChild(a);
      }
    }

    refBloc.blotName = 'noteBloc';
    refBloc.tagName = 'div';
    Quill.register('formats/noteBloc', noteBloc);
  }


  initConditionForm() {
    this.createConditionForm = this.formBuilder.group({
      titre: [null, Validators.required],
      reponse_obligatoire: [null, Validators.required],
      reponse_multiple: [null, Validators.required],
    });
  }

  get condition() {
    return this.createConditionForm.controls;
  }

  contratEditSidebar(id?:number): void {
    this.detectionAutomatiqueStatus = !this.detectionAutomatiqueStatus;
    this.addReferenceBlcStatus = false;
    this.addConditionBlcStatus = false;
  }

  panelTagDetailStatusFct(reference:Reference): void {
    this.panelReferenceDetails = reference;
    this.referenceDetailsOccurrences = [];
    let delta =  this.quillEditor.editor?.delta?.ops;
    for(const [index,item] of delta.entries()) {
      if(~item.insert.indexOf(reference.titre)){
        this.referenceDetailsOccurrences.push({
          position : index ,
          text :  delta[index-1]?.insert+item.insert+delta[index+1]?.insert
        });
      }
    }
    this.panelTagDetailStatus = !this.panelTagDetailStatus;
  }

  panelTagDetailRemoveFct(): void {
    this.panelReferenceDetails = null;
    this.panelTagDetailStatus = !this.panelTagDetailStatus;
  }

  associateUnidentifiedTagsModalFct(): void {
    this.associateUnidentifiedTagsModal = true;
  }

  tooltipStatusFct(): void {
    this.tooltipStatus = !this.tooltipStatus;
  }

  addReferencesModalFct(): void {
    this.addReferencesModal = true;
  }

  createConditionModalFct(): void {
    this.createConditionModal = true;
  }

  createNoteModalFct(): void {
    this.createNoteModal = true;
  }

  createNewFileModalFct(): void {
    this.createNewFileModal = true;
  }
  closeModal($event) {
    this.createNewFileModal = $event;
  }

  EditionFileModalFct(): void {
    this.EditionFileModal = true;
  }

  addReferenceBlcFct(): void {
    this.addReferenceBlcStatus = !this.addReferenceBlcStatus;
    this.detectionAutomatiqueStatus = false;
    this.addConditionBlcStatus = false;
  }
  addReferenceBlcDeleteFct(): void {
    this.addReferenceBlcStatus = false;
  }

  automaticDetectionFct(): void {
    this.detectionAutomatiqueStatus = false;
  }

  addConditionBlcFct(): void {
    this.addConditionBlcStatus = !this.addConditionBlcStatus;
    this.detectionAutomatiqueStatus = false;
    this.addReferenceBlcStatus = false;
  }
  addConditionBlcDeleteFct(): void {
    this.addConditionBlcStatus = false;
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
          this.createConditionModal = !this.createConditionModal;
          this.createConditionForm.reset();
          this.conditionSubmitted = false;
          //TODO appeler la liste des conditions.

        }
      },
      error => console.log(error));
  }

  initForm(){
    this.refForm=this.fb.group({
      titre:[null],
      reference_id:[null]
    })
  }

  byPassHTML(html: string) {
    return this.sanitizer.bypassSecurityTrustHtml(html)
  }

  editorCreated(quill) {
    var newParent = document.getElementsByClassName('editor-menu-item')[0];
    var oldParent = document.getElementsByClassName('ql-toolbar')[0];
    newParent.appendChild(oldParent);

    this.quillEditor = quill;
    //extract reference from document

    let tmpList = this.editorModel?.match(/\{(.*?)\}/g);
    this.detectReferences();
    //this.quillEditor.root.innerHTML = this.editorModel;
  }

  replaceAllReferences() {
    this.quillEditor.getText().replace(new RegExp('ql-bg-orange', 'g'),'');
     this.referencesFound.map((ref)=>{
       let indexes = [], i = -1;
       while ((i = this.quillEditor.getText().indexOf(ref.titre, i+1)) != -1){
         indexes.push(i);
         this.quillEditor.removeFormat(i-5, ref.titre.length+5);
         //this.quillEditor.deleteText(i, ref.titre.length);
         this.quillEditor.insertEmbed(i,'refBloc',{titre: ref.titre,id : ref.id});
       }
     });
    this.referencesFound=[];
    //Quill.formatText(Quill.getSelection(),'refBloc',true);
  }
  detectReferences(reference?) {
    let tmpList;

    if(!reference) {
      tmpList = this.editorModel?.match(/\{(.*?)\}/g);
    }else{
      tmpList = this.editorModel?.match(new RegExp(reference, 'g'));
    }
    tmpList?.forEach((item)=>{
      item = item.substring(1, item.length-1);
      item = this.removeTags(item);
      let found = false;
      this.editorModel = this.editorModel?.replace(new RegExp(item, 'g'),'<span class="ql-bg-orange">'+item+'</span>')
      this.allReferences.forEach((reference:Reference)=>{
        if(item === reference.titre) {
          found = true;
          this.referencesFound.push(reference);
        }
      });
      if(!found){
        this.referencesUnknowns.push(item);
      }
    });
    this.referencesFound = [...new Set(this.referencesFound)];
    this.referencesUnknowns = [...new Set(this.referencesUnknowns)];

  }

  closeRef($event){
    this.addReferencesModal = $event;
  }
  actualiseRef($event){
    this.getAllReference();
    this.detectReferences($event);
  }

  filterUser(event){
    let filtered: any[] = [];
    let query = event.query;
    for (let i = 0; i < this.allReferences.length; i++) {
      let user = this.allReferences[i];
      if (user.titre.toLowerCase().indexOf(query.toLowerCase()) == 0 ) {
        filtered.push(user);
      }
    }
    this.allReferences = filtered;


  }

  getAllReference() {
    this.referencesManagementService.getAllReference().subscribe(
      (res: any) => {
        if (res.body.success) {
          this.allReferences = res.body.data;

        }

      },
      error => console.log(error));
  }

CreationBaliseNonIdentifie(){
    const body={
      titre:document.getElementById('ref').innerHTML.trim(),
      reference_id:this.selected.id
    }
    const data=[];
    data.push(body)
    this.documentsManagementService.CreationBaliseNonIdentifie(this.documentId,data).subscribe(
      (res: any) => {
        if (res.body.success) {
          this.allReferences = res.body.data
        }
      },
      error => console.log(error));


  }

  removeOneBlot(index, length, blot)
  {
    // Get all the blots in the text selection
    let formats = this.quillEditor.getFormat(index, length);
    // Delete the blot format you are targeting
    delete formats[blot.statics.blotName];
    // Remove all formats
    this.quillEditor.removeFormat(index, length);
    // Add back the remaining formats
    for (const [blotName, format] of Object.entries(formats)) {
      this.quillEditor.formatText(index, length, blotName, format);
    }
  }

  newReference() {
    this.addReferencesModal = true;
  }

  getContenuDocument() {
    const documentId = this.id;
    this.documentsManagementService.findById(documentId).subscribe(res => {

        if (res.body.success) {
          this.currentDocument = res.body.data;
          this.editorModel = res.body.data.contenu;
          this.editorCreated(this.quillEditor);
        }

      },
      err => console.log(err))
  }

  removeTags(str) {
    if ((str === null) || (str === ''))
      return false;
    else
      str = str.toString();
    return str.replace(/(<([^>]+)>)/ig, '');
  }
  onCloseModalNote($event) {
    this.createNoteModal = false;
    this.addNoteToEditor($event);
    console.log($event);
  }

  private addNoteToEditor($event: any) {
    const selection = this.quillEditor.getSelection(); // get position of cursor (index of selection)
  }
}
