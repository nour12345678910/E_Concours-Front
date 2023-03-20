import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { CandidatInfo } from 'src/app/models/CandidatInfo';
import { User } from 'src/app/models/User';
import { CandidatServiceService } from 'src/app/services/candidat-service.service';

@Component({
  selector: 'app-candidature',
  templateUrl: './candidature.component.html',
  styleUrls: ['./candidature.component.css']
})
export class CandidatureComponent implements OnInit {
  lesCandidats:CandidatInfo[]=[]
  user:User;
  candidate: any;
  actif=true;

  constructor(private router:Router,private cs:CandidatServiceService) { }


  ngOnInit(): void {
    this.user=JSON.parse(localStorage.getItem('user'));
    this.getCoandidat();
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



  onSubmit() {
    console.log('Form submitted:', this.candidate);
    // You can add your logic for submitting the form data to the backend here
  }

  onResumeUpload(event: any) {
    const file = event.target.files[0];
    console.log('Resume uploaded:', file);
    // You can add your logic for handling the uploaded file here
  }



  onAddCandidat(candidateForm:NgForm){

    this.cs.addConcours(candidateForm.value).subscribe(
      (response:CandidatInfo)=>{
        console.log(response);
        console.log(candidateForm.value);
        this.getCoandidat();

      },
      (error:HttpErrorResponse)=> {
        alert(error.message)
      }
    )
    this.router.navigate(['admin/concours/listeconcours']);

  }


}
