import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { dataConstants } from 'src/app/shared/constants/dataConstants';
import { AuditExecutionService } from 'src/app/shared/services/audit-execution/audit-execution.service';
import { AuthenticationService } from 'src/app/shared/services/auth/authentication.service';
import { CategoryMasterService } from 'src/app/shared/services/category-master/category-master.service';
import { CommonService } from 'src/app/shared/services/common/common.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-action-plan-update',
  templateUrl: './action-plan-update.component.html',
  styleUrls: ['./action-plan-update.component.css']
})
export class ActionPlanUpdateComponent implements OnInit {
  dateFormat = dataConstants.dateFormate;
  auditPlanId: any;
  categoryId:any;
  actionPlanList:any = [];
  actionPlanAudi:any=[];
  pagination = {
    page: 1,
    pageNumber: 1,
    pageSize: 10
  }
  categoryName:any;
  constructor(
    private auditExeService:AuditExecutionService,
    private commonService: CommonService,
    private categoryService:CategoryMasterService,
    private router:Router,
    private route:ActivatedRoute
  ) { 
    this.route.paramMap.subscribe((res:ParamMap)=>{
      let Id = res.get('id');
      const cid = res.get('cid');
      this.auditPlanId = Id;
      cid ? this.categoryId = cid : '';
    })
  }

  ngOnInit(): void {
  this. getActionPlanList();
  this.getCategoryDetails();
  }

  getActionPlanList(){
    this.commonService.showLoading();
    this.auditExeService.getActionPlan({auditPlanId:this.auditPlanId}).subscribe({
      next: (res) => {
        if(res){
         this.actionPlanList = res;
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

  submit(status:any){
    this.commonService.showLoading();
    this.actionPlanList.forEach((element:any) => {
      element.remark = element.remarkOfAuditor;
      this.actionPlanAudi.push({id:element.id,remark:element.remark});
    });
    this.auditExeService.actionPlanRemarks(this.actionPlanAudi).subscribe({
      next: (res) => {
        if(res){
          const data ={
            id: this.auditPlanId,
            isActionPlanRejected: status == 'accept' ? 1 : 0
           };
           this.auditExeService.actionPlanApproval(data).subscribe({
            next: (res) => {
              if(res){
                this.commonService.hideLoading();
                Swal.fire({
                  title: res.message,
                //  text: 'Please login again!',
                  icon: 'success',
                })
              }
             },
            error: (e) => {
              console.error(e);
              this.commonService.hideLoading();
            }, 
           }); 
        }
       },
      error: (e) => {
        console.error(e);
        this.commonService.hideLoading();
        Swal.fire({
          title: e,
        //  text: 'Please login again!',
          icon: 'error',
        })
      }, 
     }); 
  }

  close(){
    this.router.navigateByUrl(`dashboard/action-plan/auditor/category/${this.auditPlanId}`);
  }

  pageChanged(event: any) {
    this.pagination.pageNumber = event;
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