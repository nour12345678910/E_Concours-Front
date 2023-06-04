import { Component, OnInit } from '@angular/core';
import { ActionHistorique } from 'src/app/models/action-historique';
import { ActionHistoriqueServiceService } from 'src/app/services/action-historique-service.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-historique',
  templateUrl: './historique.component.html',
  styleUrls: ['./historique.component.css']
})
export class HistoriqueComponent implements OnInit {
  actionLogs: ActionHistorique[] = [];
  searchDate: string;
  filteredActionLogs: any[];

  constructor(private actionLogService: ActionHistoriqueServiceService) { }

  ngOnInit(): void {
    this.loadActionLogs();
  }

  loadActionLogs(): void {
    this.actionLogService.getActionLogs().subscribe(
      logs => {
        this.actionLogs = logs;
        this.sortLogsByDateTime();

      },
      error => {
        console.error('Failed to load action logs:', error);
      }
    );
  }



  sortLogsByDateTime() {
    const currentDate = new Date();
    this.actionLogs.sort((a, b) => {
      const dateA = new Date(a.date);
      const dateB = new Date(b.date);
      return dateB.getTime() - dateA.getTime();
    });
    this.actionLogs = this.actionLogs.filter(log => new Date(log.date) <= currentDate);
  }













  deleteLog(id: number) {
    Swal.fire({
      title: 'تأكيد',
      text: 'هل أنت متأكد من رغبتك في حذف هذا الاختبار؟',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'نعم',
      cancelButtonText: 'لا',
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33'
    }).then((result) => {
      if (result.value) {
        this.actionLogService.deleteHistoriqueConcours(id).subscribe(
          () => {
            this.actionLogs = this.actionLogs.filter(p => p.id !== id);
            console.log(`تم حذف الاختبار برقم ${id} بنجاح`);
          },
          error => console.error(error)
        );
      }
    });


  }






}


