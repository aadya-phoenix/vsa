import { ConditionalExpr } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { dataConstants } from 'src/app/shared/constants/dataConstants';
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
  dateFormate = dataConstants.dateFormate;
   accept = 1;
   reject = 0;
   auditPlanId='';
   user:any;
   viewPlanList:any=[];
   pagination = {
    page: 1,
    pageNumber: 1,
    pageSize: 10
  }


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
          title: status == this.accept ? 'Audit Plan Approved' : ' Audit Plan Rejected',
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

  pageChanged(event: any) {
    this.pagination.pageNumber = event;
  }

  goToReport(id:any){
    window.open(`dashboard/evidence/report/${id}`, "_blank"); 
  }

}
