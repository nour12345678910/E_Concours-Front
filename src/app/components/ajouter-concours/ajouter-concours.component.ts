import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Concours } from 'src/app/models/Concours';
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

  constructor(private router: Router, private cs: ConcoursService) {}

  onAddConcours(addForm: NgForm) {
    const dateExamen: Date = new Date(addForm.value.dateExamen);
    const dateDelais: Date = new Date(addForm.value.dateDelais);
    this.cs.addConcours(addForm.value.poste, addForm.value.description, dateExamen, dateDelais, this.selectedFile)
      .subscribe((data) => {
        console.log(data);
        addForm.resetForm();
        this.router.navigate(['/admin/concours/listeconcours']);
      });
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
