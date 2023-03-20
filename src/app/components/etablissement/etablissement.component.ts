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
etablissemen:Etablissement[]=[];



  constructor(private router:Router,private es:EtablissementService,private formBuilder:FormBuilder,private activatedRoute: ActivatedRoute) { }


  modifierEtab() {
    this.es
      .updateEtablissement(this.etablissement)
      .subscribe((response) => console.log('modifiee !'));
    this.router.navigate(['admin']);
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
    activer(){
      this.actif=false;
    }


  ngOnInit(): void {
    this.es.getEtablissement().subscribe(response => this.etablissemen=response)
  }
}
