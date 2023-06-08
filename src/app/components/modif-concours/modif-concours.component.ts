import { ChangeDetectorRef, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Concours } from 'src/app/models/Concours';
import { ConcoursService } from 'src/app/services/concours.service';
import { format } from 'date-fns';
import { DomSanitizer } from '@angular/platform-browser';
import { i } from 'mathjs';
import { ActionHistoriqueServiceService } from 'src/app/services/action-historique-service.service';


@Component({
  selector: 'app-modif-concours',
  templateUrl: './modif-concours.component.html',
  styleUrls: ['./modif-concours.component.css']
})
export class ModifConcoursComponent implements OnInit {
  selectedFile: File;
  imgURL: any;
  public imagePath;
  public message: string;
  selectedDiplomas :string []=[];
  concours: Concours;
  imageFile: File;
  diplomesList;
  bac:boolean=false;
  licence:boolean=false;
  ingenieurie:boolean=false;
  master:boolean=false;
  doctora:boolean=false;
  dateE
  dateD
  dateR
  date=new Date()

  constructor(private route: ActivatedRoute, private concoursService: ConcoursService,private router:Router,    private actionHistoriqueService:ActionHistoriqueServiceService
    ) { }

  ngOnInit() {
    const id = +this.route.snapshot.paramMap.get('id');
    this.concoursService.getConcoursById(id).subscribe(concours => {
      this.concours = concours;
      console.log(this.concours.id)

      const diplomes=this.concours.diplomes;
      this.diplomesList=diplomes.split(",");
      console.log(this.diplomesList)

    if( this.diplomesList.includes('شهاده الاجازة')) {this.licence=true}
    if( this.diplomesList.includes('شهادة البكالوريا')){ this.bac=true}
    if( this.diplomesList.includes('شهاده هندسة')) { this.ingenieurie=true}
    if( this.diplomesList.includes('شهادة الماجستير')) { this.master=true}
    if( this.diplomesList.includes('شهادة الدكتوراه')){  this.doctora=true}


    });



  }



  onImagePicked(event: Event) {
    const file = (event.target as HTMLInputElement).files[0];
    this.imageFile = file;
  }

  handleFileInput(event: any) {
    this.imageFile = event.target.files[0];
  }

  onSubmit() {
    const poste = document.getElementById('poste') as HTMLInputElement;
    const description = document.getElementById('description') as HTMLInputElement;
    const formule = document.getElementById('formule') as HTMLInputElement;



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


    if (!dateE.value) {
      dateE.style.borderColor = 'red';
      dateE.nextElementSibling.textContent = ' خانة  ضرورية * ' ;
      isFormValid = false;
    }
    else if(this.dateE <this.date) {
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
    else if(this.dateD < this.date) {
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
    else if(this.dateR < this.date) {
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

    const postData = new FormData();
    postData.append('poste', this.concours.poste);
    postData.append('description', this.concours.description);
    postData.append('formule', this.concours.formule);
    const dateExamen = new Date(this.concours.dateExamen).toISOString().slice(0, 10);
    const dateDelais = new Date(this.concours.dateDelais).toISOString().slice(0, 10);
    const dateResultat = new Date(this.concours.dateResultat).toISOString().slice(0, 10);
    postData.append('dateExamen', dateExamen);
    postData.append('dateDelais', dateDelais);
    postData.append('dateResultat', dateResultat);
    postData.append('diplomes', this.selectedDiplomas.toString());


    if (this.imageFile) {
      postData.append('image', this.imageFile, this.imageFile.name);
    }
    this.concoursService.updateConcours(this.concours.id, postData).subscribe(concours => {
      this.concours = concours;
      this.router.navigate(['/admin/listeconcours']);

// Log the modify action in historique
this.actionHistoriqueService.logAction('التعديل', this.concours.id).subscribe(
  response => {
    console.log('Action logged successfully');
  },
  error => {
    console.error('Failed to log action:', error);
  }
);
},
error => {
console.log(error);
}
);
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

  @ViewChild('formule', { static: false }) myModal1!: ElementRef;
  elm1!: HTMLElement;

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
    const formule = document.getElementById('formule') as HTMLInputElement;

    formule.value=""
    this.elm1.classList.add('show');
    this.elm1.style.width = '100vw';

  }



}
