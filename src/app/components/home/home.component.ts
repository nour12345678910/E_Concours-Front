import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Concours } from 'src/app/models/Concours';
import { User } from 'src/app/models/User';
import { ConcoursService } from 'src/app/services/concours.service';
import { InscriptionServiceService } from 'src/app/services/inscription-service.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  loginStatus:boolean;
  lesConcours: Concours[]=[];
  user:User;

  constructor(private cs:ConcoursService ,private  router:Router,private is:InscriptionServiceService) { }

  ngOnInit(): void {
    this.cs.getAllConcours().subscribe(response => this.lesConcours=response);
    this.loginStatus=this.is.isLoggedIn;
  }

  /*isLoggedIn() {
    if (localStorage.getItem('user')) {
      return true;
    }
    return false;
  }*/

  logOut(){
    this.router.navigate(["/profil"]);
    this.is.logoutUser();
    this.loginStatus=false;
  }


}

