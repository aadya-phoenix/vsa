import { Component, OnInit } from '@angular/core';
import { ChartData, ChartOptions } from 'chart.js';

@Component({
  selector: 'app-action-plan-observation',
  templateUrl: './action-plan-observation.component.html',
  styleUrls: ['./action-plan-observation.component.css']
})
export class ActionPlanObservationComponent implements OnInit {

  selectedActionFilter = 'year';
  actionPlanData: ChartData<'bar'> = {
    labels: [
      'Total Observation Raised',
      'Actction Plan Submitted',
      'Action Plan Pending',
      'Observation Closed',
      'Observation closure Pending',
      'Observation Exceeded Target Date',
      'Observation Verified by Auditor',
      'Observation verification pending'],
    datasets: [
      { label: 'No of Observation', data: [100,90,10,70,20,10,60,10], backgroundColor:['rgb(127 127 127)','rgb(0 32 96)','rgb(0 32 96)','rgb(46 117 182)','rgb(46 117 182)', 'rgb(47 85 151)','rgb(47 85 151)','rgb(0 32 96)'], hoverBackgroundColor:['rgb(127 127 127)','rgb(0 32 96)','rgb(0 32 96)','rgb(46 117 182)','rgb(46 117 182)', 'rgb(47 85 151)','rgb(47 85 151)','rgb(0 32 96)'] },
    ],
  };

  actionPlanOptions: ChartOptions = {
    responsive: true,
    plugins: {
      title: {
        display: true,
        text: 'Action Plan / Evidence PPT Pending/ Verification Pending',
      },
    },
  };
  constructor() { }

  ngOnInit(): void {
  }

  onFilterSelected() {
    // this.selectedFilter;
    // if (this.selectedFilter == 'month') {
    //   this.salesData = {
    //     labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May'],
    //     datasets: [
    //       { label: 'Plan', data: [500, 400, 350, 450, 650], stack: '0', backgroundColor: 'rgb(127 127 127)', borderColor: 'rgb(127 127 127)', hoverBackgroundColor: 'rgb(127 127 127)', hoverBorderColor: 'rgb(127 127 127)' },
    //       { label: 'Final', data: [200, 100, 400, 50, 90], stack: '1', backgroundColor: 'rgb(0 32 96)', borderColor: 'rgb(0 32 96)', hoverBackgroundColor: 'rgb(0 32 96)', hoverBorderColor: 'rgb(0 32 96)' },
    //       { label: 'Provisional', data: [1000, 1200, 1050, 2000, 500], stack: '1', backgroundColor: 'rgb(255 192 0)', borderColor: 'rgb(255 192 0)', hoverBackgroundColor: 'rgb(255 192 0)', hoverBorderColor: 'rgb(255 192 0)' },
    //     ],
    //   };
    // }
    // if (this.selectedFilter == 'year') {
    //   this.salesData = {
    //     labels: ['FY2018-19', 'FY2019-20', 'FY2020-21', 'FY2021-22', 'FY2022-23'],
    //     datasets: [
    //       { label: 'Plan', data: [50, 340, 300, 40, 50], stack: '0', backgroundColor: 'rgb(127 127 127)', borderColor: 'rgb(127 127 127)', hoverBackgroundColor: 'rgb(127 127 127)', hoverBorderColor: 'rgb(127 127 127)' },
    //       { label: 'Final', data: [250, 180, 450, 500, 80], stack: '1', backgroundColor: 'rgb(0 32 96)', borderColor: 'rgb(0 32 96)', hoverBackgroundColor: 'rgb(0 32 96)', hoverBorderColor: 'rgb(0 32 96)' },
    //       { label: 'Provisional', data: [100, 120, 150, 200, 20], stack: '1', backgroundColor: 'rgb(255 192 0)', borderColor: 'rgb(255 192 0)', hoverBackgroundColor: 'rgb(255 192 0)', hoverBorderColor: 'rgb(255 192 0)' },
    //     ],
    //   };
    // }
    // if (this.selectedFilter == 'location') {
    //   this.salesData = {
    //     labels: ['INDIA', 'USA', 'AUS', 'UK', 'CAN'],
    //     datasets: [
    //       { label: 'Plan', data: [200, 800, 210, 540, 870], stack: '0', backgroundColor: 'rgb(127 127 127)', borderColor: 'rgb(127 127 127)', hoverBackgroundColor: 'rgb(127 127 127)', hoverBorderColor: 'rgb(127 127 127)' },
    //       { label: 'Final', data: [100, 300, 40, 500, 100], stack: '1', backgroundColor: 'rgb(0 32 96)', borderColor: 'rgb(0 32 96)', hoverBackgroundColor: 'rgb(0 32 96)', hoverBorderColor: 'rgb(0 32 96)' },
    //       { label: 'Provisional', data: [150, 100, 105, 200, 50], stack: '1', backgroundColor: 'rgb(255 192 0)', borderColor: 'rgb(255 192 0)', hoverBackgroundColor: 'rgb(255 192 0)', hoverBorderColor: 'rgb(255 192 0)' },
    //     ],
    //   };
    // }
  }

}
