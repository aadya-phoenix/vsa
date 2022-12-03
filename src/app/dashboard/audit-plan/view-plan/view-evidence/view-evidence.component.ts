import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { AuditExecutionService } from 'src/app/shared/services/audit-execution/audit-execution.service';
import { CommonService } from 'src/app/shared/services/common/common.service';

@Component({
  selector: 'app-view-evidence',
  templateUrl: './view-evidence.component.html',
  styleUrls: ['./view-evidence.component.css']
})
export class ViewEvidenceComponent implements OnInit {

  auditPlanId:any;
  obsList:any=[];

  constructor(
    private auditExeService:AuditExecutionService,
    private commonService: CommonService,
    private route:ActivatedRoute,
    private router:Router
  ) { 
    this.route.paramMap.subscribe((params:ParamMap)=>{
      const id = params.get('id');
      id ? this.auditPlanId = id : '' ; 
    })
  }

  ngOnInit(): void {
    this. getActionObservation();
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

  back(){
    this.router.navigateByUrl('dashboard/view-plan');
  }

  closure(){
    this.router.navigateByUrl(`dashboard/view-plan/closure/${this.auditPlanId}`);
  }

}
