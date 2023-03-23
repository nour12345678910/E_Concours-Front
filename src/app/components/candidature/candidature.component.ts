import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
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
export class CandidatureComponent implements OnInit  {
  candidat: CandidatInfo = new CandidatInfo();
  candidatureForm: FormGroup;
  lesCandidats:CandidatInfo[]=[]
  user:User;
  actif=true;


  errorMessage = '';

  constructor(
    private router:Router,
    private cs:CandidatServiceService,
    private formBuilder: FormBuilder,
    private http: HttpClient
    ) { }


  ngOnInit(): void {
    // this.getCoandidat();

    //  this.candidat.userId==this.user.id
    // this.candidat.setUserId(this.user.getId())
      this.user=JSON.parse(localStorage.getItem('user'));
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



  onSubmit(form: any) {
    console.log(JSON.parse(localStorage.getItem('user')).id);

     console.log(this.user.id);
     this.candidat.userId = this.user.id; // Set the User ID in the CandidatInfo object
     this.cs.createCandidat(this.candidat).subscribe(
       data => {
         console.log('Candidature submitted successfully');
         form.reset(); // Reset the form
       },
       error => {
         console.error(error);
         this.errorMessage = error.message;
       }
     );
  }

  onSubmit1(form: NgForm) {
    if (form.valid) {
      // this.candidat.userId==this.user.id
      this.cs.saveCandidat(this.candidat).subscribe(
        result => console.log('Candidature soumise'),
        error => console.error('Erreur lors de la soumission', error)
      );
    }
  }
}







  // // onSubmit() {
  // //   // console.log('Form submitted:', this.candidate);
  // //   // You can add your logic for submitting the form data to the backend here


  // // }

  // onResumeUpload(event: any) {
  //   const file = event.target.files[0];
  //   console.log('Resume uploaded:', file);
  //   // You can add your logic for handling the uploaded file here
  // }


  // onSubmit(candidateForm: NgForm) {
  //   // const userId = localStorage.getItem('userId');
  //   // this.user.id = Number(userId);
  //   // this.cs.addCandidat(this.candidat).subscribe(
  //   //   (response) => {
  //   //     console.log(response);
  //   //     candidateForm.reset();
  //   //   },
  //   //   (error) => {
  //   //     console.log(error);
  //   //   }
  //   // );
  // }





  // onAddCandidat(candidateForm:NgForm){

  //   this.cs.addConcours(candidateForm.value).subscribe(
  //     (response:CandidatInfo)=>{
  //       console.log(response);
  //       console.log(candidateForm.value);
  //       this.getCoandidat();

  //     },
  //     (error:HttpErrorResponse)=> {
  //       alert(error.message)
  //     }
  //   )
  //   this.router.navigate(['admin/concours/listeconcours']);

  // }


