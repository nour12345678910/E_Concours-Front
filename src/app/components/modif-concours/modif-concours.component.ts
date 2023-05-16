import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Concours } from 'src/app/models/Concours';
import { ConcoursService } from 'src/app/services/concours.service';
import { format } from 'date-fns';
import { DomSanitizer } from '@angular/platform-browser';


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

  concours: Concours;
  imageFile: File;

  constructor(private route: ActivatedRoute, private concoursService: ConcoursService,private router:Router
    ,private cdr: ChangeDetectorRef,private sanitizer: DomSanitizer) { }

  ngOnInit() {
    const id = +this.route.snapshot.paramMap.get('id');
    this.concoursService.getConcoursById(id).subscribe(concours => {
      this.concours = concours;
      console.log(this.concours.id)
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
    const postData = new FormData();
    postData.append('poste', this.concours.poste);
    postData.append('description', this.concours.description);
    postData.append('formule', this.concours.formule);
    const dateExamen = new Date(this.concours.dateExamen).toISOString().slice(0, 10);
    const dateDelais = new Date(this.concours.dateDelais).toISOString().slice(0, 10);
    postData.append('dateExamen', dateExamen);
    postData.append('dateDelais', dateDelais);

    if (this.imageFile) {
      postData.append('image', this.imageFile, this.imageFile.name);
    }
    this.concoursService.updateConcours(this.concours.id, postData).subscribe(concours => {
      this.concours = concours;
      window.location.reload();
    }, error => {
      console.log(error);
    });
    this.router.navigate(['/admin/concours/listeconcours']);
    
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