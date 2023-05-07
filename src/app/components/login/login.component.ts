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


















  login() {
    console.log(localStorage.getItem('user'));

    const params = new HttpParams()
      .set('cin', this.cin)
      .set('motdepasse', this.motdepasse);

    this.is.login(params).subscribe(
      (data) => {
        localStorage.setItem('user', JSON.stringify(data));
        sessionStorage.setItem("isconnecte", "true");
        console.log(data);
        this.role = data.role;
        if (this.role == "CANDIDAT") {
          this.router.navigate(["/home"]);
          // alert("Vous avez s'authentifié avec succès");
          Swal.fire({
            title: 'تعريف بالمستعمل بنجاح',
            text: '  تمت عملية التعريف بالمستغمل بنجاح',
            icon: 'success'
          });
        } else {
          Swal.fire({
            title: 'المساحة  الإدارية',
            text: '  تم العبور الى المساحة الإدارية بنجاح',
            icon: 'success'
          });
          this.router.navigate(["/admin"]);
        }
      },
      (err) => {
        if (err.error == 'Invalid CIN or password') this.wrongCred = true;
        console.log(err.error);
      }
    );
  }









  // resetPassword() {
  //   Swal.fire({
  //     title: 'Enter your name',
  //     input: 'text',
  //     inputAttributes: {
  //       autocapitalize: 'off'
  //     },
  //     showCancelButton: true,
  //     confirmButtonText: 'Submit',
  //     showLoaderOnConfirm: true,
  //     preConfirm: (name) => {
  //       return new Promise((resolve) => {
  //         setTimeout(() => {
  //           if (name === 'example') {
  //             Swal.showValidationMessage('This name is not available');
  //           } else {
  //             resolve(name);
  //           }
  //         }, 2000);
  //       });
  //     },
  //     allowOutsideClick: () => !Swal.isLoading()
  //   }).then((result) => {
  //     if (result.isConfirmed) {
  //       Swal.fire({
  //         title: `Hello, ${result.value}!`,
  //         icon: 'success'
  //       });
  //     }
  //   });
  // }











}

