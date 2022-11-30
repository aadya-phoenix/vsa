import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { BsModalRef, BsModalService, ModalOptions } from 'ngx-bootstrap/modal';
import { dataConstants } from 'src/app/shared/constants/dataConstants';
import { AuditExecutionService } from 'src/app/shared/services/audit-execution/audit-execution.service';
import { AuthenticationService } from 'src/app/shared/services/auth/authentication.service';
import { CategoryMasterService } from 'src/app/shared/services/category-master/category-master.service';
import { CommonService } from 'src/app/shared/services/common/common.service';
import Swal from 'sweetalert2';
import { EvidenceAuditorRemarksComponent } from '../evidence-auditor-remarks/evidence-auditor-remarks.component';

@Component({
  selector: 'app-evidence-received',
  templateUrl: './evidence-received.component.html',
  styleUrls: ['./evidence-received.component.css']
})
export class EvidenceReceivedComponent implements OnInit {

  dateFormat = dataConstants.dateFormate;
  actionPlanList:any=[];
  observationAction:any;
  id:any;
  auditPlanId :any;
  pagination = {
    page: 1,
    pageNumber: 1,
    pageSize: 10
  }
  userId:any;
  bsModalRef ?: BsModalRef;
  categoryId:any;
  categoryName:any;
  constructor(
    private authService:AuthenticationService,
    private commonService: CommonService,
    private modalService: BsModalService,
    private categoryService:CategoryMasterService,
    private auditExeService:AuditExecutionService,
    private route:ActivatedRoute,
    private router:Router
  ) { 
    this.route.paramMap.subscribe((res:ParamMap)=>{
      let Id = res.get('id');
      // Id ? this.auditPlanId = Id : this.auditPlanId="8d0b375e-113d-47bd-b0dc-701c08ef3cd3";
       let Cid = res.get('cid');
       this.auditPlanId = Id;
       this.categoryId = Cid;
    });
    this.userId = this.authService.getLoginDetails().UserId;
  }

  ngOnInit(): void {
    this. getActionPlanList();
    this.getCategoryDetails();
  }

  getActionPlanList(){
    this.commonService.showLoading();
    this.auditExeService.getActionPlan({auditPlanId:this.auditPlanId,categoryId: this.categoryId}).subscribe({
      next: (res) => {
        if(res){
         this.actionPlanList = res;
         this.commonService.hideLoading();
        }
       },
      error: (e) => {
        console.error(e);
        this.commonService.hideLoading();
      }, 
     });
  }

  observeAction(status:number,id:any){
    this.observationAction = status;
    this.id= id;
    this.save();
  }

  save(){
    this.commonService.showLoading();
    this.auditExeService.updateEvidenceReceived({observationAction:this.observationAction,id:this.id}).subscribe({
      next: (res) => {
        if(res){
          Swal.fire({
            title: res.message,
            icon: 'success',
          })
          this.commonService.hideLoading();
        }
       },
       error: (e) => {
        console.error(e);
        this.commonService.hideLoading();
      },
     }); 
  }

  pageChanged(event: any) {
    this.pagination.pageNumber = event;
  }

  openModal(status:any,item:any){
    const initialState: ModalOptions = {
      initialState: {
       data:item,
       status:status,
       userId:this.userId,
       title: 'Modal with component'
      }
    };
    this.bsModalRef = this.modalService.show(EvidenceAuditorRemarksComponent, initialState);
    this.bsModalRef.content.closeBtnName = 'Close';
  }

  back(){
    this.router.navigateByUrl(`dashboard/evidence/category/${this.auditPlanId}`);
  }

  getCategoryDetails(){
    this.commonService.showLoading();  
    this.categoryService.getCategoryDetails(this.categoryId).subscribe({
      next: (res) => {
        if(res){
         this.categoryName = res.name;
         this.commonService.hideLoading();
        }
       },
      error: (e) => {
        console.error(e);
        this.commonService.hideLoading();
      }
      , 
     });
  }

}
