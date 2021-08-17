import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { GestionDesModelesComponent } from './gestion-des-modeles/gestion-des-modeles.component';
import { ElementsModeleComponent } from './elements-modele/elements-modele.component';
import { ContratEditComponent } from './contrat-edit/contrat-edit.component';
import { ProjetsEnCoursComponent } from './projets-en-cours/projets-en-cours.component';
import { NouveauProjetComponent } from './nouveau-projet/nouveau-projet.component';
import { PreparationContratComponent } from './preparation-contrat/preparation-contrat.component';
import { FichesEmployesComponent } from './fiches-employes/fiches-employes.component';
import { FicheEmployeurComponent } from './fiches-employes/fiche-employeur/fiche-employeur.component';
import { FicheEmployeComponent } from './fiches-employes/fiche-employe/fiche-employe.component';
import { FicheEmployeurItemComponent } from './fiches-employes/fiche-employeur-item/fiche-employeur-item.component';
import { EtablissementComponent } from './fiches-employes/etablissement/etablissement.component';
import { FicheEmployeItemComponent } from './fiches-employes/fiche-employe-item/fiche-employe-item.component';
import { FicheProjetComponent } from './fiches-employes/fiche-projet/fiche-projet.component';
import { EtablissementItemComponent } from './fiches-employes/etablissement-item/etablissement-item.component';
import { ListProjetComponent } from './fiches-employes/list-projet/list-projet.component';
import { ProjetComponent } from './fiches-employes/projet/projet.component';

const routes: Routes = [
  {
    path: '',
    component: DashboardComponent
  },
  {
    path: 'home',
    component: DashboardComponent
  },
  {
    path: 'gestion-des-modeles',
    component: GestionDesModelesComponent
  },
  {
    path: 'elements-modele',
    component: ElementsModeleComponent
  },
  {
    path: 'contrat-edit',
    component: ContratEditComponent
  },
  {
    path: 'projets-en-cours',
    component: ProjetsEnCoursComponent
  },
  {
    path: 'nouveau-projet',
    component: NouveauProjetComponent
  },
  {
    path: 'preparation-contrat',
    component: PreparationContratComponent
  },
  {
    path: 'fiches-employes',
    component: FichesEmployesComponent,
    children: [
      {
        path: '',
        component: FicheEmployeurComponent
      },
      {
        path: 'fiche-employeur',
        component: FicheEmployeurComponent
      },
      {
        path: 'fiche-employeur-item/:id',
        component: FicheEmployeurItemComponent
      },
      {
        path: 'list-employe',
        component: FicheEmployeComponent
      },
      {
        path: 'fiche-employe/:id',
        component: FicheEmployeItemComponent
      },
      {
        path: 'etablissement',
        component: EtablissementComponent
      },
      {
        path: 'etablissement-item/:id',
        component: EtablissementItemComponent
      },
      {
        path: 'projet',
        component: ProjetComponent
      },
      {
        path: 'fiche-projet',
        component: FicheProjetComponent
      },
      {
        path: 'list-projet',
        component: ListProjetComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
