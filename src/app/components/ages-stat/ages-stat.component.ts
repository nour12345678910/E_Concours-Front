import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Chart, ChartData, ChartOptions } from 'chart.js/auto';
import { CandidatServiceService } from 'src/app/services/candidat-service.service';

@Component({
  selector: 'app-ages-stat',
  templateUrl: './ages-stat.component.html',
  styleUrls: ['./ages-stat.component.css']
})
export class AgesStatComponent implements OnInit {
  candidateAges: number[];

  constructor(private http: HttpClient,private cs:CandidatServiceService) { }

  ngOnInit(): void {
    this.cs.getCandidateAges().subscribe(data => {
      this.candidateAges = data;
      this.createChart();
    });
  }

  createChart(): void {
    const histogramData: ChartData = this.createHistogramData();
    const chartOptions: ChartOptions = this.createChartOptions();
    const chart = new Chart('candidateAgesChart', {
      type: 'bar',
      data: histogramData,
      options: chartOptions
    });
  }

  createHistogramData(): ChartData {
    const histogram = new Array(101).fill(0);
    for (const age of this.candidateAges) {
      if (age >= 0 && age <= 100) {
        histogram[age]++;
      }
    }
    const histogramData: ChartData = {
      labels: Array.from({length: 101}, (_, i) => i.toString()),
      datasets: [{
        label: 'Age Distribution of Candidates',
        data: histogram,
        backgroundColor: '#2196F3',
        borderWidth: 1
      }]
    };
    return histogramData;
  }

  createChartOptions(): ChartOptions {
    const chartOptions: ChartOptions = {
      scales: {
        y: {
          title: {
            display: true,
            text: 'عدد المرشحين'
          },
          ticks: {
            align: 'end',
            mirror: true
          }
        },
        x: {
          title: {
            display: true,
            text: 'العمر'
          },
          ticks: {
            align: 'end'
          }
        }
      }
    };
    return chartOptions;
  }

}
