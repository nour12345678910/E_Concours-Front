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

const routes: Routes =[

  {path:'admin', component:AdminComponent ,
  children:[

    {path:'etablissement', component:EtablissementComponent},
    {path:'etablissement/:id', component:ModifEtablissementComponent},
    {path:'MonProfile',component:ProfilAdminComponent},
    {path:'concours', component:MenuConcoursComponent,
  children:[
    {path:'ajouterconcours', component:AjouterConcoursComponent},
    {path:'listeconcours', component:ListeconcoursComponent},
    {path:'modifConcours/:id', component:ModifConcoursComponent},


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
  {path:'candidature', component:CandidatureComponent},

  {path:'',redirectTo :'home',pathMatch:'full'},

  ]






























@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
