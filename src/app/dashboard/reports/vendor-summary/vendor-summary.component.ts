import { Component, OnInit } from '@angular/core';
import { ChartData, ChartOptions } from 'chart.js';

@Component({
  selector: 'app-vendor-summary',
  templateUrl: './vendor-summary.component.html',
  styleUrls: ['./vendor-summary.component.css']
})
export class VendorSummaryComponent implements OnInit {

  selectedFilter = 'vendor';
  
  salesData: ChartData<'bar'> = {
    labels: ['FY 18-19', 'FY 19-20', 'FY 20-21', 'FY 21-22', 'FY 22-23'],
    datasets: [
      { label: 'Green', data: [70,75,80,82,84], backgroundColor: 'rgb(0 176 80)', borderColor: 'rgb(0 176 80)', hoverBackgroundColor: 'rgb(0 176 80)', hoverBorderColor: 'rgb(0 176 80)' },
      { label: 'Yellow', data: [60,70,75,75,90],  backgroundColor: 'rgb(255 153 0)', borderColor: 'rgb(255 153 0)', hoverBackgroundColor: 'rgb(255 153 0)', hoverBorderColor: 'rgb(255 153 0)' },
      { label: 'Red', data: [70,75,80,80,80],  backgroundColor: 'rgb(255 0 0)', borderColor: 'rgb(255 0 0)', hoverBackgroundColor: 'rgb(255 0 0)', hoverBorderColor: 'rgb(255 0 0)' },
    ],
  };

  chartOptions: ChartOptions = {
    responsive: true,
    plugins: {
      title: {
        display: true,
        text: 'Vendor Summary',
      },
    },
  };
  
  constructor() { }

  ngOnInit(): void {
  }
  onFilterSelected() {
    
  }

}
