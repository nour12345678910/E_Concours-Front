import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './components/admin/admin.component';
import { AjouterConcoursComponent } from './components/ajouter-concours/ajouter-concours.component';
import { CandidatureComponent } from './components/candidature/candidature.component';
import { EtablissementComponent } from './components/etablissement/etablissement.component';
import { HomeComponent } from './components/home/home.component';
import { InscriptionComponent } from './components/inscription/inscription.component';
import { ListeConcoursComponent } from './components/liste-concours/liste-concours.component';
import { ListeconcoursComponent } from './components/listeconcours/listeconcours.component';
import { LoginComponent } from './components/login/login.component';
import { MenuConcoursComponent } from './components/menu-concours/menu-concours.component';
import { ModifEtablissementComponent } from './components/modif-etablissement/modif-etablissement.component';
import { ProfilAdminComponent } from './components/profil-admin/profil-admin.component';
import { ProfilCandidatComponent } from './components/profil-candidat/profil-candidat.component';
import { ModifConcoursComponent } from './components/modif-concours/modif-concours.component';
import { LescandidaturesComponent } from './components/lescandidatures/lescandidatures.component';
import { LesDiplomesComponent } from './components/les-diplomes/les-diplomes.component';
import { ListeCandidatsComponent } from './components/liste-candidats/liste-candidats.component';
import { ListeReclamationComponent } from './components/liste-reclamation/liste-reclamation.component';
import { ReponseContactComponent } from './components/reponse-contact/reponse-contact.component';
import { AgesStatComponent } from './components/ages-stat/ages-stat.component';
import { StatSexComponent } from './components/stat-sex/stat-sex.component';
import { ListeCandidatsReussisComponent } from './components/liste-candidats-reussis/liste-candidats-reussis.component';
import { RecuComponent } from './components/recu/recu.component';

const routes: Routes =[

  {path:'admin', component:AdminComponent ,
  children:[

    {path:'listeReclamation', component:ListeReclamationComponent},
    {path:'etablissement', component:EtablissementComponent},
    {path:'etablissement/:id', component:ModifEtablissementComponent},
    {path:'MonProfile',component:ProfilAdminComponent},
    { path: 'statAge', component:AgesStatComponent },
    { path: 'statSex', component:StatSexComponent },
    {path:'reussis', component:ListeCandidatsReussisComponent},



    {path:'concours', component:MenuConcoursComponent,

  children:[
    {path:'ajouterconcours', component:AjouterConcoursComponent},
    {path:'listeconcours', component:ListeconcoursComponent},
    {path:'listeCandidats', component:ListeCandidatsComponent},
    {path:'modifConcours/:id', component:ModifConcoursComponent},
    {path:'candidats/:id', component:LescandidaturesComponent},

  ]},
  // {path:'MonProfile',component:ProfileAdminComponent},

  ]},
  {path:'inscription', component:InscriptionComponent},
  {path:'home', component:HomeComponent},
  {path:'admin', component:AdminComponent} ,
  {path:'login', component:LoginComponent},
  {path:'admin', component:AdminComponent},
  {path:'lesConcours', component:ListeConcoursComponent},
  {path:'profil', component:ProfilCandidatComponent},
  {path:'candidature/:id', component:CandidatureComponent},
  { path: 'reponse/:id', component:ReponseContactComponent },

  {path:'profil/recu/:id', component:RecuComponent},
  {path:'diplomes/:id', component:LesDiplomesComponent},



  {path:'',redirectTo :'home',pathMatch:'full'},

  ]






























@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
