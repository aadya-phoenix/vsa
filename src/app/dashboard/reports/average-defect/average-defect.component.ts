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
  selector: 'app-average-defect',
  templateUrl: './average-defect.component.html',
  styleUrls: ['./average-defect.component.css']
})
export class AverageDefectComponent implements OnInit {

  red:any=[];
  yellow:any=[];
  green:any=[];
  fiscalYearValue:any;
  fiscalYearArr:any=[];
  data:any=[];
  avgDefectData: ChartData<'scatter'> = {
    datasets: [],
  };
 /*  avgDefectData: ChartData<'scatter'> = {
    datasets: [
      {
        label: 'VSA Green',
        data: [{x:42,y:0.7},{x:44,y:0.2},{x:55,y:2.5}],
        pointStyle: 'rectRounded',
        backgroundColor: 'rgb(255 99 132)',
        borderColor: 'rgb(255 99 132)',
        pointRadius: 8,
        pointHoverRadius: 10,
        pointBackgroundColor: 'rgb(255 99 132)',
        pointHoverBackgroundColor: 'rgb(255 99 132)',
        pointHoverBorderColor:  'rgb(197 4 45)',
        pointBorderColor:  'rgb(197 4 45)',
      },
      {
        label: 'VSA Yellow',
        data: [{x:52,y:0.1},{x:55,y:0.2},{x:53,y:0.2},{x:65,y:0.25},{x:55,y:0.5},{x:65,y:2.5},{x:75,y:4},{x:70,y:3.5}],
        pointStyle: 'triangle',
        backgroundColor: 'rgb(255, 205, 86)',
        borderColor: 'rgb(255, 205, 86)',
        pointRadius: 8,
        pointHoverRadius: 10,
        pointBackgroundColor: 'rgb(255, 205, 86)',
        pointHoverBackgroundColor: 'rgb(255, 205, 86)',
        pointHoverBorderColor:  'rgb(233 164 1)',
        pointBorderColor:  'rgb(233 164 1)',
      },
      {
        label: 'VSA Green',
        data: [{x:56,y:0.8},{x:75,y:0.5},{x:77,y:3.5},{x:90,y:0.56},{x:92,y:0.75},{x:95,y:4},{x:100,y:2.45},{x:42,y:2.75}],
        pointStyle: 'circle',
        backgroundColor: 'rgb(75 192 192)',
        borderColor: 'rgb(75 192 192)',
        pointRadius: 8,
        pointHoverRadius: 10,
        pointBackgroundColor: 'rgb(75 192 192)',
        pointHoverBackgroundColor: 'rgb(75 192 192)',
        pointHoverBorderColor:  'rgb(2 177 177)',
        pointBorderColor:  'rgb(2 177 177)',
      }
    ],
  }; */
  avgDefectOptions: ChartOptions = {
    responsive: true,
    scales: {
      y:{
        grid:{
          display: false
        },
        title:{ text:"Avg Defect / Month", display:true},
      },
      x:{
        grid:{
          display: false
        },
        title:{ text:"VSA Score %", display:true},
      }
    },
    plugins: {
      title: {
        display: true,
        text: 'Average Defect/month Vs VSA Score',
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

  getData(payload:any) {
    this.red=[];
    this.green=[];
    this.yellow=[];
    this.reportService.getVendorDefects(payload).subscribe({
      next: (res: any) => {
        this.data = res;
        this.data.forEach((x:any)=>{
          if (x.status == 'Red'){
            this.red.push({x: x.vsaScore
              ,y: x.avgDefect
            });
          }
          if (x.status == 'Yellow'){
            this.yellow.push({x:x.vsaScore
              ,y: x.avgDefect
            });
          }
          if (x.status == 'Green'){
            this.green.push({x:x.vsaScore
              ,y: x.avgDefect
            });
          }
        });
        this.avgDefectData = {
          labels: ['VSA SCORE %'],
          datasets: [
            {
              label: 'VSA Red',
              data:this.red,
              pointStyle: 'rectRounded',
              backgroundColor: 'rgb(255 99 132)',
              borderColor: 'rgb(255 99 132)',
              pointRadius: 8,
              pointHoverRadius: 10,
              pointBackgroundColor: 'rgb(255 99 132)',
              pointHoverBackgroundColor: 'rgb(255 99 132)',
              pointHoverBorderColor:  'rgb(197 4 45)',
              pointBorderColor:  'rgb(197 4 45)',
            },
            {
              label: 'VSA Yellow',
              data: this.yellow,
              pointStyle: 'triangle',
              backgroundColor: 'rgb(255, 205, 86)',
              borderColor: 'rgb(255, 205, 86)',
              pointRadius: 8,
              pointHoverRadius: 10,
              pointBackgroundColor: 'rgb(255, 205, 86)',
              pointHoverBackgroundColor: 'rgb(255, 205, 86)',
              pointHoverBorderColor:  'rgb(233 164 1)',
              pointBorderColor:  'rgb(233 164 1)',
            },
            {
              label: 'VSA Green',
              data: this.green,
              pointStyle: 'circle',
              backgroundColor: 'rgb(75 192 192)',
              borderColor: 'rgb(75 192 192)',
              pointRadius: 8,
              pointHoverRadius: 10,
              pointBackgroundColor: 'rgb(75 192 192)',
              pointHoverBackgroundColor: 'rgb(75 192 192)',
              pointHoverBorderColor:  'rgb(2 177 177)',
              pointBorderColor:  'rgb(2 177 177)',
            }
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
  }

  reloadDatawithFilter() {
     let year= parseInt(this.fiscalYearValue);
    let from = new Date(year, 3, 1);
    let to =  new Date(year+1,2,31);
    var payload = {
       finAuditFromDate :  this.datepipe.transform(from,'yyyy-MM-dd'),
       finAuditToDate: this.datepipe.transform(to,'yyyy-MM-dd'),
    }; 
    this.getData(payload);
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
