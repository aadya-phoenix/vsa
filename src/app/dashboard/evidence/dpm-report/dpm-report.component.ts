import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { ChartData, ChartOptions } from 'chart.js';
import { dataConstants } from 'src/app/shared/constants/dataConstants';
import { AuditExecutionService } from 'src/app/shared/services/audit-execution/audit-execution.service';
import { CommonService } from 'src/app/shared/services/common/common.service';
import { ReportService } from 'src/app/shared/services/report/report.service';

@Component({
  selector: 'app-dpm-report',
  templateUrl: './dpm-report.component.html',
  styleUrls: ['./dpm-report.component.css']
})
export class DpmReportComponent implements OnInit {
  auditPlanId:any;
  dateFormat = dataConstants.dateFormate;
  auditReportData:any;
  summaryDetails:any=[];
  chartsData = false;
  reportData: ChartData<'radar'> = {
    labels:[],
    datasets:[
    { data: [] },
    ]
  };
  reportOptions: ChartOptions = {
    responsive: true,
    plugins: {
    }
  };
  
  constructor(
    private router:Router,
    private route:ActivatedRoute,
    private commonService: CommonService,
    private auditExecutionService:AuditExecutionService,
    private reportService:ReportService
  ) {
    this.route.paramMap.subscribe((params:ParamMap)=>{
      const Id = params.get('id');
      this.auditPlanId = Id ? Id : 0;
    })
   }

  ngOnInit(): void {
    this.getExecutiveSummary();
    this.getSummaryDetails();
  }

  getExecutiveSummary(){
    this.commonService.showLoading();
    this.reportService.getExecutiveSummary(this.auditPlanId).subscribe({
      next:(res)=>{
        if(res){
          this.auditReportData = res;
          this.auditReportData.catergoryWiseScoreModel.forEach((element:any, index:number) => {
            this.reportData.labels?.push(`${index+1} ${element.name}`);
            const reprotData = (element.observationCount / element.categoryTotalCount) * 100;
            this.reportData.datasets[0].data.push(reprotData > 0 ? reprotData : 0);
          });
          this.chartsData = true;
          this.commonService.hideLoading();
        }
      },
      error:(e)=>{
        console.error(e);
        this.commonService.hideLoading();
      }
    });
  }
  
  back(){
    this.router.navigateByUrl(`dashboard/evidence/dpm`);
  }

  getSummaryDetails(){
    this.commonService.showLoading();
    this.auditExecutionService.getSummaryDetails(this.auditPlanId).subscribe({
      next:(res)=>{
        if(res){
          this.summaryDetails = res;
          this.summaryDetails.forEach((x:any)=>{
            if(x.judgementSymbol == 'Pie'){
              x.judgeSymbol = ''
            }
          });
          this.commonService.hideLoading();
        }
      },
      error:(e)=>{
        console.error(e);
        this.commonService.hideLoading();
      }
    });
  }

}