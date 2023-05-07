import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CandidatInfo } from 'src/app/models/CandidatInfo';
import { Concours } from 'src/app/models/Concours';
import { Diplome } from 'src/app/models/Diplome';
import { User } from 'src/app/models/User';
import { CandidatServiceService } from 'src/app/services/candidat-service.service';
import { ConcoursService } from 'src/app/services/concours.service';
import { DiplomeService } from 'src/app/services/diplome.service';
import { UserServiceService } from 'src/app/services/user-service.service';

@Component({
  selector: 'app-les-diplomes',
  templateUrl: './les-diplomes.component.html',
  styleUrls: ['./les-diplomes.component.css']
})
export class LesDiplomesComponent {
  diplomes:Diplome[]
  user:User
  concours:Concours
  candidats:CandidatInfo;
  
constructor(private candidatService:CandidatServiceService,private diplomeservice:DiplomeService,private router:Router ,private route:ActivatedRoute,private userService:UserServiceService,private concoursservice:ConcoursService){}
 
  ngOnInit(): void {
    // this.candidatService.getCandidatInfo()
    // .subscribe((candidatlist) => {
    //   this.candidatlist = candidatlist;});

      const id = +this.route.snapshot.paramMap.get('id');
      this.candidatService.getCandidatInfoById(id).subscribe(candidats => {
        this.candidats = candidats;
        if (this.candidats && this.candidats.id) {
          console.log(this.candidats.id);
        }
          // Move this inside the subscribe callback
          this.diplomeservice.getdiplomeByCandidat(this.candidats.id)
            .subscribe(diplomes => {
              this.diplomes = diplomes;
        // Process the list of candidats as needed
        this.userService.getUserById(this.candidats.userId).subscribe((user)=>{this.user=user})
        this.concoursservice.getConcoursById(candidats.concoursId).subscribe((concours)=>{this.concours=concours})
}
      )

})}
    
onAccepterClick(candidat: CandidatInfo) {
  this.candidatService.updateCandidatEtat(candidat.id, true)
    .subscribe(updatedCandidat => candidat.etat = updatedCandidat.etat);
    this.router.navigate(['/admin/concours/candidats/'+candidat.concoursId])
}

onRefuserClick(candidat: CandidatInfo) {
  this.candidatService.updateCandidatEtat(candidat.id, false)
    .subscribe(updatedCandidat => candidat.etat = updatedCandidat.etat);
    this.router.navigate(['/admin/concours/candidats/'+candidat.concoursId])
} 
    
    }