import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Concours } from 'src/app/models/Concours';
import { User } from 'src/app/models/User';
import { ConcoursService } from 'src/app/services/concours.service';
import { InscriptionServiceService } from 'src/app/services/inscription-service.service';

@Component({
  selector: 'app-liste-concours',
  templateUrl: './liste-concours.component.html',
  styleUrls: ['./liste-concours.component.css']
})
export class ListeConcoursComponent implements OnInit {

  loginStatus:boolean;
  user:User;
  concoursList: Concours[];


  constructor(
    private cs: ConcoursService,
    private router: Router,
    private is:InscriptionServiceService
  ) {}


  ngOnInit(): void {

    this.cs.getAllConcours()
    .subscribe((concoursList) => {
      this.concoursList = concoursList;
    });
     this.loginStatus=this.is.isLoggedIn;
  }

  submit(){
    if(this.loginStatus=true)
    {
      this.router.navigate(["/login"]);
      alert("Vous avez s'authentifié avec succées ")
    }else{
    this.router.navigate(["/inscription"]);}}

}
