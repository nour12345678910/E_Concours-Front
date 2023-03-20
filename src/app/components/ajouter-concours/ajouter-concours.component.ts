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
  lesConcourss:Concours[]=[]
  userFile;
  imgURL:any;
  public imagePath;
  public message:string;

  constructor(private router:Router,private cs:ConcoursService) { }

  getConcours():void{
    this.cs.getConcours().subscribe(
      (response:Concours[] )=> {
         this.lesConcourss = response;
      },
      (error:HttpErrorResponse)=>{
        alert(error.message)
      }
    );
  }

  onAddConcours(addForm:NgForm){

    this.cs.addConcours(addForm.value).subscribe(
      (response:Concours)=>{
        console.log(response);
        console.log(addForm.value);
        this.getConcours();

      },
      (error:HttpErrorResponse)=> {
        alert(error.message)
      }
    )
    this.router.navigate(['admin/concours/listeconcours']);

  }
  ngOnInit(): void {
    this.getConcours();
  }


  onSelectFile(event){
    if(event.target.files.length >0)
    {
      const file=event.target.files[0];
      this.userFile=file;
      //this.f['profile'].setValue(file);

      var mimeType=event.target.files[0].type;
      if(mimeType.match(/image\/*/) == null){
        this.message="Only images are supported.";
        return;
      }

      var reader=new FileReader();
      this.imagePath = file;
      reader.readAsDataURL(file);
      reader.onload =(_event)=>{
        this.imgURL=reader.result;
      }
    }
  }


}

