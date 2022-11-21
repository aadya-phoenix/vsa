import { Component, OnInit } from '@angular/core';
import { ChartData, ChartOptions } from 'chart.js';
import * as _ from 'lodash';
import { NgxSpinnerService } from 'ngx-spinner';
import { ReportService } from 'src/app/shared/services/report/report.service';
import { SwalService } from 'src/app/shared/services/swal.service';

@Component({
  selector: 'app-vsa-status',
  templateUrl: './vsa-status.component.html',
  styleUrls: ['./vsa-status.component.css']
})
export class VsaStatusComponent implements OnInit {
  data: any = [];
  lables: any = [];
  tableData: any = [];
  yearWiseVSAData: ChartData<'line'> = {
    labels: [],
    datasets: [],
  };

  yearWiseVSAOptions: ChartOptions = {
    responsive: true,
    scales: {
      y: {
        grid: {
          display: false
        },
        title: { text: "% of total audited vendors", display: true },
        ticks: {
          callback: function (value, index, ticks) {
            return value + '%'
          }
        }
      },
      x: {
        grid: {
          display: false
        },
      }
    },
    animation: {
      duration: 1,
      onComplete: function (e) {
        const chartInstance = e.chart,
          ctx = chartInstance.ctx;
        ctx.textAlign = 'center';
        ctx.textBaseline = 'bottom';
        this.data.datasets.forEach((dataset: any, i) => {
          const meta = chartInstance.getDatasetMeta(i);
          meta.data.forEach((bar: any, index: number) => {
            if (dataset.data && dataset.data[index] > 0) {
              const data = dataset.data[index];
              ctx.fillText(data + "%", bar.x, bar.y);
            }
          });
        });
      }
    },
    plugins: {
      title: {
        display: true,
        text: 'Year wise VSA Status ',
      },
    },
  };

  constructor(private SpinnerService: NgxSpinnerService,
    private _swalService: SwalService,
    private reportService: ReportService) {
  }

  ngOnInit(): void {
    this.getData();
  }

  getData() {
    this.SpinnerService.show();
    this.reportService.getVSAStatusYearWise_Response({}).subscribe({
      next: (res: any) => {
        this.data = res;
        this.lables = _.map(this.data, 'financialYear');
        const greenData =  _.map(this.data, 'greenPercentage');
        const yellowData =  _.map(this.data, 'yellowPercentage');
        const redData =  _.map(this.data, 'redPercentage');
        this.yearWiseVSAData = {
          labels: this.lables,
          datasets: [
            {
              label: 'VSA Green',
              data: greenData,
              pointStyle: 'circle',
              backgroundColor: 'rgb(75 192 192)',
              borderColor: 'rgb(75 192 192)',
              pointRadius: 8,
              pointHoverRadius: 10,
              pointBackgroundColor: 'rgb(75 192 192)',
              pointHoverBackgroundColor: 'rgb(75 192 192)',
              pointHoverBorderColor: 'rgb(75 192 192)',
              pointBorderColor: 'rgb(75 192 192)',
            },
            {
              label: 'VSA Yellow',
              data: yellowData,
              backgroundColor: 'rgb(255, 205, 86)',
              pointRadius: 8,
              pointHoverRadius: 10,
              pointBackgroundColor: 'rgb(255, 205, 86)',
              pointHoverBackgroundColor: 'rgb(255, 205, 86)',
              pointHoverBorderColor: 'rgb(255, 205, 86)',
              pointBorderColor: 'rgb(255, 205, 86)',
              pointStyle: 'triangle',
              borderColor: 'rgb(255, 205, 86)'
            },
            {
              label: 'VSA Red',
              data: redData,
              backgroundColor: 'rgb(255 99 132)',
              pointStyle: 'crossRot',
              borderColor: 'rgb(255 99 132)',
              pointRadius: 8,
              pointHoverRadius: 10,
              pointBackgroundColor: 'rgb(255 99 132)',
              pointHoverBackgroundColor: 'rgb(255 99 132)',
              pointHoverBorderColor: 'rgb(255 99 132)',
              pointBorderColor: 'rgb(255 99 132)',
            },
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
    this.reportService.getVSAStatusYearWise_Response_Grid({}).subscribe({
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
