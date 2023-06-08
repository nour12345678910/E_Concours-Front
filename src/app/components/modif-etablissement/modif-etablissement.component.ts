import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Etablissement } from 'src/app/models/Etablissement';
import { EtablissementService } from 'src/app/services/etablissement.service';

@Component({
  selector: 'app-modif-etablissement',
  templateUrl: './modif-etablissement.component.html',
  styleUrls: ['./modif-etablissement.component.css']
})
export class ModifEtablissementComponent implements OnInit {
  actif=true;
  etablissement:Etablissement;
  editForm: FormGroup
  etablissemen:Etablissement[]

  selectedFile: File;
  selectedLogo: File;
  imgURL: any;
  public imagePath;
  logoURL: any;
  public logoPath;
  public message: string;

  imageFile: File;
  logoFile:File



    constructor(private router:Router,private es:EtablissementService,private formBuilder:FormBuilder,private activatedRoute: ActivatedRoute) { }



    ngOnInit() {
      const id = +this.activatedRoute.snapshot.paramMap.get('id');
      this.es.getEtablissementById(id).subscribe(etablissement => {
        this.etablissement = etablissement;
      });
    }

    onImagePicked(event: Event) {
      const file = (event.target as HTMLInputElement).files[0];
      this.imageFile = file;
    }

    onLogoPicked(event: Event) {
      const file = (event.target as HTMLInputElement).files[0];
      this.logoFile = file;
    }

    handlelogoInput(event: any) {
      this.logoFile = event.target.files[0];
    }

    handleFileInput(event: any) {
      this.imageFile = event.target.files[0];
    }




    onSubmit() {
      const postData = new FormData();
      postData.append('nom', this.etablissement.nom);
      postData.append('email', this.etablissement.email);
      postData.append('adresse', this.etablissement.adresse);
      postData.append('telephone', this.etablissement.telephone);
      postData.append('numfix', this.etablissement.numFix);


      if (this.imageFile) {
        postData.append('imagefond', this.imageFile, this.imageFile.name);
      }
      if (this.logoFile) {
        postData.append('logo', this.logoFile, this.logoFile.name);
      }
      this.es.updateEtablissement(this.etablissement.id, postData).subscribe(etablissement => {
        this.etablissement = etablissement;
        window.location.reload();

      });
      this.router.navigate(['/admin/etablissement']);
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
  onSelectLogo(event): void {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.selectedLogo = file;

      const mimeType = event.target.files[0].type;
      if (!mimeType.match(/image\/*/)) {
        this.message = 'Only images are supported.';
        return;
      }

      const reader = new FileReader();
      this.logoPath = file;
      reader.readAsDataURL(file);
      reader.onload = (_event) => {
        this.logoURL = reader.result;
      };
    }
}
  }

