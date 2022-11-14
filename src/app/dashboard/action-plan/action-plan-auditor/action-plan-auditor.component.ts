import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { dataConstants } from 'src/app/shared/constants/dataConstants';
import { AuditPlanService } from 'src/app/shared/services/audit-plan/audit-plan.service';
import { CommonService } from 'src/app/shared/services/common/common.service';

@Component({
  selector: 'app-action-plan-auditor',
  templateUrl: './action-plan-auditor.component.html',
  styleUrls: ['./action-plan-auditor.component.css']
})
export class ActionPlanAuditorComponent implements OnInit {

  auditPlanList:any=[];
  auditPlanId:any;
  dateFormat = dataConstants.dateFormate;
  pagination = {
    page: 1,
    pageNumber: 1,
    pageSize: 10
  }

  constructor(
    private router:Router,
    private commonService: CommonService,
    private auditService:AuditPlanService,
    private route:ActivatedRoute
  ) { 
    this.route.paramMap.subscribe((res:ParamMap)=>{
      let Id = res.get('id');
      this.auditPlanId = Id;
    });
  }

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
  
  pageChanged(event: any) {
    this.pagination.pageNumber = event;
  }

  goToCategory(id:any){
    this.router.navigateByUrl(`dashboard/evidence/category/${id}`);
   }

   gridView1(){}
 

}
