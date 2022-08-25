import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { AuditExecutionService } from 'src/app/shared/services/audit-execution/audit-execution.service';

@Component({
  selector: 'app-action-plan-observation',
  templateUrl: './action-plan-observation.component.html',
  styleUrls: ['./action-plan-observation.component.css']
})
export class ActionPlanObservationComponent implements OnInit {

  actionPlanList :any;
  actionPlanListToShow :any;
  categoryId:any;
  auditPlanId:any;

  constructor(
    private auditExeService:AuditExecutionService,
    private route:ActivatedRoute
  ) { 
    this.route.paramMap.subscribe((params:ParamMap)=>{
      const id = params.get('id');
      const cid = params.get('cid');
      id ? this.auditPlanId = id : '';
      cid ? this.categoryId = cid : '';
    })
  }

  ngOnInit(): void {
    this.getActionPlanList();
  }

  getActionPlanList(){
    this.auditExeService.getActionPlan({auditPlanId:this.auditPlanId,
      categoryId: this.categoryId}).subscribe({
      next: (res) => {
        if(res){
         this.actionPlanList = res;
         this.actionPlanListToShow = res;
        }
       },
      error: (e) => console.error(e), 
     });
  }

}
