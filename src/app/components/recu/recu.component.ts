import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CandidatInfo } from 'src/app/models/CandidatInfo';
import { Concours } from 'src/app/models/ConcoursResponse';
import { Etablissement } from 'src/app/models/Etablissement';
import { User } from 'src/app/models/User';
import { CandidatServiceService } from 'src/app/services/candidat-service.service';
import { ConcoursService } from 'src/app/services/concours.service';
import { EtablissementService } from 'src/app/services/etablissement.service';
import{jsPDF}from 'jspdf'
import { HttpClient } from '@angular/common/http';



import html2canvas from 'html2canvas';

@Component({
  selector: 'app-recu',
  templateUrl: './recu.component.html',
  styleUrls: ['./recu.component.css']
})
export class RecuComponent {


concours:Concours
etablissement:Etablissement=new Etablissement()
user:User;
etablissemen:Etablissement[]=[]
listetab: Etablissement[];
candidats:CandidatInfo;
i:number ;
  constructor(private router:Router,private es:EtablissementService,private route: ActivatedRoute, private concoursService:ConcoursService,private candidatService:CandidatServiceService, private http: HttpClient) { }

  
  
  ngOnInit(): void {
    this.user=JSON.parse(localStorage.getItem('user'));

    const id = +this.route.snapshot.paramMap.get('id');



      this.candidatService.getCandidatInfoById(id).subscribe(candidats => {
        this.candidats = candidats;
        if (this.candidats && this.candidats.id) {
          console.log(this.candidats.id);
    
        }
        this.concoursService.getConcoursById(this.candidats.concoursId).subscribe(concours => {
          this.concours = concours;
          console.log(this.concours.id)});

      });


    this.es.getEtablissement().subscribe((listetab) => {
      this.listetab = listetab;
    })

    

  
  } 
  


  public download(): void {
    const content = document.getElementById('content');
    html2canvas(content).then(canvas => {
      const pdf = new jsPDF('p', 'mm', 'a4');
      pdf.addImage(canvas.toDataURL('image/png'), 'PNG', 0, 40, 200, 200);
      pdf.save('وصل.pdf');
    });
  }
  print() {
    window.print();
  }

}
