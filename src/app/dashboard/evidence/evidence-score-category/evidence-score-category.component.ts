import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { AuditExecutionService } from 'src/app/shared/services/audit-execution/audit-execution.service';
import { AuditPlanService } from 'src/app/shared/services/audit-plan/audit-plan.service';
import { CommonService } from 'src/app/shared/services/common/common.service';

@Component({
  selector: 'app-evidence-score-category',
  templateUrl: './evidence-score-category.component.html',
  styleUrls: ['./evidence-score-category.component.css']
})
export class EvidenceScoreCategoryComponent implements OnInit {

  auditPlanId : any;
  categoryScoreList:any=[];

  constructor(
    private commonService: CommonService,
    private auditPlanService:AuditPlanService,
    private router:Router,
    private route:ActivatedRoute
  ) { 
    this.route.paramMap.subscribe((res:ParamMap)=>{
      let Id = res.get('id');
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
      error: (e) =>{
        console.error(e),
        this.commonService.hideLoading();
      } , 
     });
  }

  submit(cid:any){
    this.router.navigateByUrl(`dashboard/evidence/submit/${this.auditPlanId}/${cid}`);  
  }
}