import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Reclamation } from 'src/app/models/Reclamation';
import { ReclamationService } from 'src/app/services/reclamation.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-reclamation',
  templateUrl: './reclamation.component.html',
  styleUrls: ['./reclamation.component.css']
})
export class ReclamationComponent implements OnInit {

reclamation: Reclamation=new Reclamation();
  errorMessage: string;

  ngOnInit(): void {
  }

  constructor(private rs:ReclamationService,private router:Router){}

  enregistrer() {
    this.rs.addReclamation(this.reclamation).subscribe(
      () => {
        this.router.navigate(['/home']); // navigate to the home page
        Swal.fire({
          title: 'تمت إضافة تساؤلك بنجاح',
          // text: '  تم العبور الى المساحة الإدارية بنجاح',
          icon: 'success'
        });      },
      (error) => {
        console.error(error);
        this.errorMessage = 'Erreur lors de l\'ajout de la réclamation.'; // display an error message
        alert(this.errorMessage);
      }
    );
  }



}
