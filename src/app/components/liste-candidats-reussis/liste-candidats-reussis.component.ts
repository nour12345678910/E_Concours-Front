import { Component, OnInit } from '@angular/core';
import { CandidatInfo } from 'src/app/models/CandidatInfo';
import { User } from 'src/app/models/User';
import { CandidatServiceService } from 'src/app/services/candidat-service.service';
import { UserServiceService } from 'src/app/services/user-service.service';

@Component({
  selector: 'app-liste-candidats-reussis',
  templateUrl: './liste-candidats-reussis.component.html',
  styleUrls: ['./liste-candidats-reussis.component.css']
})
export class ListeCandidatsReussisComponent  implements OnInit {

  successfulCandidates: CandidatInfo[] = [];
  selectedConcoursId: number;
  users:User[]

  constructor(private candidatService: CandidatServiceService,
    private us:UserServiceService
    ) { }

  ngOnInit() {
    this.candidatService.getSuccessfulCandidat()
      .subscribe(candidates => {
        this.successfulCandidates = candidates;
        this.us.getUsers().subscribe((users)=>{this.users=users})

      });
  }



}
