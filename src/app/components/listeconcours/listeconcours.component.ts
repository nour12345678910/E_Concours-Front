import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Concours } from 'src/app/models/Concours';
import { User } from 'src/app/models/User';
import { ConcoursService } from 'src/app/services/concours.service';
import { InscriptionServiceService } from 'src/app/services/inscription-service.service';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-listeconcours',
  templateUrl: './listeconcours.component.html',
  styleUrls: ['./listeconcours.component.css']
})
export class ListeconcoursComponent implements OnInit {
  concours:Concours;
  loginStatus:boolean;
  user:User;
  concoursListe: Concours[];
  lesConcours: Concours[]=[];
  safeImageUrl: SafeUrl = '';



  selectedFile: File;
  retrievedImage: any;
  base64Data: any;
  retrieveResonse: any;
  message: string;
  imageName: any;

  constructor(
    private cs: ConcoursService,
    private router: Router,
    private is:InscriptionServiceService,
    private http: HttpClient,
    private sanitizer: DomSanitizer  ) {
      this.concoursListe = [];
      this.lesConcours = [];
    }




    // ngOnInit(): void {
    //   // console.log(this.concours.photo)
    //   // this.getAllConcoursWithImages();
    //   this.cs.getConcours().subscribe(response => this.lesConcours=response);
    //   this.loginStatus=this.is.isLoggedIn;
    // }

  // ngOnInit(): void {
  //   this.cs.getAllConcours().subscribe((concoursList) => {
  //     this.lesConcours = concoursList;
  //   });
  // }


  // ngOnInit(): void {
  //   this.getImage();
  // }
  getConcour() {
    // this.cs.getConcours().subscribe(
    //   data => {
    //     this.lesConcours = data;
    //     for (let i = 0; i < this.lesConcours.length; i++) {
    //       if (this.lesConcours[i].photo) {
    //         // Convert the byte array to a base64 string
    //         let binary = '';
    //         let bytes = new Uint8Array(this.lesConcours[i].photo.data);
    //         bytes.forEach((b) => binary += String.fromCharCode(b));
    //         const base64String = window.btoa(binary);
    //         // Create a SafeUrl from the base64 string
    //         // Create a SafeUrl from the base64 string
    //         this.lesConcours[i]['safeImageUrl'] = this.sanitizer.bypassSecurityTrustUrl('data:image/png;base64,' + base64String);
    //       }::
    //     }
    //     console.log(this.lesConcours); // log the updated array
    //   },
    //   error => console.error(error)
    // );
  }




  dataURItoBlob(dataURI: string): Blob {
    const byteString = atob(dataURI.split(',')[1]);
    const mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0];
    const ab = new ArrayBuffer(byteString.length);
    const ia = new Uint8Array(ab);
    for (let i = 0; i < byteString.length; i++) {
      ia[i] = byteString.charCodeAt(i);
    }
    return new Blob([ab], { type: mimeString });
  }


  submit(){
    if(this.loginStatus=true)
    {
      this.router.navigate(["/login"]);
      alert("Vous avez s'authentifié avec succées ")
    }else{
    this.router.navigate(["/inscription"]);}}

getImage() {
    //Make a call to Sprinf Boot to get the Image Bytes.
    this.http.get('http://localhost:8087/api/concours/all')
      .subscribe(
        res => {
          this.retrieveResonse = res;
          this.base64Data = this.retrieveResonse.picByte;
          this.retrievedImage = 'data:image/jpeg;base64,' + this.base64Data;
        }
      );
  }

  // ngOnInit(): void {
  //   this.cs.getConcour().subscribe(
  //     (concoursList: Concours[]) => {
  //       this.concoursListe = concoursList;
  //       console.log(this.concoursListe); // log the Concours objects to the console
  //     }
  //   );
  // }



  concoursList: Concours[];
  ngOnInit() {
    this.cs.getAllConcours()
      .subscribe((concoursList) => {
        this.concoursList = concoursList;
      });
  }
}
