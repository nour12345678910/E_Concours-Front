import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Concours } from 'src/app/models/Concours';
import { User } from 'src/app/models/User';
import { ConcoursService } from 'src/app/services/concours.service';
import { InscriptionServiceService } from 'src/app/services/inscription-service.service';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { HttpClient } from '@angular/common/http';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-listeconcours',
  templateUrl: './listeconcours.component.html',
  styleUrls: ['./listeconcours.component.css']
})
export class ListeconcoursComponent implements OnInit {
  [x: string]: any;
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
    editeConcours:Concours;
    deleteConcours:Concours;
    term:any



    lesConcourss: Concours[] = [];
    imgURL: any;
    public imagePath;

    constructor(
      private cs: ConcoursService,
      private router: Router,
      private http: HttpClient,private route:ActivatedRoute,
      ) {
        this.concoursListe = [];
        this.lesConcours = [];
      }

      deletConcours(id: number) {
        Swal.fire({
          title: 'تأكيد',
          text: 'هل أنت متأكد من رغبتك في حذف هذا الاختبار؟',
          icon: 'warning',
          showCancelButton: true,
          confirmButtonText: 'نعم',
          cancelButtonText: 'لا',
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33'
        }).then((result) => {
          if (result.value) {
            this.cs.deleteConcours(id).subscribe(
              () => {
                this.concoursList = this.concoursList.filter(p => p.id !== id);
                console.log(`تم حذف الاختبار برقم ${id} بنجاح`);
              },
              error => console.error(error)
            );
          }
        });
      }



      openDialog(description: string) {
        Swal.fire({
          title: 'مزيد من التفاصيل',
          html: `<div style="font-size: 35px;">${description}</div>`,
          confirmButtonText: 'حسنًا',
          customClass: {
            container: 'custom-swal-container',
          },
        });
      }

      @ViewChild('add', { static: false }) myModal1!: ElementRef;
    elm1!: HTMLElement;
      ngAfterViewInit(): void {
        this.elm1 = this.myModal1.nativeElement as HTMLElement;

      }
      open(): void {
        this.elm1.classList.add('show');
        this.elm1.style.width = '100vw';

      }

     close(): void {
        this.elm1.classList.remove('show');
        setTimeout(() => {
          this.elm1.style.width = '0';
        }, 75);
      }



      onSelectFile(event): void {
        if (event.target.files.length > 0) {
          const file = event.target.files[0];
          this.selectedFile = file;

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

      public onOpenModal(concours: Concours, mode: string): void {
        const container = document.getElementById('main-container');
        const button = document.createElement('button');
        button.type = 'button';
        button.style.display = 'none';
        button.setAttribute('data-toggle', 'modal');
        if (mode === 'edit') {
          this.editeConcours=concours;
          button.setAttribute('data-target', '#updateEmployeeModal');
        }
        if (mode === 'delete') {
          this.deleteConcours=concours;
          button.setAttribute('data-target', '#deleteEmployeeModal');
        }
        container?.appendChild(button);
        button.click();
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
      this.http.get('http://localhost:8087/api/concours/all')
        .subscribe(
          res => {
            this.retrieveResonse = res;
            this.base64Data = this.retrieveResonse.picByte;
            this.retrievedImage = 'data:image/jpeg;base64,' + this.base64Data;
          }
        );
    }




    concoursList: Concours[];
    ngOnInit() {
      this.cs.getAllConcours()
        .subscribe((concoursList) => {
          this.concoursList = concoursList;
        });

        const id = +this.route.snapshot.paramMap.get('id');
        this.cs.getConcoursById(id).subscribe(concours => {
          this.concours = concours;
          console.log(this.concours.id)});
    }
  }






