import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { ERole, User } from 'src/app/models/User';
import { InscriptionServiceService } from 'src/app/services/inscription-service.service';
import { HttpParams } from '@angular/common/http';
import Swal, { SweetAlertResult } from 'sweetalert2';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit{

  cin: string;
  motdepasse: string;
  wrongCred: boolean = false;
  role:String;
typeUser=Object.values(ERole);


  constructor(private is: InscriptionServiceService, private router: Router) {}
  ngOnInit(): void {}

  login(): void {
    console.log(localStorage.getItem('user'));

    this.is.login(this.cin, this.motdepasse).subscribe(
      (response: any) => {
        const data = response;

        localStorage.setItem('user', JSON.stringify(data));
        sessionStorage.setItem('isconnecte', 'true');
        console.log(data);

        const role = data.role;
        console.log(role);

        if (role === 'CANDIDAT') {
          this.router.navigate(['/home']);
          Swal.fire({
            title: 'تعريف بالمستعمل بنجاح',
            text: 'تمت عملية التعريف بالمستغمل بنجاح',
            icon: 'success'
          });
        } else {
          Swal.fire({
            title: 'المساحة الإدارية',
            text: 'تم العبور الى المساحة الإدارية بنجاح',
            icon: 'success'
          });
          this.router.navigate(['/admin']);
        }
      },
      (err) => {
        this.wrongCred = true;
        console.log(err.error);

      }
    );
  }

















  resetPassword() {
    Swal.fire({
      title: 'الرجاء إدخال بريدك الإلكتروني',
      input: 'email',
      inputAttributes: {
        autocapitalize: 'off'
      },
      showCancelButton: true,
      cancelButtonText: 'إلغاء',

      confirmButtonText: 'إرسال كلمة العبور الجديدة',
      showLoaderOnConfirm: true,
      preConfirm: (email) => {
        return new Promise((resolve) => {
          setTimeout(() => {
            if (!email) {

              Swal.showValidationMessage('الرجاء إدخال بريد إلكتروني صالح');
            } else {
              resolve(email);
            }
          }, 2000);
        });
      },
      allowOutsideClick: () => !Swal.isLoading()
    }).then((result: SweetAlertResult<any>) => {
      if (result.isConfirmed)
      console.log(result.value); {
        this.is.resetPassword(result.value).subscribe(
          (response: any) => {
            console.log(response);
            Swal.fire({
              title: 'Password Reset Successful!',
              text: response.message,
              icon: 'success',
              confirmButtonText: 'Ok'
            });
          },
        );
      }
    });
  }
}

