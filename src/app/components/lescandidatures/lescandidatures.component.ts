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

@Component({
  selector: 'app-lescandidatures',
  templateUrl: './lescandidatures.component.html',
  styleUrls: ['./lescandidatures.component.css']
})
export class LescandidaturesComponent {
term:any
  candidatlist:CandidatInfo[]
  candidat:CandidatInfo
  concours:Concours
  candidats:CandidatInfo[]
users:User[]
u:User
@ViewChild('add', { static: true }) myModal1!: ElementRef;
  elm1!: HTMLElement;
  constructor(private candidatService:CandidatServiceService,private concoursService:ConcoursService,private route:ActivatedRoute,private userservice:UserServiceService,private http: HttpClient){}




  // onAccepterClick(candidat: CandidatInfo) {
  //   this.candidatService.updateCandidatEtat(candidat.id, true)
  //     .subscribe(updatedCandidat => candidat.etat = updatedCandidat.etat);
  //     // console.log(candidat.etat);
  // }

  // onRefuserClick(candidat: CandidatInfo) {
  //   this.candidatService.updateCandidatEtat(candidat.id, false)
  //     .subscribe(updatedCandidat => candidat.etat = updatedCandidat.etat);
  //     // console.log(candidat.etat);

  // }

  onAccepterClick(candidat: CandidatInfo) {
    this.candidatService.ReussiteCandidat(candidat.id, true)
      .subscribe(updatedCandidat => candidat.reussite = updatedCandidat.reussite);
      // console.log(candidat.etat);
  }

  onRefuserClick(candidat: CandidatInfo) {
    this.candidatService.ReussiteCandidat(candidat.id, false)
      .subscribe(updatedCandidat => candidat.reussite = updatedCandidat.reussite);
      // console.log(candidat.etat);

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
        // Process the list of candidats as needed

        this.userservice.getUsers().subscribe((users)=>{this.users=users})


      });


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

