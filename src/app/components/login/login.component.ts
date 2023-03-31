import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { ERole, User } from 'src/app/models/User';
import { InscriptionServiceService } from 'src/app/services/inscription-service.service';
import { HttpParams } from '@angular/common/http';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit{

  cin: string;
  motdepasse: string;
  wrongCred: boolean = false;
  role:String;
typeUser=Object.values(ERole);
  constructor(private is: InscriptionServiceService, private router: Router) {}

  ngOnInit(): void {}

  login() {
    console.log(localStorage.getItem('user'));

    const params = new HttpParams()
      .set('cin', this.cin)
      .set('motdepasse', this.motdepasse);

    this.is.login(params).subscribe(
      (data) => {
        localStorage.setItem('user', JSON.stringify(data));
        sessionStorage.setItem("isconnecte", "true");
        console.log(data);
        this.role = data.role;
        if (this.role == "CANDIDAT") {
          this.router.navigate(["/home"]);
          alert("Vous avez s'authentifié avec succès");
        } else {
          this.router.navigate(["/admin"]);
        }
      },
      (err) => {
        if (err.error == 'Invalid CIN or password') this.wrongCred = true;
        console.log(err.error);
      }
    );
  }

}

