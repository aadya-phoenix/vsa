import { getLocaleDayNames } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ChartData, ChartOptions } from 'chart.js';
import * as _ from 'lodash';
import { NgxSpinnerService } from 'ngx-spinner';
import { ReportService } from 'src/app/shared/services/report/report.service';
import { SwalService } from 'src/app/shared/services/swal.service';
import * as XLSX from 'xlsx';

@Component({
  selector: 'app-dist-status',
  templateUrl: './dist-status.component.html',
  styleUrls: ['./dist-status.component.css']
})
export class DistStatusComponent implements OnInit {
  data: any = []
  pieData: any = []
  lables: any = []
  monthAuditData: ChartData<'bar'> = {
    labels: [],
    datasets: [],
  };
  fileName= 'ExcelSheet.xlsx';
  monthChartOptions: ChartOptions = {
    responsive: true,
    maintainAspectRatio: true,
    scales: {
      x: {
        grid:{
          display: false
        },
        title:{ text:"Month", display:true},
      },
      y:{
        grid:{
          display: false
        },
        title:{ text:"NO. OF VENDORS", display:true},
      },
    },
    plugins: {
      title: {
        display: true,
        text: 'Monthly Audit Status-Green-Yellow-Red',
      },
    },
    // animation: {
    //   duration:1,
    //   onComplete: function(e){
    //     var chartInstance = e.chart,
    //     ctx = chartInstance.ctx;
    //     ctx.textAlign = 'center';
    //     ctx.textBaseline = 'hanging';
    //     this.data.datasets.forEach(function(dataset:any, i) {
    //       var meta = chartInstance.getDatasetMeta(i);
    //         meta.data.forEach(function(bar:any, index:number) {
    //           if (dataset.data && dataset.data[index] > 0) {
    //               var data = dataset.data[index];
    //               ctx.fillText(data, bar.x, bar.y);
    //           }
    //       });
    //     });
    //   }
    // },
  };


  pieChartOptions: ChartOptions = {
    responsive: true,
    plugins: {
      title: {
        display: true,
        text: 'VSA Category-Current Year',
      },
    },
  };
  pieChartData:any = {
    labels: [],
    datasets: []
  }


  constructor(private SpinnerService: NgxSpinnerService,
    private _swalService: SwalService,
    private reportService: ReportService) {
  }

  ngOnInit(): void {
    this.getData();
  }

  getData() {
    this.SpinnerService.show();
    this.reportService.getDistributionStatusMonthWiseResponseAsync({}).subscribe({
      next: (res: any) => {
        this.data = res;
        const months = ['April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December', 'January', 'February', 'March'];
        const greenData: any[] = [];
        const yellowData: any[] = [];
        const redData: any[] = [];
        const sorter = (a: any, b: any) => {
          return months.indexOf(a.monthOfYear) - months.indexOf(b.monthOfYear);
        };
        this.data.sort(sorter);
        this.lables = _.uniq(_.map(this.data, 'monthOfYear'));
        _.each(_.groupBy(this.data, 'monthOfYear'), (element: any) => {
          let green = _.find(element, (data: any) => { if (data.status == "Green") return data; });
          let red = _.find(element, (data: any) => { if (data.status == "Red") return data; });
          let yellow = _.find(element, (data: any) => { if (data.status == "Yellow") return data; });
          greenData.push(green ? green.vendorCount : 0);
          yellowData.push(yellow? yellow.vendorCount : 0);
          redData.push(red? red.vendorCount : 0);
        });
        this.monthAuditData = {
          labels: this.lables,
          datasets: [
            { label: 'Green', data: greenData, stack: '0', backgroundColor: 'rgb(75 192 192)', borderColor: 'rgb(75 192 192)', hoverBackgroundColor: 'rgb(75 192 192)', hoverBorderColor: 'rgb(75 192 192)' },
            { label: 'Yellow', data: yellowData, stack: '0', backgroundColor: 'rgb(255, 205, 86)', borderColor: 'rgb(255, 205, 86)', hoverBackgroundColor: 'rgb(255, 205, 86)', hoverBorderColor: 'rgb(255, 205, 86)' },
            { label: 'Red', data: redData, stack: '0', backgroundColor: 'rgb(255 99 132)', borderColor: 'rgb(255 99 132)', hoverBackgroundColor: 'rgb(255 99 132)', hoverBorderColor: 'rgb(255 99 132)' },
          ],
        };
        this.SpinnerService.hide();
        this.getPieData();
      },
      error: (err: any) => {
        this.SpinnerService.hide();
        this._swalService.errorMessageBox(err.message);
      }
    });
  }

  getPieData() {
    this.SpinnerService.show();
    this.reportService.getDistributionStatusMonthWise_Percent_ResponsePieChart({}).subscribe({
      next: (res: any) => {
        this.pieData = res[0];
      
        this.pieChartData = {
          labels: [
            'GREEN %',
            'Yellow %',
            'RED %'
          ],
          datasets: [{
            label: 'VSA Category-Current Year',
            data: [this.pieData.greenPercentage, this.pieData.yelloPercentage, this.pieData.redPercentage],
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
        this.SpinnerService.hide();
      },
      error: (err: any) => {
        this.SpinnerService.hide();
        this._swalService.errorMessageBox(err.message);
      }
    });
  }

  exportExcel(){
    /* pass here the table id */
    let element = document.getElementById('excel-table');
    const ws: XLSX.WorkSheet =XLSX.utils.table_to_sheet(element);
 
    /* generate workbook and add the worksheet */
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
 
    /* save to file */  
    XLSX.writeFile(wb, this.fileName);
   }
}
