import { HttpErrorResponse } from '@angular/common/http';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { CandidatInfo } from 'src/app/models/CandidatInfo';
import { Concours } from 'src/app/models/ConcoursResponse';
import { User } from 'src/app/models/User';
import { CandidatServiceService } from 'src/app/services/candidat-service.service';
import { ConcoursService } from 'src/app/services/concours.service';
import { InscriptionServiceService } from 'src/app/services/inscription-service.service';
import { UserServiceService } from 'src/app/services/user-service.service';

@Component({
  selector: 'app-profil-candidat',
  templateUrl: './profil-candidat.component.html',
  styleUrls: ['./profil-candidat.component.css']
})
export class ProfilCandidatComponent implements OnInit {
  u:User;
  etat:boolean
  listconcours:Concours[]=[];
  editUser:User;
  candidatlist:CandidatInfo[]

  @ViewChild('add', { static: false }) myModal1!: ElementRef;
  elm1!: HTMLElement;
  @ViewChild('recu', { static: false }) myModal2!: ElementRef;
  elm2!: HTMLElement;
    constructor( private is:InscriptionServiceService,private us:UserServiceService, private candidatService:CandidatServiceService,private concoursService:ConcoursService, private router:Router) { }




    ngOnInit(): void {
      this.u=JSON.parse(localStorage.getItem('user'));

    this.candidatService.getCandidatInfo()
    .subscribe((candidatlist) => {
     this.candidatlist = candidatlist;});

      this.concoursService.getAllConcours().subscribe((concours)=>{
      this.listconcours=concours ;});

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
      this.elm2 = this.myModal2.nativeElement as HTMLElement;

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
    openRecu(): void {
      this.elm2.classList.add('show');
      this.elm2.style.width = '100vw';

    }
    closeRecu(): void {
      this.elm2.classList.remove('show');
      setTimeout(() => {
        this.elm2.style.width = '0';
      }, 75);
    }
    logOut(){

      this.is.logoutUser();

      this.router.navigate(['/home']);
      // window.location.reload();
    }


  }

