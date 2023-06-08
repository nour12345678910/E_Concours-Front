import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/User';
import { InscriptionServiceService } from 'src/app/services/inscription-service.service';
@Component({
  selector: 'app-profil-admin',
  templateUrl: './profil-admin.component.html',
  styleUrls: ['./profil-admin.component.css']
})
export class ProfilAdminComponent implements OnInit {
  user:User;
  actif=true;
  constructor(private incrireS:InscriptionServiceService) { }

  ngOnInit(): void {
    this.user=JSON.parse(localStorage.getItem('user'));
  }

  activer(){
    this.actif=false;
  }
  update(){
    this.incrireS.modifier(this.user).subscribe(
      (response:User)=>{
        console.log(response);
        console.log(this.user)
        localStorage.setItem('user', JSON.stringify(response));
        window.location.reload();

      },
      (error:HttpErrorResponse)=> {
        alert(error.message)
      }

    )
    this.actif=true;


  }
}
