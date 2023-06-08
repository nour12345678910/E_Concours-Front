import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Concours } from 'src/app/models/Concours';
import { User } from 'src/app/models/User';
import { ConcoursService } from 'src/app/services/concours.service';
import { InscriptionServiceService } from 'src/app/services/inscription-service.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {
  loginStatus:boolean;
  lesConcours: Concours[]=[];
  user:User;

  constructor(private cs:ConcoursService ,private  router:Router,private is:InscriptionServiceService) { }

  ngOnInit(): void {
    this.loginStatus=this.is.isLoggedIn;
  }



  logOut(){
    this.router.navigate(["/home"]);
    this.is.logoutUser();
    this.loginStatus=false;
  }


}

