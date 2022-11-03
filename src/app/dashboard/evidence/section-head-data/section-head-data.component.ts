import { ConditionalExpr } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AuditExecutionService } from 'src/app/shared/services/audit-execution/audit-execution.service';
import { AuditPlanService } from 'src/app/shared/services/audit-plan/audit-plan.service';
import { AuthenticationService } from 'src/app/shared/services/auth/authentication.service';
import { CommonService } from 'src/app/shared/services/common/common.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-section-head-data',
  templateUrl: './section-head-data.component.html',
  styleUrls: ['./section-head-data.component.css']
})
export class SectionHeadDataComponent implements OnInit {

   accept = 1;
   reject = 0;
   auditPlanId='';
   user:any;
   viewPlanList:any=[];

  constructor(
    private authService:AuthenticationService,
    private commonService: CommonService,
    private auditExeService:AuditExecutionService,
    private auditPlanService:AuditPlanService,
    private router:Router,
    private route:ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.user = this.authService.getLoginDetails();
    this.getViewPlanList();
  }

  getViewPlanList(){
    this.commonService.showLoading();
    this.auditPlanService.getAuditPlan().subscribe({
      next: (res) => {
        if(res){
         this.viewPlanList = res;
         this.commonService.hideLoading();
        }
       },
      error: (e) => 
      {
        console.error(e);
        this.commonService.hideLoading();
      } 
     });
  }

  submit(status:any,id:any){
    this.commonService.showLoading();
    const body ={
      auditPlanId: id,
      roleId: this.user.RoleId,
      userId: this.user.UserId,
      status: status,
      remark: ""
    };
    this.auditExeService.saveHeadApproval(body).subscribe({
      next:(res: any) => {
        Swal.fire({
          title: res.message,
          icon: 'success',
        });
        this.commonService.hideLoading();
      },
      error:(err:any) =>{
        console.error(err);
        this.commonService.hideLoading();
      } 
    });  
  }

}