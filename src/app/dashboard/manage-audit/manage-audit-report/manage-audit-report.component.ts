import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { ChartData, ChartOptions } from 'chart.js';
import html2canvas from 'html2canvas';
import jspdf from 'jspdf';
import { dataConstants } from 'src/app/shared/constants/dataConstants';
import { AuditExecutionService } from 'src/app/shared/services/audit-execution/audit-execution.service';
import { AuthenticationService } from 'src/app/shared/services/auth/authentication.service';
import { CommonService } from 'src/app/shared/services/common/common.service';
import { ReportService } from 'src/app/shared/services/report/report.service';

@Component({
  selector: 'app-manage-audit-report',
  templateUrl: './manage-audit-report.component.html',
  styleUrls: ['./manage-audit-report.component.css']
})
export class ManageAuditReportComponent implements OnInit {
  auditPlanId: any;
  dateFormat = dataConstants.dateFormate;
  auditReportData: any;
  summaryDetails: any = [];
  auditDetails: any;
  criticalObservations: any = [];
  vendorAttendees:any=[];
  supplierCategoryStatus = 'Yellow';
  chartsData = false;
  categoryScoreSum = 0;
  totalCountSum = 0;
  pieScoreSum = 0;
  triangleScoreSum = 0;
  totalCountPercentage = 0;
  xScoreSum = 0;
  reportData: ChartData<'radar'> = {
    labels: [],
    datasets: [
      { label: 'Category', data: [] },
    ]
  };
  reportOptions: ChartOptions = {
    responsive: true,
    plugins: {
      title: {
        display: true,
        text: 'Executive Summary'
      }
    }
  };
  cReportDetails:any=[];

  @ViewChild('pdfTable') pdfTable: ElementRef | undefined;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private commonService: CommonService,
    private auditExecutionService: AuditExecutionService,
    private authService:AuthenticationService,
    private reportService: ReportService
  ) {
    this.route.paramMap.subscribe((params: ParamMap) => {
      const Id = params.get('id');
      this.auditPlanId = Id ? Id : 0;
    })
  }

  ngOnInit(): void {
    this.getExecutiveSummary();
    this.getSummaryDetails();
    this.getCriticalObservations();
    this.getCmeasureReport();
    this.auditDetails = this.authService.getAuditDetails();
  }

  getExecutiveSummary() {
    this.commonService.showLoading();
    this.reportService.getExecutiveSummary(this.auditPlanId).subscribe({
      next: (res) => {
        if (res) {
          this.auditReportData = res;
          this.categoryScoreSum = 0;
          this.totalCountSum = 0;
          this.pieScoreSum = 0;
          this.triangleScoreSum = 0;
          this.xScoreSum = 0;
          this.auditReportData.catergoryWiseScoreModel.forEach((element: any, index: number) => {
            this.reportData.labels?.push(`${index + 1} ${element.name}`);
            const reprotData = (element.categoryScore / element.totalCount) * 100;
            this.reportData.datasets[0].data.push(reprotData > 0 ? reprotData : 0);
            this.categoryScoreSum += element.categoryScore ? element.categoryScore : 0;
            this.totalCountSum += element.totalCount ? element.totalCount : 0;
            this.pieScoreSum += element.pieScore ? element.pieScore : 0;
            this.triangleScoreSum += element.triangleScore ? element.triangleScore : 0;
            this.xScoreSum += element.xScore ? element.xScore : 0;
          });
          this.totalCountPercentage = (this.categoryScoreSum * 100) / this.totalCountSum;
          this.chartsData = true;
          this.commonService.hideLoading();
        }
      },
      error: (e) => {
        console.error(e);
        this.commonService.hideLoading();
      }
    });
  }

  getCriticalObservations() {
    this.commonService.showLoading();
    this.reportService.getCriticalObservations({ id: this.auditPlanId }).subscribe({
      next: (res) => {
        if (res) {
          this.criticalObservations = res;
          this.commonService.hideLoading();
        }
      },
      error: (e) => {
        console.error(e);
        this.commonService.hideLoading();
      }
    });
  }

  back() {
    this.router.navigateByUrl(`dashboard/manage-audit`);
  }

  exportAsPDF(div_id: any) {
    let data = document.getElementById(div_id);
    if (data != null) {
      html2canvas(data, {
        allowTaint: true
      }).then((canvas: any) => {
        const contentDataURL = canvas.toDataURL({
          format: 'jpeg',
          quality: 0.8
       });
        //let pdf = new jspdf('l', 'cm', 'a4'); //Generates PDF in landscape mode
        let pdf = new jspdf('p', 'cm', 'a4'); //Generates PDF in portrait mode
        pdf.addImage(contentDataURL, 'PNG', 0, 0, 21.0,29.7);
        pdf.save('ExecutiveSummary.pdf');
      });
    }
  }

  getSummaryDetails() {
    this.commonService.showLoading();
    this.auditExecutionService.getSummaryDetails(this.auditPlanId).subscribe({
      next: (res) => {
        if (res) {
          this.summaryDetails = res;
          this.summaryDetails.forEach((x: any) => {
            if (x.judgementSymbol == 'Pie') {
              x.judgeSymbol = ''
            }
          });
          this.commonService.hideLoading();
        }
      },
      error: (e) => {
        console.error(e);
        this.commonService.hideLoading();
      }
    });
  }

  getCmeasureReport(){
    this.commonService.showLoading();
    this.auditExecutionService.getCmeasureReport(this.auditPlanId).subscribe({
      next: (res) => {
        if (res) {
          this.cReportDetails = res;
          this.cReportDetails.forEach((x:any)=>{
            if(x.dateOfSubmission == "0001-01-01T00:00:00"){
              x.dateOfSubmission = null
            }
           });
          this.commonService.hideLoading();
        }
      },
      error: (e) => {
        console.error(e);
        this.commonService.hideLoading();
      }
    });  
  }

}