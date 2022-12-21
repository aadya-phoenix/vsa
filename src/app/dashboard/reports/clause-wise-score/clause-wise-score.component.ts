import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ChartData, ChartOptions } from 'chart.js';
import * as _ from 'lodash';
import { NgxSpinnerService } from 'ngx-spinner';
import { AuditPlanService } from 'src/app/shared/services/audit-plan/audit-plan.service';
import { CategoryMasterService } from 'src/app/shared/services/category-master/category-master.service';
import { EmployeeMasterService } from 'src/app/shared/services/employee-master/employee-master.service';
import { MessageService } from 'src/app/shared/services/message.service';
import { ReportService } from 'src/app/shared/services/report/report.service';
import { SwalService } from 'src/app/shared/services/swal.service';

@Component({
  selector: 'app-clause-wise-score',
  templateUrl: './clause-wise-score.component.html',
  styleUrls: ['./clause-wise-score.component.css']
})
export class ClauseWiseScoreComponent implements OnInit {

  yearWiseVSAData: ChartData<'line'> = {
    labels: [],
    datasets: [] as any
  };
  isChecked = false;
  clauseList: any = [];
  yearLabels: any = [];
  labels: any = [];
  data: any = [];
  selectedFilter = 'vendor';
  commodity: any;
  vendorId: any;
  numberOfDefect: any = 0;
  totalScore: any = 0;
  vendorCategoryId: any;
  category: any;
  vendorObj: any = [];
  clause: any = [];
  categoryObj: any = [
    { name: 'Red', value: 'red' }, { name: 'Yellow', value: 'yellow' }, { name: 'Green', value: 'green' }
  ];
  vendorcategoryObj: any = [];
  /*  yearWiseVSAData: ChartData<'line'> = {
     labels: ['FY 18-19', 'FY 19-20', 'FY 20-21', 'FY 21-22', 'FY 22-23'],
     datasets: [
       {
         label: 'Overall Score',
         data: [70, 75, 80, 83, 85],
         pointStyle: 'rectRot',
         backgroundColor: 'rgb(0 0 0)',
         borderColor: 'rgb(0 0 0)',
         pointRadius: 8,
         pointHoverRadius: 10,
         pointBackgroundColor: 'rgb(0 0 0)',
         pointHoverBackgroundColor: 'rgb(0 0 0)',
         pointHoverBorderColor: 'rgb(0 0 0)',
         pointBorderColor: 'rgb(0 0 0)',
       },
       {
         label: 'CC1',
         data: [60,70,80,75,90],
         backgroundColor: 'rgb(157 195 230)',
         pointRadius: 8,
         pointHoverRadius: 10,
         pointBackgroundColor: 'rgb(157 195 230)',
         pointHoverBackgroundColor: 'rgb(157 195 230)',
         pointHoverBorderColor: 'rgb(157 195 230)',
         pointBorderColor: 'rgb(157 195 230)',
         pointStyle: 'rect',
         borderColor: 'rgb(157 195 230)'
       },
       {
         label: 'CC2',
         data: [70,75,80,78,77],
         backgroundColor: 'rgb(165 165 165)',
         pointStyle: 'triangle',
         borderColor: 'rgb(165 165 165)',
         pointRadius: 8,
         pointHoverRadius: 10,
         pointBackgroundColor: 'rgb(165 165 165)',
         pointHoverBackgroundColor: 'rgb(165 165 165)',
         pointHoverBorderColor: 'rgb(165 165 165)',
         pointBorderColor: 'rgb(165 165 165)',
       },
       {
         label: 'CC3',
         data: [75,80,80,80,80],
         backgroundColor: 'rgb(18 59 111)',
         pointRadius: 8,
         pointHoverRadius: 10,
         pointBackgroundColor: 'rgb(18 59 111)',
         pointHoverBackgroundColor: 'rgb(18 59 111)',
         pointHoverBorderColor: 'rgb(18 59 111)',
         pointBorderColor: 'rgb(18 59 111)',
         pointStyle: 'rect',
         borderColor: 'rgb(18 59 111)'
       },
       {
         label: 'CC4',
         data: [80,80,85,85,85],
         backgroundColor: 'rgb(255 102 0)',
         pointStyle: 'crossRot',
         borderColor: 'rgb(255 102 0)',
         pointRadius: 8,
         pointHoverRadius: 10,
         pointBackgroundColor: 'rgb(255 102 0)',
         pointHoverBackgroundColor: 'rgb(255 102 0)',
         pointHoverBorderColor: 'rgb(255 102 0)',
         pointBorderColor: 'rgb(255 102 0)',
       },
       {
         label: 'CC5',
         data: [75,80,75,80,80],
         backgroundColor: 'rgb(112 173 71)',
         pointRadius: 8,
         pointHoverRadius: 10,
         pointBackgroundColor: 'rgb(112 173 71)',
         pointHoverBackgroundColor: 'rgb(112 173 71)',
         pointHoverBorderColor: 'rgb(112 173 71)',
         pointBorderColor: 'rgb(112 173 71)',
         pointStyle: 'circle',
         borderColor: 'rgb(112 173 71)'
       }
     ],
   }; */

  colors = ['rgb(0 0 0)', 'rgb(157 195 230)', 'rgb(165 165 165)', 'rgb(0 0 0)', 'rgb(157 195 230)', 'rgb(165 165 165)', 'rgb(0 0 0)', 'rgb(157 195 230)', 'rgb(165 165 165)', 'rgb(0 0 0)', 'rgb(157 195 230)', 'rgb(165 165 165)', 'rgb(157 195 230)', 'rgb(165 165 165)', 'rgb(157 195 230)', 'rgb(165 165 165)']

  yearWiseVSAOptions: ChartOptions = {
    responsive: true,
    scales: {
      y: {
        grid: {
          display: false
        },
        title: { text: "Score (%)", display: true },
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
  constructor(
    private _swalService: SwalService,
    private auditPlanService: AuditPlanService,
    private reportService: ReportService,
    private categoryService: CategoryMasterService,
    private employeeService: EmployeeMasterService,
    private SpinnerService: NgxSpinnerService,
    private datepipe: DatePipe
  ) { }

  ngOnInit(): void {
    this.getVendorCategory();
    this.getCategoryList();
  }


  map = new Map<string, [any]>();

  fillCategoryMap() {
    this.data.forEach((x: any, index: any) => {
      let category = x.catName;
      let value = this.map.get(category);
      if(value != undefined) {
        value.push(x.score);
        this.map.set(category, value);
      } else {
        this.map.set(category, [x.score]);
      }
    })
  }

  getDatasetObject(data: any, category: any, index: any): any { 
    let color = this.colors[index];
    return {
      label: category,
      data: data,
      pointStyle: 'rectRot',
      backgroundColor: color,
      borderColor: color,
      pointRadius: 8,
      pointHoverRadius: 10,
      pointBackgroundColor: color,
      pointHoverBackgroundColor: color,
      pointHoverBorderColor: color,
      pointBorderColor: color,
    };
  }

  getData(payload: any) {
    this.reportService.getClauseWiseScoreTrend(payload).subscribe({
      next: (res: any) => {
        this.data = res;
        this.labels = _.map(this.data, 'finYear');
        this.clause = _.map(this.data, 'catName');
        this.yearLabels = this.labels.filter(this.onlyUnique);
        this.fillCategoryMap()
        var dataset: any[] = [];
        var index = 0;
        this.map.forEach((value: [any], key: string) => {
          dataset.push(this.getDatasetObject(value, key, index))
          index++;
        });
        this.yearWiseVSAData = {
          labels: this.yearLabels,
          datasets: dataset
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
    this.vendorCategoryId = null;
    this.numberOfDefect = 0;
    this.category = null;
    this.vendorId = null;
  }

  reloadDatawithFilter() {
    var payload = {
      vendorId: this.vendorId,
      vendorCategoryId: this.vendorCategoryId,
      numberOfDefect: parseInt(this.numberOfDefect),
      category: this.category
    };
    this.getData(payload);
  }

  onFilterSelected() {

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

  onlyUnique(value: any, index: number, self: any) {
    return self.indexOf(value) === index;
  }

  getCategoryList() {
    this.SpinnerService.show();
    this.categoryService.getCategory().subscribe({
      next: (res: any) => {
        if (res) {
          res.forEach((x: any) => {
            x.isChecked = false;
          })
          this.clauseList = res;
          this.SpinnerService.hide();
        }
      },
      error: (e: any) => {
        console.error(e);
        this.SpinnerService.hide();
      },
    });
  }

  getClause(event: any, item: any) {
    console.log("event", event.target.value, item);
    this.isChecked = !this.isChecked;
    item ? item.isChecked = !item.isChecked : '';
    if (event.target.value == 'all') {
      this.clauseList.forEach((x: any) => {
        x.isChecked = this.isChecked;
      });
    }
  }


}
