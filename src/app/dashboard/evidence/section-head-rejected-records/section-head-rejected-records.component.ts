import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { dataConstants } from 'src/app/shared/constants/dataConstants';
import { AuditExecutionService } from 'src/app/shared/services/audit-execution/audit-execution.service';
import { AuditPlanService } from 'src/app/shared/services/audit-plan/audit-plan.service';
import { AuthenticationService } from 'src/app/shared/services/auth/authentication.service';
import { CommonService } from 'src/app/shared/services/common/common.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-section-head-rejected-records',
  templateUrl: './section-head-rejected-records.component.html',
  styleUrls: ['./section-head-rejected-records.component.css']
})
export class SectionHeadRejectedRecordsComponent implements OnInit {
  dateFormate = dataConstants.dateFormate;
   accept = 1;
   reject = 2;
   auditPlanId='';
   user:any;
   viewPlanList:any=[];
   pagination = {
    page: 1,
    pageNumber: 1,
    pageSize: 10
  }

  bsModalRef ?: BsModalRef;
  constructor(
    private authService:AuthenticationService,
    private commonService: CommonService,
    private auditExeService:AuditExecutionService,
    private auditPlanService:AuditPlanService,
    private router:Router,
    private formBuilder: FormBuilder,

  ) {

   }

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
         this.viewPlanList = res.filter((x:any)=>{
          x.sectionHeadApprovalStatus == 'Rejected'
         });
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


  pageChanged(event: any) {
    this.pagination.pageNumber = event;
  }

  goToReport(id:any){
    this.router.navigateByUrl(`dashboard/evidence/report/${id}`);
  }

}

