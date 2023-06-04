import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/User';
import { InscriptionServiceService } from 'src/app/services/inscription-service.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-inscription',
  templateUrl: './inscription.component.html',
  styleUrls: ['./inscription.component.css']
})

export class InscriptionComponent implements OnInit{
  par: User = new User();
  exist: boolean = false;
  wrongCred: boolean = false;
  errorMessage:string=''
  selectedFile: File;
  imgURL: any;
  public imagePath;
  public message: string;


  constructor(
    private is: InscriptionServiceService,
    private router: Router
  ) {}


  ngOnInit(): void {}


  enregistrer() {


    const cin = document.getElementById('cin') as HTMLInputElement;
    const name = document.getElementById('name') as HTMLInputElement;
    const prenom = document.getElementById('prenom') as HTMLInputElement;
    const tel = document.getElementById('name') as HTMLInputElement;
    const password = document.getElementById('password') as HTMLInputElement;
    const motdepasseConfirm = document.getElementById('motdepasseConfirm') as HTMLInputElement;
    const photo = document.getElementById('photo') as HTMLInputElement;
    const email = document.getElementById('email') as HTMLInputElement;


    let isFormValid = true;

    // Check if any input is empty, and display an error message if it is
    if (!email.value) {
      email.style.borderColor = 'red';
      email.nextElementSibling.textContent = 'خانة البريد الالكتروني ضرورية *' ;
      isFormValid = false;
    } else if (!/\S+@\S+\.\S+/.test(email.value)) {
      email.style.borderColor = 'red';
      email.nextElementSibling.textContent = 'البريد الالكتروني غير صالح';
      isFormValid = false;
    } else {
      email.style.borderColor = '';
      email.nextElementSibling.textContent = '';
    }

    if (!name.value) {
      name.style.borderColor = 'red';
      name.nextElementSibling.textContent = 'خانة ضرورية *' ;
      isFormValid = false;
    } else {
      name.style.borderColor = '';
      name.nextElementSibling.textContent = '';
    }
    if (!cin.value) {
      cin.style.borderColor = 'red';
      cin.nextElementSibling.textContent = 'خانة ضرورية *' ;
      isFormValid = false;
    } else {
      cin.style.borderColor = '';
      cin.nextElementSibling.textContent = '';
    }

    if (!photo.value) {
      photo.style.borderColor = 'red';
      photo.nextElementSibling.textContent = 'خانة ضرورية *' ;
      isFormValid = false;
    } else {
      photo.style.borderColor = '';
      photo.nextElementSibling.textContent = '';
    }
    if (!prenom.value) {
      prenom.style.borderColor = 'red';
      prenom.nextElementSibling.textContent = 'خانة ضرورية *' ;
      isFormValid = false;
    } else {
      prenom.style.borderColor = '';
      prenom.nextElementSibling.textContent = '';
    }
    if (!password.value) {
      password.style.borderColor = 'red';
      password.nextElementSibling.textContent = 'خانة ضرورية *' ;
      isFormValid = false;
    } else {
      password.style.borderColor = '';
      password.nextElementSibling.textContent = '';
    }
    if (!tel.value) {
      tel.style.borderColor = 'red';
      tel.nextElementSibling.textContent = 'خانة ضرورية *' ;
      isFormValid = false;
    } else {
      tel.style.borderColor = '';
      tel.nextElementSibling.textContent = '';
    }

    if (!motdepasseConfirm.value) {
      motdepasseConfirm.style.borderColor = 'red';
      motdepasseConfirm.nextElementSibling.textContent = 'خانة ضرورية *' ;
      isFormValid = false;
    } else {
      motdepasseConfirm.style.borderColor = '';
      motdepasseConfirm.nextElementSibling.textContent = '';
    }




    if (isFormValid) {

    this.exist = false;
    this.is.inscrire(this.par,this.selectedFile).subscribe(
      (data) => {
        localStorage.setItem('user', JSON.stringify(data));
        // this.toastr.success('تم إنشاء الحساب بنجاح!', 'تم بنجاح');
        Swal.fire({
          title: 'إنشاء الحساب بنجاح',
          text: 'تم إنشاء الحساب بنجاح',
          icon: 'success'
        });
        this.router.navigate(['/login']);


      },

      (err) => {
        if (err.error == 'NAME_TAKEN') this.exist = true;
        // this.toastr.error('لم يتم إنشاء الحساب. يرجى المحاولة مرة أخرى!', 'خطأ');

        this.errorMessage=("حسٖٖاب موجود")
        Swal.fire({
          title: 'حسٖٖاب موجود',
          text: '  الرجاء إعادة الكرة مرة أخرى',
          icon: 'error'
        });

      }
    );
  }
  }


  signup(f){
    if(f.invalid){

console.log("remplir tout les champs ")}

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



}


