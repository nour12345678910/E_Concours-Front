import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { CandidatInfo } from 'src/app/models/CandidatInfo';
import { User } from 'src/app/models/User';
import { CandidatServiceService } from 'src/app/services/candidat-service.service';
import { Diplome } from 'src/app/models/Diplome';

@Component({
  selector: 'app-candidature',
  templateUrl: './candidature.component.html',
  styleUrls: ['./candidature.component.css']
})
export class CandidatureComponent implements OnInit  {
  candidat: CandidatInfo = new CandidatInfo();
  candidatureForm: FormGroup;
  lesCandidats:CandidatInfo[]=[]
  user:User;
  diplome: Diplome = new Diplome();
  actif=true;
  diplomes: Diplome[] = [new Diplome()];
  newDiplome: Diplome = new Diplome();
  errorMessage = '';

  constructor(
    private router:Router,
    private cs:CandidatServiceService,
    private formBuilder: FormBuilder,
    private http: HttpClient
    ) { }


    ngOnInit(): void {
      this.user=JSON.parse(localStorage.getItem('user'));
  }

    addDiplome() {
      this.diplomes.push(new Diplome());
    }
    submitForm() {

      console.log(JSON.parse(localStorage.getItem('user')).id);

      console.log(this.user.id);

      this.candidat.diplomes = this.diplomes;
     this.candidat.userId = this.user.id;
      this.cs.ajouterCandidat(this.candidat, this.candidat.userId)
        .subscribe((candidat) => {
          console.log('Candidat ajouté avec succès:', candidat);
        });
    }


  getCoandidat():void{
    this.cs.getCandidatInfo().subscribe(
      (response:CandidatInfo[] )=> {
         this.lesCandidats = response;
      },
      (error:HttpErrorResponse)=>{
        alert(error.message)
      }
    );
  }

  deleteDiplome(index: number) {
    if (this.diplomes.length > 0) {
      this.diplomes.splice(index, 1);
    }}



}

