import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Etablissement } from 'src/app/models/Etablissement';
import { User } from 'src/app/models/User';
import { EtablissementService } from 'src/app/services/etablissement.service';

@Component({
  selector: 'app-etablissement',
  templateUrl: './etablissement.component.html',
  styleUrls: ['./etablissement.component.css']
})
export class EtablissementComponent implements OnInit {
actif=true;
etablissement:Etablissement=new Etablissement()
editForm: FormGroup
etablissemen:Etablissement[]=[]
listetab: Etablissement[];


  constructor(private router:Router,private es:EtablissementService,private formBuilder:FormBuilder,private activatedRoute: ActivatedRoute) { }

  
  
  ngOnInit(): void {
    this.es.getEtablissement().subscribe((listetab) => {
      this.listetab = listetab;
    })
  } 
  
  activer(){
    this.actif=false;
  }
  



  getEtablissement():void{
    this.es.getEtablissement().subscribe(
      (response:Etablissement[] )=> {
         this.etablissemen = response;
      },
      (error:HttpErrorResponse)=>{
        alert(error.message)
      }
    );
    }
   


 
}
