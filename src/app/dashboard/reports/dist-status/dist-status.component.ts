import { Component, OnInit } from '@angular/core';
import { ChartData, ChartOptions } from 'chart.js';

@Component({
  selector: 'app-dist-status',
  templateUrl: './dist-status.component.html',
  styleUrls: ['./dist-status.component.css']
})
export class DistStatusComponent implements OnInit {

  monthAuditData: ChartData<'bar'> = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May'],
    datasets: [
      { label: 'Green', data: [4, 3, 5, 4, 3], stack: '0', backgroundColor: 'rgb(75 192 192)', borderColor: 'rgb(75 192 192)', hoverBackgroundColor: 'rgb(75 192 192)', hoverBorderColor: 'rgb(75 192 192)' },
      { label: 'Yellow', data: [2, 4, 2, 3, 2], stack: '0', backgroundColor: 'rgb(255, 205, 86)', borderColor: 'rgb(255, 205, 86)', hoverBackgroundColor: 'rgb(255, 205, 86)', hoverBorderColor: 'rgb(255, 205, 86)' },
      { label: 'Red', data: [2, 2, 3, 5, 4], stack: '0', backgroundColor: 'rgb(255 99 132)', borderColor: 'rgb(255 99 132)', hoverBackgroundColor: 'rgb(255 99 132)', hoverBorderColor: 'rgb(255 99 132)' },
    ],
  };

  monthChartOptions: ChartOptions = {
    responsive: true,
    scales: {
      x: {
        stacked: true
      },
      y: {
        stacked: true
      }
    },
    plugins: {
      title: {
        display: true,
        text: 'Monthly Audit Status-Green-Yellow-Red',
      },
    },
  };


  pieChartOptions: ChartOptions = {
    responsive: true,
    plugins: {
      title: {
        display: true,
        text: 'VSA Category-Current Year',
      },
    },
  };
  pieChartData = {
    labels: [
      'GREEN',
      'Yellow',
      'RED'
    ],
    datasets: [{
      label: 'VSA Category-Current Year',
      data: [300, 50, 100],
      backgroundColor: [
        'rgb(75 192 192)',
        'rgb(255, 205, 86)',
        'rgb(255 99 132)',
      ],
      hoverBackgroundColor: [
        'rgb(75 192 192)',
        'rgb(255, 205, 86)',
        'rgb(255 99 132)',
      ],
      hoverOffset: 4
    }]
  }

  
  constructor() { }

  ngOnInit(): void {
  }

}
