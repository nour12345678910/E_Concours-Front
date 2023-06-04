import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgxPageScrollModule } from 'ngx-page-scroll';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LoginComponent } from './components/login/login.component';
import { InscriptionComponent } from './components/inscription/inscription.component';
import { HomeComponent } from './components/home/home.component';
import { LoginPageComponent } from './components/login-page/login-page.component';
import { AdminComponent } from './components/admin/admin.component';
import { AjouterConcoursComponent } from './components/ajouter-concours/ajouter-concours.component';
import { MenuConcoursComponent } from './components/menu-concours/menu-concours.component';
import { ListeconcoursComponent } from './components/listeconcours/listeconcours.component';
import { ListeConcoursComponent } from './components/liste-concours/liste-concours.component';
import { ProfilCandidatComponent } from './components/profil-candidat/profil-candidat.component';
import { CandidatureComponent } from './components/candidature/candidature.component';
import { EtablissementComponent } from './components/etablissement/etablissement.component';
import { ProfilAdminComponent } from './components/profil-admin/profil-admin.component';
import { ModifEtablissementComponent } from './components/modif-etablissement/modif-etablissement.component';
import { MenConcoursComponent } from './components/men-concours/men-concours.component';
import { ModifConcoursComponent } from './components/modif-concours/modif-concours.component';
import { CommonModule } from '@angular/common';
import { LescandidaturesComponent } from './components/lescandidatures/lescandidatures.component';
import { LesDiplomesComponent } from './components/les-diplomes/les-diplomes.component';
import { ListeCandidatsComponent } from './components/liste-candidats/liste-candidats.component';
import { FilterPipe } from './pipes/filter.pipe';
import { FilterCandidatPipe } from './pipes/filter-candidat.pipe';
import { FilterScorePipe } from './pipes/filter-score.pipe';
import { RecuComponent } from './components/recu/recu.component';
import { AgesStatComponent } from './components/ages-stat/ages-stat.component';
import { StatSexComponent } from './components/stat-sex/stat-sex.component';
import { ListeCandidatsReussisComponent } from './components/liste-candidats-reussis/liste-candidats-reussis.component';
import { ReponseContactComponent } from './components/reponse-contact/reponse-contact.component';
import { ListeReclamationComponent } from './components/liste-reclamation/liste-reclamation.component';
import { ReclamationComponent } from './components/reclamation/reclamation.component';
import { DiplomeFilterPipe } from './pipes/diplome-filter.pipe';
import { ResultsComponent } from './components/results/results.component';
import { HistoriqueComponent } from './components/historique/historique.component';
import { HistoriqueReclamationComponent } from './components/historique-reclamation/historique-reclamation.component';
import { DateFilterPipe } from './pipes/date-filter.pipe';



@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    InscriptionComponent,
    HomeComponent,
    LoginPageComponent,
    AdminComponent,
    AjouterConcoursComponent,
    MenuConcoursComponent,
    ListeconcoursComponent,
    ListeConcoursComponent,
    ProfilCandidatComponent,
    CandidatureComponent,
    EtablissementComponent,
    ProfilAdminComponent,
    ModifEtablissementComponent,
    MenConcoursComponent,
    ModifConcoursComponent,
    LescandidaturesComponent,
    LesDiplomesComponent,
    ListeCandidatsComponent,
    FilterPipe,
    FilterCandidatPipe,
    FilterScorePipe,
    RecuComponent,
    AgesStatComponent,
    StatSexComponent,
    ListeCandidatsReussisComponent,
    ReponseContactComponent,
    ListeReclamationComponent,
    ReclamationComponent,
    DiplomeFilterPipe,
    ResultsComponent,
    HistoriqueComponent,
    HistoriqueReclamationComponent,
    DateFilterPipe,



  ],
  imports: [
    CommonModule,
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    NgbModule,
    HttpClientModule,
    NgxPageScrollModule


  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
