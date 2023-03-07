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

}

