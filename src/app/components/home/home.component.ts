import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Concours } from 'src/app/models/Concours';
import { Etablissement } from 'src/app/models/Etablissement';
import { User } from 'src/app/models/User';
import { ConcoursService } from 'src/app/services/concours.service';
import { EtablissementService } from 'src/app/services/etablissement.service';
import { InscriptionServiceService } from 'src/app/services/inscription-service.service';
import { PageScrollService } from 'ngx-page-scroll-core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  loginStatus:boolean;
  lesConcours: Concours[]=[];
  user:User;
  u:User;
  listetab: Etablissement[];

  constructor(private cs:ConcoursService ,private  router:Router,private is:InscriptionServiceService,private es:EtablissementService,private pageScrollService: PageScrollService) { }

  ngOnInit(): void {
    this.u=JSON.parse(localStorage.getItem('user'));
    this.cs.getAllConcours().subscribe(response => this.lesConcours=response);
    this.loginStatus=this.is.isLoggedInn();

    this.es.getEtablissement().subscribe((listetab) => {
      this.listetab = listetab;
    })
  }

  /*isLoggedIn() {
    if (localStorage.getItem('user')) {
      return true;
    }
    return false;
  }*/

  logOut(){

    this.is.logoutUser();
    this.loginStatus=false;
    this.router.navigate(["/home"]);
    window.location.reload();

  }
  scrollToSection(sectionId: string) {
    this.pageScrollService.scroll({
      document: document,
      scrollTarget: `#${sectionId}`,
      duration: 700
    });
  }

}





