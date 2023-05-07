import { Component, OnInit } from '@angular/core';
import Chart from 'chart.js/auto';
import { CandidatServiceService } from 'src/app/services/candidat-service.service';

@Component({
  selector: 'app-stat-sex',
  templateUrl: './stat-sex.component.html',
  styleUrls: ['./stat-sex.component.css']
})
export class StatSexComponent implements OnInit {
  chart: any;

  constructor(private candidatService: CandidatServiceService) { }

  ngOnInit(): void {
    this.candidatService.getCandidateSexes().subscribe((data: any) => {
      const labels = Object.keys(data);
      const values = Object.values(data);

      this.chart = new Chart('canvas', {
        type: 'pie',
        data: {
          labels: labels,
          datasets: [{
            data: values,
            backgroundColor: ['#FF6384', '#36A2EB']
          }]
        },
        options: {
          responsive: true
        }
      });
    });
  }

}
