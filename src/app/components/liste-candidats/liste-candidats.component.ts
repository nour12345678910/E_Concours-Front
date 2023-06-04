import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CandidatInfo } from 'src/app/models/CandidatInfo';
import { Concours } from 'src/app/models/Concours';
import { User } from 'src/app/models/User';
import { CandidatServiceService } from 'src/app/services/candidat-service.service';
import { ConcoursService } from 'src/app/services/concours.service';
import { UserServiceService } from 'src/app/services/user-service.service';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-liste-candidats',
  templateUrl: './liste-candidats.component.html',
  styleUrls: ['./liste-candidats.component.css']
})
export class ListeCandidatsComponent {

  candidatlist:CandidatInfo[]
  term:any
  concours:Concours[]=[]
  candidats:CandidatInfo[]
  users:User[]
  public accepte:boolean=true
   refuse=true
  constructor(private candidatService:CandidatServiceService,private concoursService:ConcoursService,private route:ActivatedRoute,private userservice:UserServiceService){}

  ngOnInit(): void {
    this.candidatService.getCandidatInfo()
    .subscribe((candidatlist) => {
      this.candidatlist = candidatlist;});


    this.candidatService.getCandidatInfo()
      .subscribe(candidats => {
        this.candidats = candidats;
        // Process the list of candidats as needed

        this.userservice.getUsers().subscribe((users)=>{this.users=users})
      });
      this.concoursService.getAllConcours().subscribe(concours=>{this.concours=concours})

  }

  onAccepterClick(candidat: CandidatInfo) {
    this.candidatService.ReussiteCandidat(candidat.id, true)
      .subscribe(updatedCandidat => candidat.reussite = updatedCandidat.reussite);
     this.accepte =false

     Swal.fire({
      title: 'نجاح المترشح',
      text: 'تم ارسال النتيجة بنجاح',
      icon: 'success'
    })
    window.location.reload();
  }

  onRefuserClick(candidat: CandidatInfo) {
    this.candidatService.ReussiteCandidat(candidat.id, false)
      .subscribe(updatedCandidat => candidat.reussite = updatedCandidat.reussite);
    this.refuse=false
    Swal.fire({
      title: 'رسوب المترشح',
      text: 'تم ارسال النتيجة ',
      icon: 'success'})
     window.location.reload();

  }

  }

