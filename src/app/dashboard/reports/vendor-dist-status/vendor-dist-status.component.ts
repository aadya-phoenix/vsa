import { Component, OnInit } from '@angular/core';
import { ChartData, ChartOptions } from 'chart.js';
import * as _ from 'lodash';
import { NgxSpinnerService } from 'ngx-spinner';
import { ReportService } from 'src/app/shared/services/report/report.service';
import { SwalService } from 'src/app/shared/services/swal.service';

@Component({
  selector: 'app-vendor-dist-status',
  templateUrl: './vendor-dist-status.component.html',
  styleUrls: ['./vendor-dist-status.component.css']
})
export class VendorDistStatusComponent implements OnInit {
  data: any = []
  pieData:any =[]
  lables: any = []
  vendorDistData: ChartData<'bar'> = {
    labels: [],
    datasets: [],
  };

  vendorDistOptions: ChartOptions = {
    responsive: true,
    scales: {
      x: {
        grid: {
          display: false
        },
        title: { text: "Financial Year", display: true },
      },
      y: {
        grid: {
          display: false
        },
        title: { text: "NO. OF VENDORS", display: true },
      }
    },
    plugins: {
      title: {
        display: true,
        text: 'Vendor Distribution Status',
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

  pieVSACateOptions: ChartOptions = {
    responsive: true,
    plugins: {
      title: {
        display: true,
        text: 'VSA Category- Overall',
      },
    },
  };
  
  pieVSACateData:any = {
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
    this.reportService.getDistributionStatusYearWiseResponseAsync({}).subscribe({
      next: (res: any) => {
        this.data = res;
        const greenData: any[] = [];
        const yellowData: any[] = [];
        const redData: any[] = [];
        this.lables = _.uniq(_.map(this.data, 'financialYear'));
        _.each(_.groupBy(this.data, 'financialYear'), (element: any) => {
          let green = _.find(element, (data: any) => { if (data.status == "Green") return data; });
          let red = _.find(element, (data: any) => { if (data.status == "Red") return data; });
          let yellow = _.find(element, (data: any) => { if (data.status == "Yellow") return data; });
          greenData.push(green ? green.vendorCount : 0);
          yellowData.push(yellow ? yellow.vendorCount : 0);
          redData.push(red ? red.vendorCount : 0);
        });
        this.vendorDistData = {
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
    this.reportService.getDistributionStatusYearWise_Percent_ResponsePieChart({}).subscribe({
      next: (res: any) => {
        this.pieData = res[0];
        this.pieVSACateData = {
          labels: [
            'GREEN',
            'Yellow',
            'RED'
          ],
          datasets: [{
            label: 'VSA Category- Overall',
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

}
