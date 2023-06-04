import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Concours } from 'src/app/models/Concours';
import { User } from 'src/app/models/User';
import { ConcoursService } from 'src/app/services/concours.service';
import { InscriptionServiceService } from 'src/app/services/inscription-service.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-liste-concours',
  templateUrl: './liste-concours.component.html',
  styleUrls: ['./liste-concours.component.css']
})
export class ListeConcoursComponent implements OnInit {
  term:any
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
     this.loginStatus=this.is.isLoggedInn();
  }

  submit(){
    if(this.loginStatus=true)
    {
      this.router.navigate(["/login"]);
      alert("Vous avez s'authentifié avec succées ")
    }else{
    this.router.navigate(["/inscription"]);}}

    @ViewChild('add', { static: false }) myModal1!: ElementRef;
    elm1!: HTMLElement;
    ngAfterViewInit(): void {
      this.elm1 = this.myModal1.nativeElement as HTMLElement;

    }
    open(): void {
      this.elm1.classList.add('show');
      this.elm1.style.width = '100vw';

    }

    openDialog(description: string) {
      Swal.fire({
        title: 'مزيد من التفاصيل',
        html: `<div style="font-size: 35px;">${description}</div>`,
        confirmButtonText: 'حسنًا',
        customClass: {
          container: 'custom-swal-container',
        },
      });
    }



   close(): void {
      this.elm1.classList.remove('show');
      setTimeout(() => {
        this.elm1.style.width = '0';
      }, 75);
    }


}

