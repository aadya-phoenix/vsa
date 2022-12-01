import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { dataConstants } from 'src/app/shared/constants/dataConstants';
import { AuditPlanService } from 'src/app/shared/services/audit-plan/audit-plan.service';
import { CommonService } from 'src/app/shared/services/common/common.service';

@Component({
  selector: 'app-action-plan-list',
  templateUrl: './action-plan-list.component.html',
  styleUrls: ['./action-plan-list.component.css']
})
export class ActionPlanListComponent implements OnInit {
  plannedStartDate:any;
  plannedEndDate:any;
  auditPlanList:any=[];
  dateFormat = dataConstants.dateFormate;
  pagination = {
    page: 1,
    pageNumber: 1,
    pageSize: 10
  }


  constructor(
    private router:Router,
    private commonService: CommonService,
    private auditService:AuditPlanService
  ) { }

  ngOnInit(): void {
    this.getAuditPlan();
  }

  getAuditPlan(){
    this.commonService.showLoading();
    this.auditService.getAuditPlan().subscribe({
      next:(res)=>{
        if(res){ 
          this.auditPlanList = res.filter((x:any)=>{
            return x.dpmApprovalStatus
            == "Approved";
           });
        }
        this.commonService.hideLoading();
      },
      error:(e)=>{
        console.error(e);
        this.commonService.hideLoading();
      }
    });
  }

  goToCategory(id:any){
   this.router.navigateByUrl(`dashboard/action-plan/category/${id}`);
  }

  gridView1(){}

  pageChanged(event: any) {
    this.pagination.pageNumber = event;
  }

}
