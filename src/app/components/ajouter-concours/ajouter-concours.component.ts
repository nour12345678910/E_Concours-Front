import { HttpErrorResponse } from '@angular/common/http';
import { Component, ElementRef, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Concours } from 'src/app/models/Concours';
import { ActionHistoriqueServiceService } from 'src/app/services/action-historique-service.service';
import { ConcoursService } from 'src/app/services/concours.service';

@Component({
  selector: 'app-ajouter-concours',
  templateUrl: './ajouter-concours.component.html',
  styleUrls: ['./ajouter-concours.component.css']
})
export class AjouterConcoursComponent {
  lesConcourss: Concours[] = [];
  selectedFile: File;
  imgURL: any;
  public imagePath;
  public message: string;
  selectedDiplomas :string []=[];
  dateE
  dateD
  dateR
  date=new Date()









  @ViewChild('formule', { static: false }) myModal1!: ElementRef;
  elm1!: HTMLElement;

  constructor(private router: Router, private cs: ConcoursService,private actionHistoriqueService:ActionHistoriqueServiceService) {}

  onAddConcours(addForm: NgForm) {
    const poste = document.getElementById('poste') as HTMLInputElement;
    const description = document.getElementById('description') as HTMLInputElement;
    const formule = document.getElementById('formule') as HTMLInputElement;


    const photo = document.getElementById('photo') as HTMLInputElement;
    const dateE = document.getElementById('dateExamen') as HTMLInputElement;
    const dateD = document.getElementById('dateDelais') as HTMLInputElement;
    const dateR = document.getElementById('dateResultat') as HTMLInputElement;
    const diplomes = document.getElementById('diplomes') as HTMLInputElement;
    let isFormValid = true;



    this.dateE=new Date(dateE.value);
    this.dateD=new Date(dateR.value);
    this.dateR=new Date(dateR.value);

    if (!poste.value) {
      poste.style.borderColor = 'red';
      poste.nextElementSibling.textContent = ' خانة  ضرورية *  ' ;
      isFormValid = false;
    } else {
      poste.style.borderColor = '';
      poste.nextElementSibling.textContent = '';
    }
    if (!description.value) {
      description.style.borderColor = 'red';
      description.nextElementSibling.textContent = ' خانة  ضرورية *   ' ;
      isFormValid = false;
    } else {
      description.style.borderColor = '';
      description.nextElementSibling.textContent = '';
    }
    if (!formule.value) {
      formule.style.borderColor = 'red';
      formule.nextElementSibling.textContent = ' خانة  ضرورية *   ' ;
      isFormValid = false;
    } else {
      formule.style.borderColor = '';
      formule.nextElementSibling.textContent = '';
    }

    if (!photo.value) {
      photo.style.borderColor = 'red';
      photo.nextElementSibling.textContent = "  خانة  ضرورية *  ";
      isFormValid = false;
    } else {
      photo.style.borderColor = '';
      photo.nextElementSibling.textContent = '';
    }

    if (!dateE.value) {
      dateE.style.borderColor = 'red';
      dateE.nextElementSibling.textContent = ' خانة  ضرورية * ' ;
      isFormValid = false;
    }
    else if(this.dateE <this.date  ) {
      dateE.style.borderColor = 'red';
      dateE.nextElementSibling.textContent = 'تاريخ  غير صحيح';
      isFormValid = false;
    }
      else {
      dateE.style.borderColor = '';
      dateE.nextElementSibling.textContent = '';
    }

    if (!dateD.value) {
      dateD.style.borderColor = 'red';
      dateD.nextElementSibling.textContent = '   خانة  ضرورية * ' ;
      isFormValid = false;
    }
    else if(this.dateD < this.date ) {
      dateD.style.borderColor = 'red';
      dateD.nextElementSibling.textContent = 'تاريخ  غير صحيح';
      isFormValid = false;
    }
    else {
      dateD.style.borderColor = '';
      dateD.nextElementSibling.textContent = '';
    }

    if (!dateR.value) {
      dateR.style.borderColor = 'red';
      dateR.nextElementSibling.textContent = '   خانة  ضرورية *   ' ;
      isFormValid = false;
    }
    else if(this.dateR < this.date ) {
      dateR.style.borderColor = 'red';
      dateR.nextElementSibling.textContent = 'تاريخ  غير صحيح';
      isFormValid = false;
    }
    else {
      dateR.style.borderColor = '';
      dateR.nextElementSibling.textContent = '';
    }

    if (isFormValid) {

      const selectedCheckboxes = document.querySelectorAll('input[name="diploma"]:checked');
      this.selectedDiplomas = Array.from(selectedCheckboxes).map((checkbox: HTMLInputElement) => checkbox.getAttribute('value'));

      console.log(this.selectedDiplomas);

    const dateExamen: Date = new Date(addForm.value.dateExamen);
    const dateDelais: Date = new Date(addForm.value.dateDelais);
    const dateResultat: Date = new Date(addForm.value.dateResultat);
    this.cs.addConcours(addForm.value.poste, addForm.value.description, addForm.value.formule, dateExamen, dateDelais,dateResultat, this.selectedFile,this.selectedDiplomas.toString())
      .subscribe((data) => {
        console.log(data);
        addForm.resetForm();
        this.router.navigate(['/admin/listeconcours']);
       // Log the add action in historique
       //l'id du concours
       const concoursId = data.id;
       this.actionHistoriqueService.logAction('الإضافة', concoursId).subscribe(
         response => {
           console.log('Action logged successfully');
         },
         error => {
           console.error('Failed to log action:', error);
         }
       );
     });
 }
}





  onSelectFile(event): void {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.selectedFile = file;
      //this.f['profile'].setValue(file);

      const mimeType = event.target.files[0].type;
      if (!mimeType.match(/image\/*/)) {
        this.message = 'Only images are supported.';
        return;
      }

      const reader = new FileReader();
      this.imagePath = file;
      reader.readAsDataURL(file);
      reader.onload = (_event) => {
        this.imgURL = reader.result;
      };
    }
  }






  addBac(){
    const formule = document.getElementById('formule') as HTMLInputElement;

    formule.value=formule.value+"moyenneBac"
  }
  addmoyenne1(){
    const formule = document.getElementById('formule') as HTMLInputElement;

    formule.value=formule.value+"moyenne1"
  }
  addmoyenne2(){
    const formule = document.getElementById('formule') as HTMLInputElement;

    formule.value=formule.value+"moyenne2"
  }
  addmoyenne3(){
    const formule = document.getElementById('formule') as HTMLInputElement;

    formule.value=formule.value+"moyenne3"
  }

  add(){
    const formule = document.getElementById('formule') as HTMLInputElement;

    formule.value=formule.value + "+"
  }

  mult(){
    const formule = document.getElementById('formule') as HTMLInputElement;

    formule.value=formule.value+"*"
  }
  rest(){
    const formule = document.getElementById('formule') as HTMLInputElement;

    formule.value=formule.value+"-"
  }

  div(){
    const formule = document.getElementById('formule') as HTMLInputElement;

    formule.value=formule.value+"/"
  }

  par1(){
    const formule = document.getElementById('formule') as HTMLInputElement;

    formule.value=formule.value+"("
  }
  par2(){
    const formule = document.getElementById('formule') as HTMLInputElement;

    formule.value=formule.value+")"
  }

  reset(){
    const formule = document.getElementById('formule') as HTMLInputElement;

    formule.value=""

  }


  add1(){
    const formule = document.getElementById('formule') as HTMLInputElement;

    formule.value=formule.value + "1"
  }

  add2(){
    const formule = document.getElementById('formule') as HTMLInputElement;

    formule.value=formule.value + "2"
  }

  add3(){
    const formule = document.getElementById('formule') as HTMLInputElement;

    formule.value=formule.value + "3"
  }

  add4(){
    const formule = document.getElementById('formule') as HTMLInputElement;

    formule.value=formule.value + "4"
  }


  add5(){
    const formule = document.getElementById('formule') as HTMLInputElement;

    formule.value=formule.value + "5"
  }


  add6(){
    const formule = document.getElementById('formule') as HTMLInputElement;

    formule.value=formule.value + "6"
  }

  add7(){
    const formule = document.getElementById('formule') as HTMLInputElement;

    formule.value=formule.value + "7"
  }

  add8(){
    const formule = document.getElementById('formule') as HTMLInputElement;

    formule.value=formule.value + "8"
  }


  add9(){
    const formule = document.getElementById('formule') as HTMLInputElement;

    formule.value=formule.value + "9"
  }

  ngAfterViewInit(): void {
    this.elm1 = this.myModal1.nativeElement as HTMLElement;


  }

 close(): void {
    this.elm1.classList.remove('show');
    setTimeout(() => {
      this.elm1.style.width = '0';
    }, 75);
  }
  open(): void {
    this.elm1.classList.add('show');
    this.elm1.style.width = '100vw';

  }



}
