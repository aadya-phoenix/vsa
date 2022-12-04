import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, ParamMap } from '@angular/router';
import { AuditExecutionService } from 'src/app/shared/services/audit-execution/audit-execution.service';
import { AuditPlanService } from 'src/app/shared/services/audit-plan/audit-plan.service';
import { CommonService } from 'src/app/shared/services/common/common.service';

@Component({
  selector: 'app-action-plan-category-vendor',
  templateUrl: './action-plan-category-vendor.component.html',
  styleUrls: ['./action-plan-category-vendor.component.css']
})
export class ActionPlanCategoryVendorComponent implements OnInit {
  auditPlanId:any;
  categoryScoreList:any=[];
  obsList:any=[];
  pagination = {
    page: 1,
    pageNumber: 1,
    pageSize: 10
  }


  constructor(
    private route:ActivatedRoute,
    private router:Router,
    private commonService: CommonService,
    private auditPlanService:AuditPlanService,
    private auditExeService:AuditExecutionService
  ) { 
    this.route.paramMap.subscribe((params:ParamMap)=>{
      const Id = params.get('id');
      this.auditPlanId = Id;
    })
  }

  ngOnInit(): void {
    this.getCategoryList();
    this.getActionObservation();
  }

  getCategoryList(){
    this.commonService.showLoading();
    this.auditPlanService.getScoreAndCategoryList({id:this.auditPlanId}).subscribe({
      next: (res) => {
        if(res){
         this.categoryScoreList = res;
         this.commonService.hideLoading();
        }
       },
      error: (e) => 
      {
        console.error(e);
        this.commonService.hideLoading();
      }, 
     });
  }

  goToObservation(id:any){
   this.router.navigateByUrl(`dashboard/evidence/submit/${this.auditPlanId}/${id}`);
  }

  gridView2(){}

  pageChanged(event: any) {
    this.pagination.pageNumber = event;
  }

  back(){
    this.router.navigateByUrl(`dashboard/action-plan/vendor`); 
  }

  getActionObservation(){
    this.commonService.showLoading();
    this.auditExeService.getEvidenceObservation(this.auditPlanId).subscribe({
      next: (res) => {
        if(res){
         this.obsList = res;
         this.commonService.hideLoading();
        }
       },
      error: (e) => 
      {
      console.error(e);
      this.commonService.hideLoading();
      }, 
      });
  }

}
