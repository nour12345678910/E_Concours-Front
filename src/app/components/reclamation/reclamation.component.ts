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
    const emailInput = document.getElementById('email') as HTMLInputElement;
    const nameInput = document.getElementById('name') as HTMLInputElement;
    const subjectInput = document.getElementById('subject') as HTMLInputElement;
    const messageInput = document.getElementById('message') as HTMLInputElement;

    let isFormValid = true;

    if (!emailInput.value) {
      emailInput.style.borderColor = 'red';
      emailInput.nextElementSibling.textContent = 'خانة البريد الالكتروني ضرورية *' ;
      isFormValid = false;
    } else if (!/\S+@\S+\.\S+/.test(emailInput.value)) {
      emailInput.style.borderColor = 'red';
      emailInput.nextElementSibling.textContent = 'البريد الالكتروني غير صالح *';
      isFormValid = false;
    } else {
      emailInput.style.borderColor = '';
      emailInput.nextElementSibling.textContent = '';
    }

    if (!nameInput.value) {
      nameInput.style.borderColor = 'red';
      nameInput.nextElementSibling.textContent = 'خانة الإسم و اللقب ضرورية *' ;
      isFormValid = false;
    } else {
      nameInput.style.borderColor = '';
      nameInput.nextElementSibling.textContent = '';
    }

    if (!subjectInput.value) {
      subjectInput.style.borderColor = 'red';
      subjectInput.nextElementSibling.textContent = ' خانة الموضوع ضرورية *';
      isFormValid = false;
    } else {
      subjectInput.style.borderColor = '';
      subjectInput.nextElementSibling.textContent = '';
    }

    if (!messageInput.value) {
      messageInput.style.borderColor = 'red';
      messageInput.nextElementSibling.textContent = ' خانة المحتوى ضرورية *';
      isFormValid = false;
    } else {
      messageInput.style.borderColor = '';
      messageInput.nextElementSibling.textContent = '';
    }

    if (isFormValid) {
      this.rs.addReclamation(this.reclamation).subscribe(
        () => {
          this.router.navigate(['/home']); // navigate to the home page
          Swal.fire({
            title: 'تمت إضافة تساؤلك بنجاح',
            icon: 'success'
          });
        },
        (error) => {
          console.error(error);
          this.errorMessage = 'Erreur lors de l\'ajout de la réclamation.'; // display an error message
          alert(this.errorMessage);
        }
      );
    }
  }
}
