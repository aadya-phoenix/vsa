import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { dataConstants } from 'src/app/shared/constants/dataConstants';
import { AuditPlanService } from 'src/app/shared/services/audit-plan/audit-plan.service';
import { CommonService } from 'src/app/shared/services/common/common.service';

@Component({
  selector: 'app-action-plan-vendor',
  templateUrl: './action-plan-vendor.component.html',
  styleUrls: ['./action-plan-vendor.component.css']
})
export class ActionPlanVendorComponent implements OnInit {

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
   this.router.navigateByUrl(`dashboard/action-plan/vendor/category/${id}`);
  }

  gridView1(){}

  pageChanged(event: any) {
    this.pagination.pageNumber = event;
  }

}
