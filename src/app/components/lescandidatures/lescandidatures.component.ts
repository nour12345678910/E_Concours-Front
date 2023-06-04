import { HttpClient } from '@angular/common/http';
import { Component, ElementRef, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable, map } from 'rxjs';
import { CandidatInfo } from 'src/app/models/CandidatInfo';
import { Concours } from 'src/app/models/Concours';
import { User } from 'src/app/models/User';
import { CandidatServiceService } from 'src/app/services/candidat-service.service';
import { ConcoursService } from 'src/app/services/concours.service';
import { UserServiceService } from 'src/app/services/user-service.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-lescandidatures',
  templateUrl: './lescandidatures.component.html',
  styleUrls: ['./lescandidatures.component.css']
})
export class LescandidaturesComponent {
term:any
numberOfCandidatsToShow: number;
  candidatlist:CandidatInfo[]
  candidat:CandidatInfo
  concours:Concours
  candidats:CandidatInfo[]
users:User[]
u:User
accept:boolean=false;
displayedCandidatEmails: string[] = [];
@ViewChild('add', { static: true }) myModal1!: ElementRef;
  elm1!: HTMLElement;
  constructor(private candidatService:CandidatServiceService,private concoursService:ConcoursService,private route:ActivatedRoute,private userservice:UserServiceService,private http: HttpClient){}









  updateNumberOfCandidats(): void {
    this.updateDisplayedCandidatEmails();
    const num = Number(this.numberOfCandidatsToShow);

    if (!isNaN(num) && num > 0) {
      this.numberOfCandidatsToShow = num;
    this.accept=true;
    }
    else{
      this.numberOfCandidatsToShow=this.candidats.length;
      this.accept=false;
    }
  }






  ngOnInit(): void {
     this.candidatService.getCandidatInfo()
    .subscribe((candidatlist) => {
     this.candidatlist = candidatlist;});

      const id = +this.route.snapshot.paramMap.get('id');
      this.concoursService.getConcoursById(id).subscribe(concours => {
        this.concours = concours;
        console.log(this.concours.id)});

   // Replace with the actual concoursId you want to fetch
    this.candidatService.getCandidatsByConcoursId(id)
      .subscribe(candidats => {
        this.candidats = candidats;
        this.candidats.sort((a, b) => b.score - a.score);


        this.updateDisplayedCandidatEmails(); // Update the displayed candidat emails


        this.userservice.getUsers().subscribe((users)=>{this.users=users})


      });

  }
  updateDisplayedCandidatEmails(): void {

    this.displayedCandidatEmails = [];


    for (let i = 0; i < this.numberOfCandidatsToShow && i < this.candidats.length; i++) {
      const candidat = this.candidats[i];
      const user = this.users.find((u) => u.id === candidat.userId);
      if (user) {
        this.displayedCandidatEmails.push(user.email);
      }
    }
    console.log(this.displayedCandidatEmails)
  }

  getEmailsOfDisplayedCandidats(): string[] {
    return this.displayedCandidatEmails;
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






sendEmail(){
  const id = +this.route.snapshot.paramMap.get('id');
  this.userservice.getUsers().subscribe(users => {
    this.users = users;
    this.candidatService.getCandidatsByConcoursId(id).subscribe(candidats => {
      this.candidats = candidats;

      this.candidatService.sendEmailsToCandidats(id, this.getEmailsOfDisplayedCandidats(), this.candidats, this.users).subscribe(
        () => {
          console.log('Emails sent successfully');
          Swal.fire({
            title: 'قبول المترشحين',
            text: 'تم ارسال النتيجة بنجاح',
            icon: 'success'
          });
          window.location.reload();
        },
        (error) => {
          console.error('Failed to send emails', error);
          // Handle error
        }
      );
    });
  });

 }

getClassForReussite(reussite: boolean | undefined | null): string {
  if (reussite === true) {
    return 'green-button';
  } else if (reussite === false) {
    return 'red-button';
  } else {
    return 'yellow-button';
  }
}









  }



