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
import * as math from 'mathjs';

@Component({
  selector: 'app-candidature',
  templateUrl: './candidature.component.html',
  styleUrls: ['./candidature.component.css']
})
export class CandidatureComponent implements OnInit  {
  isPanelOpen = false; // initialize isPanelOpen property to false

  diplomeInfoVisible: boolean[] = [true]; // by default, show the first diploma's information
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

    i: number = 0; // add this line to define the i variable

    currentPanel = 0;

    togglePanel(panelIndex: number) {
      this.currentPanel = this.currentPanel === panelIndex ? -1 : panelIndex;
    }



    ngOnInit(): void {
      this.user=JSON.parse(localStorage.getItem('user'));
      const id = +this.route.snapshot.paramMap.get('id');
      this.concoursService.getConcoursById(id).subscribe(concours => {
      this.concours = concours;
      console.log(this.concours.id)
      this.today = new Date();
      const minYear = this.today.getFullYear() - 40;
      const maxYear = this.today.getFullYear() - 20;
      this.minBirthDate = new Date(minYear, 0, 1);
      this.maxBirthDate = new Date(maxYear, 11, 31);
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



    showDiplomeInfo: boolean = false;
    diplomeInfo: Diplome;
    showMyContainer: boolean = true;

    submitForm() {

      const sex = document.getElementById('sex') as HTMLInputElement;
      const birthdayDate = document.getElementById('birthdayDate') as HTMLInputElement;
      const birthdayPlace = document.getElementById('birthdayPlace') as HTMLInputElement;
      const civilStatus = document.getElementById('civilStatus') as HTMLInputElement;
      const adress = document.getElementById('address') as HTMLInputElement;
      const zipCode = document.getElementById('zipCode') as HTMLInputElement;
      const state = document.getElementById('state') as HTMLInputElement;
      const city = document.getElementById('city') as HTMLInputElement;

      const diplome = document.getElementById('diplome') as HTMLInputElement;
      const faculte = document.getElementById('faculte') as HTMLInputElement;
      const specialite = document.getElementById('specialite') as HTMLInputElement;
      const anneObtention = document.getElementById('anneObtention') as HTMLInputElement;
      const moyenne1 = document.getElementById('moyenne1') as HTMLInputElement;
      const moyenne2 = document.getElementById('moyenne2') as HTMLInputElement;
      const moyenne3 = document.getElementById('moyenne3') as HTMLInputElement;
      const moyenneBac = document.getElementById('moyenneBac') as HTMLInputElement;



      let isFormValid = true;

      if (!sex.value) {
        sex.style.borderColor = 'red';
        sex.nextElementSibling.textContent = '  خانة  ضرورية * ' ;
        isFormValid = false;
      } else {
        sex.style.borderColor = '';
        sex.nextElementSibling.textContent = '';
      }
      if (!birthdayDate.value) {
        birthdayDate.style.borderColor = 'red';
        birthdayDate.nextElementSibling.textContent = 'خانة ضرورية *';
        isFormValid = false;
      } else if (!this.checkBirthDateValidity(birthdayDate.value)) {
        birthdayDate.style.borderColor = 'red';
        birthdayDate.nextElementSibling.textContent = 'تاريخ الميلاد غير صحيح';
        isFormValid = false;
      } else {
        birthdayDate.style.borderColor = '';
        birthdayDate.nextElementSibling.textContent = '';
      }
      if (!birthdayPlace.value) {
        birthdayPlace.style.borderColor = 'red';
        birthdayPlace.nextElementSibling.textContent = '  خانة  ضرورية * ' ;
        isFormValid = false;
      } else {
        birthdayPlace.style.borderColor = '';
        birthdayPlace.nextElementSibling.textContent = '';
      }
      if (!state.value) {
        state.style.borderColor = 'red';
        state.nextElementSibling.textContent = '  خانة  ضرورية * ' ;
        isFormValid = false;
      } else {
        state.style.borderColor = '';
        state.nextElementSibling.textContent = '';
      }
      if (!zipCode.value) {
        zipCode.style.borderColor = 'red';
        zipCode.nextElementSibling.textContent = '  خانة  ضرورية * ' ;
        isFormValid = false;
      } else {
        zipCode.style.borderColor = '';
        zipCode.nextElementSibling.textContent = '';
      }


      if (!civilStatus.value) {
        civilStatus.style.borderColor = 'red';
        civilStatus.nextElementSibling.textContent = '  خانة  ضرورية * ' ;
        isFormValid = false;
      } else {
        civilStatus.style.borderColor = '';
        civilStatus.nextElementSibling.textContent = '';
      }
      if (!adress.value) {
        adress.style.borderColor = 'red';
        adress.nextElementSibling.textContent = '  خانة  ضرورية * ' ;
        isFormValid = false;
      } else {
        adress.style.borderColor = '';
        adress.nextElementSibling.textContent = '';
      }
      if (!city.value) {
        city.style.borderColor = 'red';
        city.nextElementSibling.textContent = '  خانة  ضرورية * ' ;
        isFormValid = false;
      } else {
        city.style.borderColor = '';
        city.nextElementSibling.textContent = '';
      }


      if (!diplome.value) {
        diplome.style.borderColor = 'red';
        diplome.nextElementSibling.textContent = '  خانة  ضرورية * ' ;
        isFormValid = false;
      } else {
        diplome.style.borderColor = '';
        diplome.nextElementSibling.textContent = '';
      }
      if (!faculte.value) {
        faculte.style.borderColor = 'red';
        faculte.nextElementSibling.textContent = '  خانة  ضرورية * ' ;
        isFormValid = false;
      } else {
        faculte.style.borderColor = '';
        faculte.nextElementSibling.textContent = '';
      }
      if (!specialite.value) {
        specialite.style.borderColor = 'red';
        specialite.nextElementSibling.textContent = '  خانة  ضرورية * ' ;
        isFormValid = false;
      } else {
        specialite.style.borderColor = '';
        specialite.nextElementSibling.textContent = '';
      }
      if (!anneObtention.value) {
        anneObtention.style.borderColor = 'red';
        anneObtention.nextElementSibling.textContent = '  خانة  ضرورية * ' ;
        isFormValid = false;
      } else {
        anneObtention.style.borderColor = '';
        anneObtention.nextElementSibling.textContent = '';
      }


      if (isFormValid) {
        this.concoursService.getConcoursById( this.route.snapshot.paramMap.get('id')).subscribe(concours => {
          this.concours = concours;});
          console.log('Formula:', this.concours.formule);

        const formules = this.diplomes.map(diplome => {
          const moyenneBac = +diplome.moyenneBac || 0;
          const moyenne1 = +diplome.moyenne1 || 0;
          const moyenne2 = +diplome.moyenne2 || 0;
          const moyenne3 = +diplome.moyenne3 || 0;
          const formule = this.concours.formule // Get the formule from the concours object

          if (!formule) {
            throw new Error('formule is undefined');
          }

          // Evaluate the formule using mathjs
          const scope = {
            moyenneBac,
            moyenne1,
            moyenne2,
            moyenne3,
          };
          const evaluatedformule = math.evaluate(formule, scope);

          return evaluatedformule;
        });

        // Calculate overall formule
        const overallformule = formules.reduce((sum, formule) => sum + formule, 0);


        // Do something with the overall formule, such as saving it to a database
        console.log(`Overall formule: ${overallformule}`);


      console.log(JSON.parse(localStorage.getItem('user')).id);
      console.log(this.user.id);
      this.candidat.diplomes = this.diplomes;
      this.candidat.userId = this.user.id;
      this.candidat.concoursId=+this.route.snapshot.paramMap.get('id');
      this.candidat.score=overallformule;

      this.cs.ajouterCandidat(this.candidat, this.candidat.userId, this.candidat.concoursId)
      .subscribe(
        (candidat) => {
          console.log('Candidat ajouté avec succès:', candidat);
          // alert(`Candidat ajouté avec succès \n \r Votre  formule est égale à : ${candidat.formule}`);

          Swal.fire({
            title: `إضافة طلب ترشحك بنجاح بمعدل: ${candidat.score}`,
            text: 'تم إنشاء الحساب بنجاح',
            icon: 'success'
          });
          this.router.navigate(['/profil'])
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


    collapsed: false;


    diplomeAdded = false;
    addDiplomez() {
      this.diplomes.push(new Diplome());
      this.diplomeAdded = true;
    }

    addDiplomee() {
      if (this.diplomes.length > 0) {
        this.diplomes[this.diplomes.length - 1].collapsed = true;
      }
      this.diplomes.push({
        diplome: '', moyenneBac: '',
        id: 0,
        specialite: '',
        faculte: '',
        anneeObtention: '',
        moyenne1: '',
        moyenne2: '',
        moyenne3: '',
        candidat: new CandidatInfo,
        collapsed: false
      });
    }

    deleteDiplomee(index: number) {
      this.diplomes.splice(index, 1);
    }


    diplomesz = [
      {
        diplome: 'شهادة البكالوريا',
        moyenneBac: '',
        collapsed: false
      }
    ];

    addDiplome() {

      if (this.diplomes.length > 0) {
        this.diplomes[this.diplomes.length - 1].collapsed = true;
      }
      this.diplomes.push(new Diplome());
    }

    deleteDiplome(index: number) {
      this.diplomes.splice(index, 1);
    }

    toggleDiplome(index: number) {
      this.diplomes[index].collapsed = !this.diplomes[index].collapsed;
    }


    checkBirthDateValidity(dateString: string): boolean {
      // Convert dateString to a Date object
      const birthDate = new Date(dateString);

      // Check if birthDate is between minDate and maxDate
      return birthDate >= this.minBirthDate && birthDate <= this.maxBirthDate;
    }
}

