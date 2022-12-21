import { Component, OnInit } from '@angular/core';
import { Chart, ChartData, ChartOptions } from 'chart.js';
import * as _ from 'lodash';

import { NgxSpinnerService } from 'ngx-spinner';
import { AuditPlanService } from 'src/app/shared/services/audit-plan/audit-plan.service';
import { EmployeeMasterService } from 'src/app/shared/services/employee-master/employee-master.service';
import { ReportService } from 'src/app/shared/services/report/report.service';
import { SwalService } from 'src/app/shared/services/swal.service';

@Component({
  selector: 'app-vendor-summary',
  templateUrl: './vendor-summary.component.html',
  styleUrls: ['./vendor-summary.component.css']
})
export class VendorSummaryComponent implements OnInit {
  salesData: ChartData<'bar'> = {
    labels: [],
    datasets: [],
  };
  selectedFilter = 'vendor';
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
  red:any=[];
  yellow:any=[];
  green:any=[];
  categoryObj:any=[
    {name:'Red',value:'red'},{name:'Yellow',value:'yellow'},{name:'Green',value:'green'}
  ]
  vendorcategoryObj:any=[];
  /* salesData: ChartData<'bar'> = {
    labels: ['FY 18-19', 'FY 19-20', 'FY 20-21', 'FY 21-22', 'FY 22-23'],
    datasets: [
      { label: 'Green', data: [70,75,80,82,84], backgroundColor: 'rgb(0 176 80)', borderColor: 'rgb(0 176 80)', hoverBackgroundColor: 'rgb(0 176 80)', hoverBorderColor: 'rgb(0 176 80)' },
      { label: 'Yellow', data: [60,70,75,75,90],  backgroundColor: 'rgb(255 153 0)', borderColor: 'rgb(255 153 0)', hoverBackgroundColor: 'rgb(255 153 0)', hoverBorderColor: 'rgb(255 153 0)' },
      { label: 'Red', data: [70,75,80,80,80],  backgroundColor: 'rgb(255 0 0)', borderColor: 'rgb(255 0 0)', hoverBackgroundColor: 'rgb(255 0 0)', hoverBorderColor: 'rgb(255 0 0)' },
    ],
  }; */

  chartOptions: ChartOptions = {
    responsive: true,
    maintainAspectRatio: true,
    plugins: {
      title: {
        display: true,
        text: 'Vendor Summary'
      },
    },
    scales:{
      y:{
        grid:{
          display: false
        },
        title:{ text:"NO. OF VENDORS", display:true},
      },
      x:{
        grid:{
          display: false
        },
        title:{ text:"Audit Year", display:true},
      }
    },
    animation: {
      duration:1,
      onComplete: function(e){
        var chartInstance = e.chart,
        ctx = chartInstance.ctx;
        ctx.textAlign = 'center';
        ctx.textBaseline = 'bottom';
        this.data.datasets.forEach(function(dataset:any, i) {
          var meta = chartInstance.getDatasetMeta(i);
            meta.data.forEach(function(bar:any, index:number) {
              if (dataset.data && dataset.data[index] > 0) {
                  var data = dataset.data[index];
                  ctx.fillText(data, bar.x, bar.y);
              }
          });
        });
      }
    },
  };
  
  constructor(
    private SpinnerService: NgxSpinnerService,
    private _swalService: SwalService,
    private auditPlanService: AuditPlanService,
    private reportService: ReportService,
    private employeeService: EmployeeMasterService,
  ) { }

  ngOnInit(): void {
    this.getVendorCategory();
  }
  onFilterSelected() {
    
  }

  getData(payload:any) {
    this.red=[];
    this.green=[];
    this.yellow=[];
    this.SpinnerService.show();
    this.reportService.getVendorSummaryYearwise(payload).subscribe({
      next: (res: any) => {
       this.data = res;
       this.data.forEach((x:any)=>{
        if (x.status == 'Red'){
          this.red.push(x.totalSupplier
         )}
         if (x.status == 'Yellow'){
          this.yellow.push(x.totalSupplier
         )}
         if (x.status == 'Green'){
          this.green.push(x.totalSupplier
         )}
       })
       this.labels =  _.map(this.data, 'finYear');
       this.yearLabels = this.labels.filter(this.onlyUnique);
       this.salesData  = {
        labels:this.yearLabels,
        datasets: [
          { label: 'Green', data: this.green, backgroundColor: 'rgb(0 176 80)', borderColor: 'rgb(0 176 80)', hoverBackgroundColor: 'rgb(0 176 80)', hoverBorderColor: 'rgb(0 176 80)' },
          { label: 'Yellow', data: this.yellow,  backgroundColor: 'rgb(255 153 0)', borderColor: 'rgb(255 153 0)', hoverBackgroundColor: 'rgb(255 153 0)', hoverBorderColor: 'rgb(255 153 0)' },
          { label: 'Red', data: this.red,  backgroundColor: 'rgb(255 0 0)', borderColor: 'rgb(255 0 0)', hoverBackgroundColor: 'rgb(255 0 0)', hoverBorderColor: 'rgb(255 0 0)' },
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

  getVendorCategory() {
    this.SpinnerService.show();
    this.auditPlanService.getVendorCategory().subscribe({
      next: (res) => {
        if (res) {
          this.vendorcategoryObj = res;
          this.SpinnerService.hide();
        }
      },
      error: (e) => {
        console.error(e);
        this.SpinnerService.hide();
      },
    });
  }

  resetForm() {
     this.totalScore=0;
     this.vendorCategoryId=null;
    this.numberOfDefect=0;
   /*  this.category=null */
  }

  reloadDatawithFilter() {
    var payload = {
   /*    vendorId :  this.vendorId, */
      totalScore:  parseInt(this.totalScore),
      vendorCategoryId:  this.vendorCategoryId,
      numberOfDefect: parseInt(this.numberOfDefect),
     /*  category:  this.category */
   };
    this.getData(payload);
  }

  getVendor(event: any) {
   /*  let vendorId = event?.id;
    this.vendorId.setValue(vendorId);
    vendorId ? this.getLocation(vendorId) :  this.createPlanForm.controls['locationId'].setValue('');
    vendorEmail ?  this.createPlanForm.controls['auditeeEmail'].setValue(vendorEmail): this.createPlanForm.controls['auditeeEmail'].setValue(''); */
   }

   onlyUnique(value:any, index:number, self:any) {
    return self.indexOf(value) === index;
  }

}
