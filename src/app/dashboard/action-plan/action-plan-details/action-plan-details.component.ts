import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap, Params, Router } from '@angular/router';
import { AuditPlanService } from 'src/app/shared/services/audit-plan/audit-plan.service';
import { CommonService } from 'src/app/shared/services/common/common.service';

@Component({
  selector: 'app-action-plan-details',
  templateUrl: './action-plan-details.component.html',
  styleUrls: ['./action-plan-details.component.css']
})
export class ActionPlanDetailsComponent implements OnInit {

  auditPlanId:any;
  categoryScoreList:any=[];

  pagination = {
    page: 1,
    pageNumber: 1,
    pageSize: 10
  }


  constructor(
    private route:ActivatedRoute,
    private router:Router,
    private commonService: CommonService,
    private auditPlanService:AuditPlanService
  ) { 
    this.route.paramMap.subscribe((params:ParamMap)=>{
      const Id = params.get('id');
      this.auditPlanId = Id;
    })
  }

  ngOnInit(): void {
    this.getCategoryList();
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
   this.router.navigateByUrl(`dashboard/action-plan/observe/${this.auditPlanId}/${id}`);
  }

  gridView2(){}

  pageChanged(event: any) {
    this.pagination.pageNumber = event;
  }

  back(){
    this.router.navigateByUrl(`dashboard/action-plan`);
   }

}
