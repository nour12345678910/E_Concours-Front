import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/User';
import { InscriptionServiceService } from 'src/app/services/inscription-service.service';

@Component({
  selector: 'app-inscription',
  templateUrl: './inscription.component.html',
  styleUrls: ['./inscription.component.css']
})

export class InscriptionComponent implements OnInit{
  par: User = new User();
  exist: boolean = false;
  wrongCred: boolean = false;





  constructor(
    private is: InscriptionServiceService,
    private router: Router
  ) {}


  ngOnInit(): void {}

  enregistrer() {
    this.exist = false;

    this.is.inscrire(this.par).subscribe(
      (data) => {
        localStorage.setItem('user', JSON.stringify(data));
        this.router.navigate(['/home']);
        alert("votre compte a crée avec succées ")

      },

      (err) => {
        if (err.error == 'NAME_TAKEN') this.exist = true;
        console.log(err.error);
      }
    );
  }

  signup(f){
    if(f.invalid){

console.log("remplir tout les champs ")}

  }




}


