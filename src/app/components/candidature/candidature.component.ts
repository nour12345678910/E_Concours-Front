import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CandidatInfo } from 'src/app/models/CandidatInfo';
import { User } from 'src/app/models/User';
import { CandidatServiceService } from 'src/app/services/candidat-service.service';
import { Diplome } from 'src/app/models/Diplome';
import { Concours } from 'src/app/models/Concours';
import { ConcoursService } from 'src/app/services/concours.service';
import Swal from 'sweetalert2';

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
  concours: Concours;
  public today: Date;
  public maxBirthDate: Date;
  public minBirthDate: Date;
  constructor(
    private router:Router,
    private cs:CandidatServiceService,
    private formBuilder: FormBuilder,
    private http: HttpClient, private concoursService:ConcoursService,private route: ActivatedRoute
    ) { }








    ngOnInit(): void {
      this.user=JSON.parse(localStorage.getItem('user'));
      const id = +this.route.snapshot.paramMap.get('id');
    this.concoursService.getConcoursById(id).subscribe(concours => {
      this.concours = concours;
      console.log(this.concours.id)
      this.today = new Date();
      const minYear = this.today.getFullYear() - 40;
      const maxYear = this.today.getFullYear() - 20;
      this.minBirthDate = new Date(minYear, 0, 1); // January 1st of the specified year
      this.maxBirthDate = new Date(maxYear, 11, 31); // December 31st of the specified year
  })}

  public maxDate(): string {
    return this.formatDate(this.maxBirthDate);
  }

  public minDate(): string {
    return this.formatDate(this.minBirthDate);
  }

  private formatDate(date: Date): string {
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');
    return `${year}-${month}-${day}`;
  }






    addDiplome() {
      this.diplomes.push(new Diplome());
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


    showMyContainer: boolean = true;

    submitForm() {
      console.log(JSON.parse(localStorage.getItem('user')).id);
      console.log(this.user.id);
      this.candidat.diplomes = this.diplomes;
      this.candidat.userId = this.user.id;
      this.candidat.concoursId=+this.route.snapshot.paramMap.get('id');
      const concoursId = // add code to get the value of concoursId
      this.cs.ajouterCandidat(this.candidat, this.candidat.userId, this.candidat.concoursId)
      .subscribe(
        (candidat) => {
          console.log('Candidat ajouté avec succès:', candidat);
          // alert(`Candidat ajouté avec succès \n \r Votre  Score est égale à : ${candidat.score}`);

          Swal.fire({
            title: `إضافة طلب ترشحك بنجاح بمعدل: ${candidat.score}`,
            text: 'تم إنشاء الحساب بنجاح',
            icon: 'success'
          });
        },
        (error) => {
          this.errorMessage=("أنت مسجل في هذه المناظرة من قبل")
          console.error('Une erreur est survenue:', error);

          Swal.fire({
            title: `أنت مسجل في هذه المناظرة من قبل`,
            // text: 'تم إنشاء الحساب بنجاح',
            icon: 'error'
          });

          // alert(`user existant`);
        }
      );







    }



}

