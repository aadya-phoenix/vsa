import { ConditionalExpr } from '@angular/compiler';
import { Component, OnInit, TemplateRef } from '@angular/core';
import { FormGroup, FormBuilder, FormControl } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { BsModalRef, BsModalService, ModalOptions } from 'ngx-bootstrap/modal';
import { dataConstants } from 'src/app/shared/constants/dataConstants';
import { AuditExecutionService } from 'src/app/shared/services/audit-execution/audit-execution.service';
import { AuditPlanService } from 'src/app/shared/services/audit-plan/audit-plan.service';
import { AuthenticationService } from 'src/app/shared/services/auth/authentication.service';
import { CommonService } from 'src/app/shared/services/common/common.service';
import Swal from 'sweetalert2';
import { SectionHeadRejectComponent } from '../section-head-reject/section-head-reject.component';

@Component({
  selector: 'app-section-head-data',
  templateUrl: './section-head-data.component.html',
  styleUrls: ['./section-head-data.component.css']
})
export class SectionHeadDataComponent implements OnInit {
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
  public rejectForm: FormGroup;
  bsModalRef ?: BsModalRef;
  constructor(
    private authService:AuthenticationService,
    private commonService: CommonService,
    private auditExeService:AuditExecutionService,
    private auditPlanService:AuditPlanService,
    private router:Router,
    private modalService: BsModalService,
    private formBuilder: FormBuilder,
    private route:ActivatedRoute
  ) {
    this.rejectForm = this.formBuilder.group({
      comment: new FormControl('', []),
    });
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
          title: status == this.accept ? 'Audit Plan Approved' : ' Audit Plan Rejected',
          icon: 'success',
        });
        this.commonService.hideLoading();
        this.getViewPlanList();
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
    this.router.navigateByUrl(`dashboard/evidence/report/${id}`);
  }

  openModal(status:any,item:any){
    const initialState: ModalOptions = {
      initialState: {
       data:item.id,
       user:this.user,
       status:status,
       title: 'Modal with component'
      }
    };
    this.bsModalRef = this.modalService.show(SectionHeadRejectComponent, initialState);
    this.bsModalRef.content.closeBtnName = 'Close';
    this.bsModalRef.onHidden?.subscribe(() => {
      this. getViewPlanList();
  });
   
  }

  addRemark(item:any){
    this.router.navigateByUrl(`dashboard/evidence/remark/${item.id}`);
  }

}
