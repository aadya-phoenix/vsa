import { Component, OnInit } from '@angular/core';
import { ChartData, ChartOptions } from 'chart.js';
import { NgxSpinnerService } from 'ngx-spinner';
import { Subscription } from 'rxjs';
import { MessageService } from 'src/app/shared/services/message.service';
import { ReportService } from 'src/app/shared/services/report/report.service';
import { SwalService } from 'src/app/shared/services/swal.service';
import * as _ from 'lodash';
import * as XLSX from 'xlsx';

@Component({
  selector: 'app-anual-audit',
  templateUrl: './anual-audit.component.html',
  styleUrls: ['./anual-audit.component.css']
})
export class AnualAuditComponent implements OnInit {
  subscription: Subscription;
  data: any = []
  selectedFilter = 'month';
  lables : any = []
  planData:any = []
  finalData:any = []
  provisionalData:any = []
  salesData: ChartData<'bar'> = {
    labels: this.lables,
    datasets: [],
  };
  fileName= 'ExcelSheet.xlsx';
  chartOptions: ChartOptions = {
    responsive: true,
    plugins: {
      title: {
        display: true,
        text: 'Audit Plan vs Actual Conducted',
      },
    },
  };

  constructor(private SpinnerService: NgxSpinnerService,
    private _swalService: SwalService,
    private reportService: ReportService,
    private messageService: MessageService) {
    this.subscription = this.messageService
      .FilterObserab()
      .subscribe((data) => {
        if (data) {
          this.getData(data.filter);
        }
      });
  }

  ngOnInit(): void {
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
        locationId: null
      };
      if (payload.month) {
        data.month = payload.month
      }
      this.reportService.getAuditPlanStatusByMonth(data).subscribe({
        next: (res: any) => {
          this.data = res;
          this.lables = _.map(this.data, 'monthOfaudit');
          this.planData = _.map(this.data, 'plannedAudits');
          this.finalData = _.map(this.data, 'finalAudits');
          this.provisionalData = _.map(this.data, 'provisionalAudits');

          this.salesData = {
            labels: this.lables,
           
            datasets: [
              { label: 'Plan', data: this.planData, stack: '0', backgroundColor: 'rgb(127 127 127)', borderColor: 'rgb(127 127 127)', hoverBackgroundColor: 'rgb(127 127 127)', hoverBorderColor: 'rgb(127 127 127)' },
              { label: 'Final', data: this.finalData, stack: '1', backgroundColor: 'rgb(0 32 96)', borderColor: 'rgb(0 32 96)', hoverBackgroundColor: 'rgb(0 32 96)', hoverBorderColor: 'rgb(0 32 96)' },
           /*    { label: 'Provisional', data: this.provisionalData, stack: '1', backgroundColor: 'rgb(255 192 0)', borderColor: 'rgb(255 192 0)', hoverBackgroundColor: 'rgb(255 192 0)', hoverBorderColor: 'rgb(255 192 0)' }, */
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

  ngOnDestroy() {
    if (this.subscription) {
      this.messageService.getFilterObserab().forEach((subscript: any) => {
        subscript.unsubscribe();
      })
      this.subscription.unsubscribe();
    }
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
