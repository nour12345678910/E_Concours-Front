import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CandidatInfo } from 'src/app/models/CandidatInfo';
import { Concours } from 'src/app/models/Concours';
import { User } from 'src/app/models/User';
import { CandidatServiceService } from 'src/app/services/candidat-service.service';
import { ConcoursService } from 'src/app/services/concours.service';
import { UserServiceService } from 'src/app/services/user-service.service';
@Component({
  selector: 'app-liste-candidats',
  templateUrl: './liste-candidats.component.html',
  styleUrls: ['./liste-candidats.component.css']
})
export class ListeCandidatsComponent {

  candidatlist:CandidatInfo[]
term:any
  concours:Concours
  candidats:CandidatInfo[]
users:User[]
  constructor(private candidatService:CandidatServiceService,private concoursService:ConcoursService,private route:ActivatedRoute,private userservice:UserServiceService){}

  ngOnInit(): void {
    this.candidatService.getCandidatInfo()
    .subscribe((candidatlist) => {
      this.candidatlist = candidatlist;});

      // const id = +this.route.snapshot.paramMap.get('id');
      // this.concoursService.getConcoursById(id).subscribe(concours => {
      //   this.concours = concours;
      //   console.log(this.concours.id)});

   // Replace with the actual concoursId you want to fetch
    this.candidatService.getCandidatInfo()
      .subscribe(candidats => {
        this.candidats = candidats;
        // Process the list of candidats as needed

        this.userservice.getUsers().subscribe((users)=>{this.users=users})


      });
  }

  }

