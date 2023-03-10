import { DatePipe } from '@angular/common';
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
  open =1;
  close =3;
  partialClose =2;

  constructor(
    private authService:AuthenticationService,
    private commonService: CommonService,
    private modalService: BsModalService,
    private categoryService:CategoryMasterService,
    private auditExeService:AuditExecutionService,
    private route:ActivatedRoute,
    private datepipe:DatePipe,
    private router:Router
  ) { 
    this.route.paramMap.subscribe((res:ParamMap)=>{
      let Id = res.get('id');
      let Cid = res.get('cid');
      this.auditPlanId = Id;
      this.categoryId = Cid;
    });
    this.userId = this.authService.getLoginDetails().UserId;
  }

  ngOnInit(): void {
    this.getActionPlanList();
    this.getCategoryDetails();
  }

  getActionPlanList(){
    this.commonService.showLoading();
    this.auditExeService.getActionPlan({auditPlanId:this.auditPlanId,categoryId: this.categoryId}).subscribe({
      next: (res) => {
        if(res){
         this.actionPlanList = res;
         this.actionPlanList.forEach((x:any)=>{
          x.dateOfSubmission == "0001-01-01T00:00:00" ?
            x.dateOfSubmission = null : 
          x.dateOfSubmission = this.datepipe.transform( x.dateOfSubmission,'yyyy-MM-dd');
  
          if(x.attachment){
            x.attachment =  x.attachment.split("|");

          }

         });
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
    this.bsModalRef.onHidden?.subscribe(() => {
      this.getActionPlanList();
    });
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

  download(item:any){
    this.commonService.showLoading();  
    this.auditExeService.downloadDocument({
      attachement: item
    }).subscribe({
      next: (response) => {
        if(response){
          const downloadLink = document.createElement('a');
          downloadLink.href = URL.createObjectURL(new Blob([response.body], { type: response.body.type }));
          const contentDisposition = response.headers.get('content-disposition');
          const fileName = contentDisposition.split(';')[1].split('filename')[1].split('=')[1].trim().replaceAll('"','');
          console.log("file",fileName)
          downloadLink.download = fileName;
          downloadLink.click();
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
