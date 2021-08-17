import { BrowserModule } from '@angular/platform-browser';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { DocumentService } from './_services/documentservice';
import { ProjetsEnCoursService } from './_services/projets-en-cours-service';

import { ButtonModule } from 'primeng/button';
import { TabViewModule } from 'primeng/tabview';
import { PanelModule } from 'primeng/panel';
import { MenuModule } from 'primeng/menu';
import { TableModule } from 'primeng/table';
import { DialogModule } from 'primeng/dialog';
import { AccordionModule } from 'primeng/accordion';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { RadioButtonModule } from 'primeng/radiobutton';
import {TooltipModule} from 'primeng/tooltip';

import { NgxDropzoneModule } from 'ngx-dropzone';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './shared/header/header.component';
import { SidebarComponent } from './shared/sidebar/sidebar.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { GestionDesModelesComponent } from './gestion-des-modeles/gestion-des-modeles.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ElementsModeleComponent } from './elements-modele/elements-modele.component';
import { ContratEditComponent } from './contrat-edit/contrat-edit.component';
import { ProjetsEnCoursComponent } from './projets-en-cours/projets-en-cours.component';
import { AutocompleteModule } from 'ng2-input-autocomplete';
import { ImportModalComponent } from './shared/modals/import-modal/import-modal.component';
import { NouveauProjetComponent } from './nouveau-projet/nouveau-projet.component';
import { PreparationContratComponent } from './preparation-contrat/preparation-contrat.component';
import { JwtInterceptor } from './_helpers/jwt.interceptor';
import { FichesEmployesComponent } from './fiches-employes/fiches-employes.component';
import { FicheEmployeComponent } from './fiches-employes/fiche-employe/fiche-employe.component';
import { FicheEmployeurComponent } from './fiches-employes/fiche-employeur/fiche-employeur.component';
import { FicheEmployeurItemComponent } from './fiches-employes/fiche-employeur-item/fiche-employeur-item.component';
import { EtablissementComponent } from './fiches-employes/etablissement/etablissement.component';
import { FicheEmployeItemComponent } from './fiches-employes/fiche-employe-item/fiche-employe-item.component';
import { FicheProjetComponent } from './fiches-employes/fiche-projet/fiche-projet.component';
import { PaginatorModule } from 'primeng/paginator';
import { EmployeurEmployeComponent } from './shared/employeur-employe/employeur-employe.component';
import { FicheComponent } from './shared/fiche/fiche.component';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { ModalEmployeurComponent } from './shared/modal-employeur/modal-employeur.component';
import { QuillModule } from 'ngx-quill';
import { EtablissementItemComponent } from './fiches-employes/etablissement-item/etablissement-item.component';
import { ListProjetComponent } from './fiches-employes/list-projet/list-projet.component';
import { ModalReferenceComponent } from './shared/modal-reference/modal-reference.component';
import { ModalModeleComponent } from './shared/modal-modele/modal-modele.component';
import { ProjetComponent } from './fiches-employes/projet/projet.component';
import { ModalProjetComponent } from './shared/modal-projet/modal-projet.component';
import { ModalNoteComponent } from './shared/modal-note/modal-note.component';
import { ModalTagsComponent } from './shared/modal-tags/modal-tags.component';
import { ModalConditionComponent } from './shared/modal-condition/modal-condition.component';
import { ModalEtablissementComponent } from './shared/modal-etablissement/modal-etablissement.component';

@NgModule({
  /* schemas: [NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA], */
  declarations: [
    AppComponent,
    HeaderComponent,
    SidebarComponent,
    DashboardComponent,
    GestionDesModelesComponent,
    ElementsModeleComponent,
    ContratEditComponent,
    ProjetsEnCoursComponent,
    ImportModalComponent,
    NouveauProjetComponent,
    PreparationContratComponent,
    FicheEmployeurComponent,
    FicheEmployeComponent,
    FichesEmployesComponent,
    FicheEmployeurItemComponent,
    EtablissementComponent,
    FicheEmployeItemComponent,
    FicheProjetComponent,
    EmployeurEmployeComponent,
    FicheComponent,
    ModalEmployeurComponent,
    EtablissementItemComponent,
    ListProjetComponent,
    ModalReferenceComponent,
    ModalModeleComponent,
    ProjetComponent,
    ModalProjetComponent,
    ModalNoteComponent,
    ModalTagsComponent,
    ModalConditionComponent,
    ModalEtablissementComponent
  ],
  imports: [
    CommonModule,
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    ButtonModule,
    TabViewModule,
    PanelModule,
    MenuModule,
    TableModule,
    DialogModule,
    AccordionModule,
    HttpClientModule,
    NgxDropzoneModule,
    AutoCompleteModule,
    ReactiveFormsModule,
    Ng2SearchPipeModule,
    RadioButtonModule,
    AutocompleteModule.forRoot(),
    PaginatorModule,
    QuillModule.forRoot(),
    TooltipModule
  ],
  providers: [DocumentService, ProjetsEnCoursService, { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },],
  bootstrap: [AppComponent]
})
export class AppModule { }
