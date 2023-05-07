import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Reclamation } from 'src/app/models/Reclamation';
import { ReclamationService } from 'src/app/services/reclamation.service';

@Component({
  selector: 'app-liste-reclamation',
  templateUrl: './liste-reclamation.component.html',
  styleUrls: ['./liste-reclamation.component.css']
})
export class ListeReclamationComponent implements OnInit {

  reclamation:Reclamation[]
constructor(private rs:ReclamationService,private router:Router){}
  ngOnInit(): void {
this.rs.getReclamation().subscribe(
  (reclamation)=>{this.reclamation=reclamation}
)

  }


  deleteQuestion(id:number){
    this.rs.deleteReclamation(id).subscribe(() => {
      this.reclamation = this.reclamation.filter(p => p.id !== id);
      console.log(`Concours with ID ${id} deleted successfully`);
    },
    error => console.error(error)
  );
  }

}
