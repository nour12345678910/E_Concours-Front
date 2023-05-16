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


