import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ChartData, ChartOptions } from 'chart.js';
import { dataConstants } from '../shared/constants/dataConstants';
import { AuditExecutionService } from '../shared/services/audit-execution/audit-execution.service';
import { AuditPlanService } from '../shared/services/audit-plan/audit-plan.service';
import { AuthenticationService } from '../shared/services/auth/authentication.service';
import { CommonService } from '../shared/services/common/common.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  isVendor =false;
  getUserrole: any;
  Vendor = dataConstants.Vendor;
  counters:any;
  constructor(
    private authService: AuthenticationService,
    private auditPlanService:AuditPlanService,
    private auditExecuteService:AuditExecutionService,
    private commonService: CommonService,
    private router:Router
  ) {
    this.getUserrole = this.authService.getRolefromlocal();

    this.isVendor = this.getUserrole.RoleId === this.Vendor.RoleId && this.getUserrole.role === this.Vendor.role; 
  }
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
  pieChartOptions1: ChartOptions = {
    responsive: true,
    plugins: {
      title: {
        display: true,
        text: 'VSA Category-Current Year',
      },
    },
  };
  pieChartData1 = {
    labels: [
      'Final',
      'Provisional',
     
    ],
    datasets: [{
      label: 'VSA Category-Current Year',
      data: [300, 50],
      backgroundColor: [
        'rgb(75 192 192)',
        'rgb(255, 205, 86)',
        
      ],
      hoverBackgroundColor: [
        'rgb(75 192 192)',
        'rgb(255, 205, 86)',
        
      ],
      hoverOffset: 4
    }]
  }
  actionPlanData: ChartData<'bar'> = {
    labels: ['Total Audit Planned', 'Action Audit Done', 'Released Report', 'Action Plan Approved', '80% Above Closure'],
    datasets: [
      { label: 'No of ', data: [30,20,10,10,10,8,2], backgroundColor:['rgb(127 127 127)','rgb(0 32 96)','rgb(0 32 96)','rgb(46 117 182)','rgb(46 117 182)'] },
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
  ngOnInit(): void {
    this.getStatusCount();
  }

  getStatusCount(){
    this.commonService.showLoading();
    this.auditExecuteService.getStatusCount().subscribe({
      next:(res: any) => {
        this.counters = res;
        this.commonService.hideLoading();
      },
      error:(err:any) =>  {
        console.error(err);
        this.commonService.hideLoading();
      }
    });  
  }

}
