import { Component, OnInit } from '@angular/core';
import { HistoriqueReclamation } from 'src/app/models/historique-reclamation';
import { ActionHistoriqueServiceService } from 'src/app/services/action-historique-service.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-historique-reclamation',
  templateUrl: './historique-reclamation.component.html',
  styleUrls: ['./historique-reclamation.component.css']
})
export class HistoriqueReclamationComponent implements OnInit {
  actionLogsReclamation: HistoriqueReclamation[] = [];
  searchDate: string;
  filteredActionLogs: any[];
  constructor(private actionLogService: ActionHistoriqueServiceService) { }

  ngOnInit(): void {
    this.loadActionLogs();

  }

  loadActionLogs(): void {
    this.actionLogService.getActionLogsReclamation().subscribe(
      logs => {
        this.actionLogsReclamation = logs;
        this.sortLogsByDateTime();
      },
      error => {
        console.error('Failed to load action logs:', error);
      }
    );
  }

  sortLogsByDateTime() {
    const currentDate = new Date();
    this.actionLogsReclamation.sort((a, b) => {
      const dateA = new Date(a.date);
      const dateB = new Date(b.date);
      return dateB.getTime() - dateA.getTime();
    });
    this.actionLogsReclamation = this.actionLogsReclamation.filter(log => new Date(log.date) <= currentDate); // Filter logs with dates equal to or earlier than the current date
  }




  filterActionLogsByDate() {
    if (this.searchDate) {
      const searchTimestamp = new Date(this.searchDate).getTime();
      this.filteredActionLogs = this.actionLogsReclamation.filter(log => new Date(log.date).getTime() === searchTimestamp);
    } else {
      this.filteredActionLogs = this.actionLogsReclamation;
    }
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
      this.actionLogService.deleteHistoriqueReclamations(id).subscribe(
        () => {
          this.actionLogsReclamation = this.actionLogsReclamation.filter(p => p.id !== id);
          console.log(`تم حذف الاختبار برقم ${id} بنجاح`);
        },
        error => console.error(error)
      );
    }
  });


}

}
