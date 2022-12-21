import { Component, OnInit } from '@angular/core';
import { ChartData, ChartOptions } from 'chart.js';
import * as _ from 'lodash';
import { NgxSpinnerService } from 'ngx-spinner';
import { dataConstants } from 'src/app/shared/constants/dataConstants';
import { EmployeeMasterService } from 'src/app/shared/services/employee-master/employee-master.service';
import { MessageService } from 'src/app/shared/services/message.service';
import { ReportService } from 'src/app/shared/services/report/report.service';
import { SwalService } from 'src/app/shared/services/swal.service';

@Component({
  selector: 'app-action-plan-vendor',
  templateUrl: './action-plan-vendor.component.html',
  styleUrls: ['./action-plan-vendor.component.css']
})
export class ActionPlanVendorComponent implements OnInit {
  selectedActionFilter = 'year';
  labels:any= [{label:'Total Audited Vendors'}, {label:'Action Plan Received'}, {label:'Action Plan Pending'}, {label:'All Observations Closed'}, {label:'Observation closure Pending (Even One)'}, {label:'Verification Done'}, {label:'Verification Pending'}];
  salesData: ChartData<'bar'> = {
    labels: [],
    datasets: [],
  };
  newlabels:any=[];
/*   actionPlanData: ChartData<'bar'> = {
    labels: ['Total Audited Vendors', 'Action Plan Received', 'Action Plan Pending', 'All Observations Closed', 'Observation closure Pending (Even One)', 'Verification Done', 'Verification Pending'],
    datasets: [
      { label: 'No of Vendors', data: [30,20,10,10,10,8,2], backgroundColor:['rgb(127 127 127)','rgb(0 32 96)','rgb(0 32 96)','rgb(46 117 182)','rgb(46 117 182)', 'rgb(47 85 151)','rgb(47 85 151)'], hoverBackgroundColor:['rgb(127 127 127)','rgb(0 32 96)','rgb(0 32 96)','rgb(46 117 182)','rgb(46 117 182)', 'rgb(47 85 151)','rgb(47 85 151)'] },
    ],
  }; */
  auditDate: any;
  todate: any;
  yearDropDown: any = [];
  yearDropDownValue: any ='';
  monthDropDown: any = [];
  monthDropDownValue: any ='';
  maxDate = new Date();
  auditorId:any;
  auditorObj:any=[]
  actionPlanOptions: ChartOptions = {
    responsive: true,
    plugins: {
      title: {
        display: true,
        text: 'Action Plan / Evidence PPT Pending/ Verification Pending',
      },
    },
  };
  data:any=[];
  auditorList:any=[];
  totalAudits:any=[];
  received:any=[];
  pending:any=[];
  closed:any=[];
  closurePending:any=[];
  verifyDone:any=[];
  verifyPending:any=[];

  constructor(
    private _swalService: SwalService,
    private reportService: ReportService,
    private messageService: MessageService,
    private employeeService: EmployeeMasterService,
    private SpinnerService: NgxSpinnerService
  ) { }

  ngOnInit(): void {
    this.monthDropDown = dataConstants.monthList;
    this.getYearDropdownData();
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

  getData(payload: any) {
    var vMsg = "";
    if (!payload.year) {
      vMsg += "Please Select Year.";
    }
    if (vMsg.length > 0) {
      this._swalService.infoMessageBox(vMsg);
      return;
    }
    else {
      this.SpinnerService.show();
      let data: any = {
        year: payload.year,
      };
      if (payload.month) {
        data.month = payload.month
      }
      if (payload.auditorId) {
        data.auditorId = payload.auditorId
      }
      if (payload.auditDate) {
        data.auditDate = payload.auditDate
      }
      this.reportService.getActionPlanVendorWise(data).subscribe({
        next: (res: any) => {
          this.data = res;
          this.newlabels = _.map(this.labels,'label')
          this.totalAudits = _.map(this.data, 'totalAudit');
          this.received = _.map(this.data, 'actionPlanReceived');
          this.pending = _.map(this.data, 'actionPlanPending');
          this.closed = _.map(this.data, 'observationClosed');
          this.closurePending = _.map(this.data, 'observationPending');
          this.verifyDone = _.map(this.data, 'verificationDone');;
          this.verifyPending = _.map(this.data, 'verificationPending'); 

          this.salesData = {
            labels: this.newlabels,
            datasets: [
              { label: 'No of Vendors', data: [this.totalAudits,this.received,this.pending,this.closed,this.closurePending,this.verifyDone,this.verifyPending], backgroundColor:['rgb(127 127 127)','rgb(0 32 96)','rgb(0 32 96)','rgb(46 117 182)','rgb(46 117 182)', 'rgb(47 85 151)','rgb(47 85 151)'], hoverBackgroundColor:['rgb(127 127 127)','rgb(0 32 96)','rgb(0 32 96)','rgb(46 117 182)','rgb(46 117 182)', 'rgb(47 85 151)','rgb(47 85 151)'] },
            ], 
          }; 
          this.SpinnerService.hide();
        },
        error: (err: any) => {
          this.SpinnerService.hide();
          this._swalService.errorMessageBox(err.message);
        }
      });
    }
  }

  resetForm() {
    this.yearDropDownValue = null;
    this.monthDropDownValue = null;
    this.auditorId = null;
    this.auditDate =null;
  }

  reloadDatawithFilter() {
    console.log("this.auditorId",this.auditorId,this.yearDropDownValue,this.monthDropDownValue)
    var payload = {
      year: this.yearDropDownValue ? parseInt(this.yearDropDownValue) : null,
      month: this.monthDropDownValue ? parseInt(this.monthDropDownValue) : null,
      auditorId: this.auditorId,
      auditDate: this.auditDate
    };
    this.getData(payload);
  }

  getUsers() {
    this.SpinnerService.show();
    const data = {
      roleId: "87161db0-fadc-40f1-a9e0-b9c62e70583b",
      roleName: "Auditor"
    };
    this.employeeService.getUsersByRoleId(data).subscribe({
      next: (res) => {
        if (res) {
          this.auditorObj = res;
          this.SpinnerService.hide();
        }
      },
      error: (e) => {
        console.error(e);
        this.SpinnerService.hide();
      },
    });
  }

  searchAuditor(elem: any) {
    if (elem && elem.length > 1) {
      this.SpinnerService.show();
      const data = {
        name: elem,
        rolename: 'Auditor'
      }
      this.employeeService.getUsersByRoleId(data).subscribe({
        next: (res) => {
          if (res) {
            this.auditorList = res.map((i:any) => { i.code = i.name + ' (' + i.code + ')'; return i; });
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
      this.auditorList = [];
    }
  }

  getYearDropdownData(){
    let currentYear = new Date().getFullYear() - 3;
    let yearArr = [];
    yearArr.push({text : currentYear, value : currentYear});
    for (let index = 0; index < 19; index++) {
      const year = currentYear + 1 + index;
      if(year <= new Date().getFullYear()){
        yearArr.push({text : year, value : year});
      }
    }
    this.yearDropDown = yearArr;
    this.yearDropDownValue = new Date().getFullYear();
  }
}
