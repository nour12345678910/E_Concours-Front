import { Component, OnInit } from '@angular/core';
import { ReclamationService } from 'src/app/services/reclamation.service';
import { Reclamation } from 'src/app/models/Reclamation';
import { ActivatedRoute } from '@angular/router';
import { Response } from 'src/app/models/Response';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-reponse-contact',
  templateUrl: './reponse-contact.component.html',
  styleUrls: ['./reponse-contact.component.css']
})
export class ReponseContactComponent implements OnInit {
  response: Response=new Response();
  reclamation: Reclamation = new Reclamation();
  errorMessage: string;


  ngOnInit(): void {
  }

constructor(private rs:ReclamationService,private route:ActivatedRoute){}

submitForm() {
  // get the ID of the reclamation from the route parameter
  this.reclamation.id = +this.route.snapshot.paramMap.get('id');

  // create a new response object with the message entered by the user
  const response = new Response();
  response.message = this.response.message;

  // send the response to the server using the ReclamationService
  this.rs.sendMessage(this.reclamation.id, response)
  .subscribe(
    (reclamation) => {
      console.log('Response sent successfully:', reclamation);
      Swal.fire({
        title: `تم إرسال الرد بنجاح`,
        // text: 'تم إنشاء الحساب بنجاح',
        icon: 'success'
      });
    },
    (error) => {
      this.errorMessage = "An error occurred while sending the response.";
      console.error('An error occurred:', error);
    }
  );
}
}
