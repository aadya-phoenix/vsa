import { Component, OnInit } from '@angular/core';
import { ChartData, ChartOptions } from 'chart.js';

@Component({
  selector: 'app-vendor-dist-status',
  templateUrl: './vendor-dist-status.component.html',
  styleUrls: ['./vendor-dist-status.component.css']
})
export class VendorDistStatusComponent implements OnInit {

  
  vendorDistData: ChartData<'bar'> = {
    labels: ['FY 18-19', 'FY 19-20', 'FY 20-21', 'FY 21-22', 'FY 22-23'],
    datasets: [
      { label: 'Green', data: [40, 30, 50, 40, 30], stack: '0', backgroundColor: 'rgb(75 192 192)', borderColor: 'rgb(75 192 192)', hoverBackgroundColor: 'rgb(75 192 192)', hoverBorderColor: 'rgb(75 192 192)' },
      { label: 'Yellow', data: [20, 40, 20, 30, 20], stack: '0', backgroundColor: 'rgb(255, 205, 86)', borderColor: 'rgb(255, 205, 86)', hoverBackgroundColor: 'rgb(255, 205, 86)', hoverBorderColor: 'rgb(255, 205, 86)' },
      { label: 'Red', data: [20, 20, 30, 50, 40], stack: '0', backgroundColor: 'rgb(255 99 132)', borderColor: 'rgb(255 99 132)', hoverBackgroundColor: 'rgb(255 99 132)', hoverBorderColor: 'rgb(255 99 132)' },
    ],
  };

  vendorDistOptions: ChartOptions = {
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
        text: 'Vendor Distribution Status',
      },
    },
  };

  pieVSACateOptions: ChartOptions = {
    responsive: true,
    plugins: {
      title: {
        display: true,
        text: 'VSA Category- Overall',
      },
    },
  };
  pieVSACateData = {
    labels: [
      'GREEN',
      'Yellow',
      'RED'
    ],
    datasets: [{
      label: 'VSA Category- Overall',
      data: [300, 50, 20],
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
