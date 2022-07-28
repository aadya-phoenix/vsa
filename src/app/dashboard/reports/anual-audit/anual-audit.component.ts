import { Component, OnInit } from '@angular/core';
import { ChartData, ChartOptions } from 'chart.js';

@Component({
  selector: 'app-anual-audit',
  templateUrl: './anual-audit.component.html',
  styleUrls: ['./anual-audit.component.css']
})
export class AnualAuditComponent implements OnInit {
  selectedFilter = 'month';
  salesData: ChartData<'bar'> = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May'],
    datasets: [
      { label: 'Plan', data: [500, 400, 350, 450, 650],  stack:'0', backgroundColor:'rgb(127 127 127)',borderColor:'rgb(127 127 127)', hoverBackgroundColor:'rgb(127 127 127)', hoverBorderColor:'rgb(127 127 127)' },
      { label: 'Final', data: [200, 100, 400, 50, 90],  stack:'1', backgroundColor:'rgb(0 32 96)',borderColor:'rgb(0 32 96)', hoverBackgroundColor:'rgb(0 32 96)', hoverBorderColor:'rgb(0 32 96)' },
      { label: 'Provisional', data: [1000, 1200, 1050, 2000, 500], stack:'1', backgroundColor:'rgb(255 192 0)',borderColor:'rgb(255 192 0)', hoverBackgroundColor:'rgb(255 192 0)', hoverBorderColor:'rgb(255 192 0)' },
    ],
  };

  chartOptions: ChartOptions = {
    responsive: true,
    plugins: {
      title: {
        display: true,
        text: 'Audit Plan vs Actual Conducted',
      },
    },
  };


  monthAuditData: ChartData<'bar'> = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May'],
    datasets: [
      { label: 'Green', data: [4, 3, 5, 4, 3] , stack:'0', backgroundColor:'rgb(75 192 192)',borderColor:'rgb(75 192 192)', hoverBackgroundColor:'rgb(75 192 192)', hoverBorderColor:'rgb(75 192 192)'},
      { label: 'Yellow', data: [2, 4, 2, 3, 2] , stack:'0', backgroundColor:'rgb(255, 205, 86)',borderColor:'rgb(255, 205, 86)', hoverBackgroundColor:'rgb(255, 205, 86)', hoverBorderColor:'rgb(255, 205, 86)'},
      { label: 'Red', data: [2, 2, 3, 5, 4] , stack:'0', backgroundColor:'rgb(255 99 132)',borderColor:'rgb(255 99 132)', hoverBackgroundColor:'rgb(255 99 132)', hoverBorderColor:'rgb(255 99 132)'},
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


  public pieChartOptions: ChartOptions = {
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

  onFilterSelected() {
    this.selectedFilter;
    if (this.selectedFilter == 'month') {
      this.salesData = {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May'],
        datasets: [
          { label: 'Plan', data: [500, 400, 350, 450, 650],  stack:'0', backgroundColor:'rgb(127 127 127)',borderColor:'rgb(127 127 127)', hoverBackgroundColor:'rgb(127 127 127)', hoverBorderColor:'rgb(127 127 127)' },
          { label: 'Final', data: [200, 100, 400, 50, 90],  stack:'1', backgroundColor:'rgb(0 32 96)',borderColor:'rgb(0 32 96)', hoverBackgroundColor:'rgb(0 32 96)', hoverBorderColor:'rgb(0 32 96)' },
          { label: 'Provisional', data: [1000, 1200, 1050, 2000, 500], stack:'1', backgroundColor:'rgb(255 192 0)',borderColor:'rgb(255 192 0)', hoverBackgroundColor:'rgb(255 192 0)', hoverBorderColor:'rgb(255 192 0)' },
        ],
      };
    }
    if (this.selectedFilter == 'year') {
      this.salesData = {
        labels: ['FY2018-19', 'FY2019-20', 'FY2020-21', 'FY2021-22', 'FY2022-23'],
        datasets: [
          { label: 'Plan', data: [50, 340, 300, 40, 50],  stack:'0', backgroundColor:'rgb(127 127 127)',borderColor:'rgb(127 127 127)', hoverBackgroundColor:'rgb(127 127 127)', hoverBorderColor:'rgb(127 127 127)'  },
          { label: 'Final', data: [250, 180, 450, 500, 80],  stack:'1', backgroundColor:'rgb(0 32 96)',borderColor:'rgb(0 32 96)', hoverBackgroundColor:'rgb(0 32 96)', hoverBorderColor:'rgb(0 32 96)' },
          { label: 'Provisional', data: [100, 120, 150, 200, 20], stack:'1', backgroundColor:'rgb(255 192 0)',borderColor:'rgb(255 192 0)', hoverBackgroundColor:'rgb(255 192 0)', hoverBorderColor:'rgb(255 192 0)'  },
        ],
      };
    }
    if (this.selectedFilter == 'location') {
      this.salesData = {
        labels: ['INDIA', 'USA', 'AUS', 'UK', 'CAN'],
        datasets: [
          { label: 'Plan', data: [200, 800, 210, 540, 870],  stack:'0', backgroundColor:'rgb(127 127 127)',borderColor:'rgb(127 127 127)', hoverBackgroundColor:'rgb(127 127 127)', hoverBorderColor:'rgb(127 127 127)'  },
          { label: 'Final', data: [100, 300, 40, 500, 100],  stack:'1', backgroundColor:'rgb(0 32 96)',borderColor:'rgb(0 32 96)', hoverBackgroundColor:'rgb(0 32 96)', hoverBorderColor:'rgb(0 32 96)' },
          { label: 'Provisional', data: [150, 100, 105, 200, 50], stack:'1', backgroundColor:'rgb(255 192 0)',borderColor:'rgb(255 192 0)', hoverBackgroundColor:'rgb(255 192 0)', hoverBorderColor:'rgb(255 192 0)'  },
        ],
      };
    }
  }

}
