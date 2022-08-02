import { Component, OnInit } from '@angular/core';
import { ChartData, ChartOptions } from 'chart.js';

@Component({
  selector: 'app-average-defect-supplier',
  templateUrl: './average-defect-supplier.component.html',
  styleUrls: ['./average-defect-supplier.component.css']
})
export class AverageDefectSupplierComponent implements OnInit {

  selectedFilter = 'month';
  
  salesData: ChartData<'bar'> = {
    labels: ['Green', 'Yellow', 'Red'],
    datasets: [
      { label: '', data: [40, 50, 30], backgroundColor: 'rgb(0 32 96)', borderColor: 'rgb(0 32 96)', hoverBackgroundColor: 'rgb(0 32 96)', hoverBorderColor: 'rgb(0 32 96)' },
      { label: '', data: [2,4,8],  backgroundColor: 'rgb(47 85 151)', borderColor: 'rgb(47 85 151)', hoverBackgroundColor: 'rgb(47 85 151)', hoverBorderColor: 'rgb(47 85 151)' },
    ],
  };

  chartOptions: ChartOptions = {
    responsive: true,
    plugins: {
      title: {
        display: true,
        text: 'Average Defect/ Supplier/ month-Status',
      },
    },
  };
  
  constructor() { }

  ngOnInit(): void {
  }
  onFilterSelected() {
    
  }

}
