import { HttpErrorResponse } from '@angular/common/http';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { User } from 'src/app/models/User';
import { InscriptionServiceService } from 'src/app/services/inscription-service.service';

@Component({
  selector: 'app-profil-candidat',
  templateUrl: './profil-candidat.component.html',
  styleUrls: ['./profil-candidat.component.css']
})
export class ProfilCandidatComponent implements OnInit {
  u:User;
  editUser:User;
  @ViewChild('add', { static: false }) myModal1!: ElementRef;
  elm1!: HTMLElement;
    constructor( private is:InscriptionServiceService) { }

    ngOnInit(): void {
      this.u=JSON.parse(localStorage.getItem('user'));
    }

    onUpdateUser():void{
      this.is.modifier(this.u).subscribe(
        (response:User)=>{
          console.log(response);
          console.log(this.u)
          localStorage.setItem('user', JSON.stringify(response));
        },
        (error:HttpErrorResponse)=> {
          alert(error.message)
        }
      )
      console.log(this.u)

    }



   ngAfterViewInit(): void {
      this.elm1 = this.myModal1.nativeElement as HTMLElement;

    }

   close(): void {
      this.elm1.classList.remove('show');
      setTimeout(() => {
        this.elm1.style.width = '0';
      }, 75);
    }
    open(): void {
      this.elm1.classList.add('show');
      this.elm1.style.width = '100vw';

    }


  }

