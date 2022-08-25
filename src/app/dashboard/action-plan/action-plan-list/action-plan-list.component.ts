import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuditPlanService } from 'src/app/shared/services/audit-plan/audit-plan.service';

@Component({
  selector: 'app-action-plan-list',
  templateUrl: './action-plan-list.component.html',
  styleUrls: ['./action-plan-list.component.css']
})
export class ActionPlanListComponent implements OnInit {

  auditPlanList:any=[];

  constructor(
    private router:Router,
    private auditService:AuditPlanService
  ) { }

  ngOnInit(): void {
    this.getAuditPlan();
  }

  getAuditPlan(){
    this.auditService.getAuditPlan().subscribe({
      next:(res)=>{
        if(res){
          this.auditPlanList = res;
        }
      },
      error:(e)=>{
        console.error(e);
      }
    });
  }

  goToCategory(id:any){
   this.router.navigateByUrl(`dashboard/action-plan/category/${id}`);
  }

  gridView1(){}

}
