import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { BsModalRef, BsModalService, ModalOptions } from 'ngx-bootstrap/modal';
import { dataConstants } from 'src/app/shared/constants/dataConstants';
import { AuditExecutionService } from 'src/app/shared/services/audit-execution/audit-execution.service';
import { AuditPlanService } from 'src/app/shared/services/audit-plan/audit-plan.service';
import { AuthenticationService } from 'src/app/shared/services/auth/authentication.service';
import { CommonService } from 'src/app/shared/services/common/common.service';
import Swal from 'sweetalert2';
import { PendingPlanRejectComponent } from '../../audit-plan/pending-plan/pending-plan-reject/pending-plan-reject.component';
import { DpmRejectComponent } from '../dpm-reject/dpm-reject.component';

@Component({
  selector: 'app-dpm-data',
  templateUrl: './dpm-data.component.html',
  styleUrls: ['./dpm-data.component.css']
})
export class DpmDataComponent implements OnInit {
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
    private modalService: BsModalService,
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

  openModal(status:any,item:any){
    const initialState: ModalOptions = {
      initialState: {
       data:item.id,
       status:status,
       title: 'Modal with component'
      }
    };
    this.bsModalRef = this.modalService.show(DpmRejectComponent, initialState);
    this.bsModalRef.content.closeBtnName = 'Close';
    this.bsModalRef.onHidden?.subscribe(() => {
    this. getViewPlanList();
  });
   
  }

  submit(status:any,item:any){
    this.commonService.showLoading();
    const body ={
      auditPlanId: item.id,
      roleId: this.user.RoleId,
      userId: this.user.UserId,
      status: status,
      remark: ""
    };
    this.auditExeService.saveHeadApproval(body).subscribe({
      next:(res: any) => {
        Swal.fire({
          title: 'Audit Plan Approved' ,
          icon: 'success',
        });
        this.getViewPlanList();
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
    this.router.navigateByUrl(`dashboard/evidence/dpm-report/${id}`);
  }

}