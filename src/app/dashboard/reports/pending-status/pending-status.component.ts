import { Component, OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';
import { Chart, ChartData, ChartOptions } from 'chart.js';
import * as _ from 'lodash';
import { NgxSpinnerService } from 'ngx-spinner';
import { AuditPlanService } from 'src/app/shared/services/audit-plan/audit-plan.service';
import { EmployeeMasterService } from 'src/app/shared/services/employee-master/employee-master.service';
import { ReportService } from 'src/app/shared/services/report/report.service';
import { SwalService } from 'src/app/shared/services/swal.service';
import { dataConstants } from 'src/app/shared/constants/dataConstants';

@Component({
  selector: 'app-pending-status',
  templateUrl: './pending-status.component.html',
  styleUrls: ['./pending-status.component.css']
})
export class PendingStatusComponent implements OnInit {
  selectedActionFilter = 'year';
  salesData: ChartData<'bar'> = {
    labels: [],
    datasets: [],
  };
  auditDate: any;
  todate: any;
  selectedFilter = 'vendor';
  fiscalYearValue:any;
  fiscalYearArr:any=[];
  fromYear:any;
  fromYearFis:any;
  toYear:any;
  toYearFis:any;
  monthDropDown: any = [];
  monthDropDownValue: any ='';
  data:any=[];
  commodity:any;
  vendorId:any;
  numberOfDefect:any=0;
  totalScore:any=0;
  vendorCategoryId:any;
  category:any;
  vendorObj:any=[];
  yearLabels:any=[];
  labels:any=[];
  reportPending:any=[];
  reviewPending:any=[];
  reportReleased:any=[];
  categoryObj:any=[
    {name:'Red',value:'red'},{name:'Yellow',value:'yellow'},{name:'Green',value:'green'}
  ]
  vendorcategoryObj:any=[];
  actionPlanData: ChartData<'bar'> = {
    labels: [
      'Report Pending',
      'Review Pending',
      'Report Released'],
    datasets: [],
  };

  actionPlanOptions: ChartOptions = {
    responsive: true,
    plugins: {
      title: {
        display: true,
        text: 'Report Pending Status',
      },
      tooltip: {
        enabled: true
      }
    },
    animation: {
      duration: 2000
    },
    scales: {
      xAxes: {
        stacked: true
      },
      yAxes: {
        ticks: {
          // Include a dollar sign in the ticks
          callback(this, tickValue) {
            return tickValue
          },
        },
        stacked: true
      }
    }
  };

  constructor(
    private SpinnerService: NgxSpinnerService,
    private _swalService: SwalService,
    private auditPlanService: AuditPlanService,
    private reportService: ReportService,
    private employeeService: EmployeeMasterService,
    private datepipe:DatePipe
  ) { }

  ngOnInit(): void {
    this.monthDropDown = dataConstants.monthList;
    this.getfiscalData();
  }

  getData(payload: any) {
    this.SpinnerService.show();
    this.reportPending = [];
    this.reviewPending = [];
    this.reportReleased = []
    this.reportService.getAuditPendingStatus(payload).subscribe({
      next: (res: any) => {
        this.data = res;
        this.data.forEach((x:any)=>{
          this.reportPending.push(x.reportPending)
          this.reviewPending.push(x.reviewPending)
          this.reportReleased.push(x.reportReleased)
        });
        this.labels = _.map(this.data, 'finYear');
        var data = [this.reportPending.reduce(function (acc: any, cur: any) { return acc + cur; }),
          this.reviewPending.reduce(function (acc: any, cur: any) { return acc + cur; }),
          this.reportReleased.reduce(function (acc: any, cur: any) { return acc + cur; })]
        this.actionPlanData = {
          labels: [
            'Report Pending',
            'Review Pending',
            'Report Released'],
          datasets: [
            { label: '', data: data, backgroundColor: ['rgb(46 117 182)', 'rgb(0 32 96)', 'rgb(255 102 0)'], hoverBackgroundColor: ['rgb(46 117 182)', 'rgb(0 32 96)', 'rgb(255 102 0)'] }],
        };
        this.SpinnerService.hide();
      },
      error: (err: any) => {
        this.SpinnerService.hide();
        this._swalService.errorMessageBox(err.message);
      }
    });
  }

  searchVendor(elem: any) {
    if (elem && elem.length > 1) {
      this.SpinnerService.show();
      const data = {
        code: elem,
        rolename: 'Vendor'
      }
      this.employeeService.getUsersByRoleId(data).subscribe({
        next: (res) => {
          if (res) {
            this.vendorObj = res;
            this.SpinnerService.hide();
          }
        },
        error: (e) => {
          console.error(e);
          this.SpinnerService.hide();
        },
      });
    }
    else {
      this.vendorObj = [];
    }
  }

  resetForm() {
    this.totalScore = 0;
    this.vendorCategoryId = null;
    this.numberOfDefect = 0;
    /*  this.category=null */
  }

  reloadDatawithFilter() {
    let year= parseInt(this.fiscalYearValue);
    this.fromYearFis = parseInt(this.fromYear) + 1;
    this.toYearFis = parseInt(this.toYear) + 1;
    let from = new Date(year, 3, 1);
    let to =  new Date(year+1,2,31);

    var payload = {
      finAuditFromDate :  from.getFullYear().toString() != 'NaN' ? this.datepipe.transform(from,'yyyy-MM-dd') : null,
      finAuditToDate: to.getFullYear().toString() != 'NaN' ?  this.datepipe.transform(to,'yyyy-MM-dd') : null,
      month: this.monthDropDownValue ? parseInt(this.monthDropDownValue) : null,
      vendorId: this.vendorId,
      auditDate: this.auditDate
    };
    
    this.getData(payload)
  }

  getfiscalData(){
    let currentYear = new Date().getFullYear() - 5;
    this.fiscalYearArr = [];
    for (let index = 0; index < 10; index++) {
     
      this.fiscalYearArr.push({text : currentYear + '-' +  (currentYear+1), id:currentYear,  });
      currentYear++;
     
    }
  }

}
