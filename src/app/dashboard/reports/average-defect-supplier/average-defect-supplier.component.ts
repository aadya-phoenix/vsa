import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ChartData, ChartOptions } from 'chart.js';
import * as _ from 'lodash';
import { NgxSpinnerService } from 'ngx-spinner';
import { EmployeeMasterService } from 'src/app/shared/services/employee-master/employee-master.service';
import { MessageService } from 'src/app/shared/services/message.service';
import { ReportService } from 'src/app/shared/services/report/report.service';
import { SwalService } from 'src/app/shared/services/swal.service';

@Component({
  selector: 'app-average-defect-supplier',
  templateUrl: './average-defect-supplier.component.html',
  styleUrls: ['./average-defect-supplier.component.css']
})
export class AverageDefectSupplierComponent implements OnInit {

  
  sum:any=[];
  avg:any=[];
  
  fiscalYearValue:any;
  fiscalYearArr:any=[];
  fromYear:any;
  fromYearFis:any;
  toYear:any;
  toYearFis:any;
  data:any=[];
  tableData:any=[];
  lables:any=[];
  selectedFilter = 'month';

  salesData: ChartData<'bar'> = {
    labels: this.lables,
    datasets: [],
  };
  
 /*  salesData: ChartData<'bar'> = {
    labels: ['Green', 'Yellow', 'Red'],
    datasets: [
      { label: '', data: [40, 50, 30], backgroundColor: 'rgb(0 32 96)', borderColor: 'rgb(0 32 96)', hoverBackgroundColor: 'rgb(0 32 96)', hoverBorderColor: 'rgb(0 32 96)' },
      { label: '', data: [2,4,8],  backgroundColor: 'rgb(47 85 151)', borderColor: 'rgb(47 85 151)', hoverBackgroundColor: 'rgb(47 85 151)', hoverBorderColor: 'rgb(47 85 151)' },
    ],
  }; */

  chartOptions: ChartOptions = {
    responsive: true,
    plugins: {
      title: {
        display: true,
        text: 'Average Defect/ Supplier/ month-Status',
      },
    },
  };
  
  constructor(
    private _swalService: SwalService,
    private reportService: ReportService,
    private messageService: MessageService,
    private employeeService: EmployeeMasterService,
    private SpinnerService: NgxSpinnerService,
    private datepipe:DatePipe
  ) { }

  ngOnInit(): void {
    this.getfiscalData();
  }
  onFilterSelected() {
    
  }

  getData(payload:any) {
    this.sum=[];
    this.avg=[];

    this.reportService.getCategoryWiseDefects(payload).subscribe({
      next: (res: any) => {
        this.data = res;
        this.lables = _.map(this.data, 'status');
        this.data.forEach((x:any)=>{
          if (x.status == 'Green'){
            this.sum.push(x.sumOfDefects );
            this.avg.push(x.avgDefect);
          }
          if (x.status == 'Yellow'){
            this.sum.push(x.sumOfDefects );
            this.avg.push(x.avgDefect);
          }
          if (x.status == 'Red'){
            this.sum.push(x.sumOfDefects );
            this.avg.push(x.avgDefect);
          }
        });

   
        this.salesData = {
          labels: this.lables,
         
          datasets: [
            { label: '', data: this.sum, backgroundColor: 'rgb(0 32 96)', borderColor: 'rgb(0 32 96)', hoverBackgroundColor: 'rgb(0 32 96)', hoverBorderColor: 'rgb(0 32 96)' },
            { label: '', data: this.avg,  backgroundColor: 'rgb(47 85 151)', borderColor: 'rgb(47 85 151)', hoverBackgroundColor: 'rgb(47 85 151)', hoverBorderColor: 'rgb(47 85 151)' }
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

  resetForm() {
    this.fiscalYearValue = null;
    this.fromYear =null;
    this.fromYearFis=null;
    this.toYear=null;
    this.toYearFis=null;
  }

  reloadDatawithFilter() {
    let year= parseInt(this.fiscalYearValue);
    this.fromYearFis = parseInt(this.fromYear) + 1;
    this.toYearFis = parseInt(this.toYear) + 1;
    let from = new Date(year, 3, 1);
    let to =  new Date(year+1,2,31);

    let frYear= parseInt(this.fromYear);
    let fYear = new Date(frYear, 3, 1);
    let tYear =  new Date(frYear+1,2,31);

    let toYr= parseInt(this.toYear);
    let f1Year = new Date(toYr, 3, 1);
    let t1Year =  new Date(toYr+1,2,31);
    var payload = {
       finAuditFromDate :  this.datepipe.transform(from,'yyyy-MM-dd'),
       finAuditToDate: this.datepipe.transform(to,'yyyy-MM-dd'),
    }; 
    var payload1 = {
      finAuditFromDate :  this.datepipe.transform(from,'yyyy-MM-dd'),
      finAuditToDate: this.datepipe.transform(to,'yyyy-MM-dd'),
      finDefFromDate1:  this.datepipe.transform(fYear,'yyyy-MM-dd'),
      finDefToDate1: this.datepipe.transform(tYear,'yyyy-MM-dd'),
      finDefFromDate2:  this.datepipe.transform(f1Year,'yyyy-MM-dd'),
      finDefToDate2: this.datepipe.transform(t1Year,'yyyy-MM-dd'),
   };
    this.getData(payload);
    this.getTableData(payload1);
  }

  getfiscalData(){
    let currentYear = new Date().getFullYear() - 5;
    this.fiscalYearArr = [];
    for (let index = 0; index < 10; index++) {
     
      this.fiscalYearArr.push({text : currentYear + '-' +  (currentYear+1), id:currentYear,  });
      currentYear++;
     
    }
  }

  getTableData(payload:any){
    this.reportService.getCategorySupplierDefects(payload).subscribe({
      next: (res: any) => {
        this.tableData = res;
        
        this.SpinnerService.hide();
      },
      error: (err: any) => {
        this.SpinnerService.hide();
        this._swalService.errorMessageBox(err.message);
      }
    });
  }

}
