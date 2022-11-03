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

  auditPlanList:any=[];
  dateFormat = dataConstants.dateFormate;

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
          this.commonService.hideLoading();
          this.auditPlanList = res;
        }
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

}
