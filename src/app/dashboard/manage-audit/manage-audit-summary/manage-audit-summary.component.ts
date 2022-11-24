import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { dataConstants } from 'src/app/shared/constants/dataConstants';
import { CommonService } from 'src/app/shared/services/common/common.service';
import { ReportService } from 'src/app/shared/services/report/report.service';

@Component({
  selector: 'app-manage-audit-summary',
  templateUrl: './manage-audit-summary.component.html',
  styleUrls: ['./manage-audit-summary.component.css']
})
export class ManageAuditSummaryComponent implements OnInit {

  auditPlanId:any;
  dateFormat = dataConstants.dateFormate;
  auditReportData:any;
  reportData:any;
  
  constructor(
    private router:Router,
    private route:ActivatedRoute,
    private commonService: CommonService,
    private reportService:ReportService
  ) {
    this.route.paramMap.subscribe((params:ParamMap)=>{
      const Id = params.get('id');
      this.auditPlanId = Id ? Id : 0;
    })
   }

  ngOnInit(): void {
    this.getExecutiveSummary();
  }

  getExecutiveSummary(){
    this.commonService.showLoading();
    this.reportService.getExecutiveSummary(this.auditPlanId).subscribe({
      next:(res)=>{
        if(res){
          this.auditReportData = res;
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
    this.router.navigateByUrl(`dashboard/manage-audit/question/${this.auditPlanId}`);
  }

}