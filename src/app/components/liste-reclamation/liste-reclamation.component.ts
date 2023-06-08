import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Reclamation } from 'src/app/models/Reclamation';
import { ActionHistoriqueServiceService } from 'src/app/services/action-historique-service.service';
import { ReclamationService } from 'src/app/services/reclamation.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-liste-reclamation',
  templateUrl: './liste-reclamation.component.html',
  styleUrls: ['./liste-reclamation.component.css']
})
export class ListeReclamationComponent implements OnInit {

  reclamation:Reclamation[]
constructor(private rs:ReclamationService,private router:Router,
  private actionHistoriqueService:ActionHistoriqueServiceService){}
  ngOnInit(): void {
this.rs.getReclamation().subscribe(
  (reclamation)=>{this.reclamation=reclamation}
)

  }

  deleteQuestion(id: number) {
    Swal.fire({
      title: 'تأكيد الحذف',
      text: 'هل أنت متأكد من رغبتك في حذف هذا السؤال؟',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'نعم',
      cancelButtonText: 'لا',
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33'
    }).then((result) => {
      if (result.value) {
        this.rs.deleteReclamation(id).subscribe(
          () => {
            this.reclamation = this.reclamation.filter(p => p.id !== id);
            console.log(`تم حذف السؤال برقم ${id} بنجاح`);
          },
          error => console.error(error)
        );
      }
    });


    this.actionHistoriqueService.logActionHistorique('الحذف', id).subscribe(
      response => {
        console.log('Action logged successfully');
      },
      error => {
        console.error('Failed to log action:', error);
      }
    );
  }


  openDialog(description: string) {
    Swal.fire({
      title:'محتوى التساؤل ',
      html: `<div style="font-size: 35px;">${description}</div>`,
      confirmButtonText: 'حسنًا',
      customClass: {
        container: 'custom-swal-container',
      },
    });
  }


}
