import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { dataConstants } from 'src/app/shared/constants/dataConstants';
import { AuditExecutionService } from 'src/app/shared/services/audit-execution/audit-execution.service';
import { AuthenticationService } from 'src/app/shared/services/auth/authentication.service';
import { CommonService } from 'src/app/shared/services/common/common.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-action-plan-observation',
  templateUrl: './action-plan-observation.component.html',
  styleUrls: ['./action-plan-observation.component.css']
})
export class ActionPlanObservationComponent implements OnInit {
  dateFormat = dataConstants.dateFormate;
  actionPlanList :any=[];
  actionPlanListToShow :any;
  categoryId:any;
  auditPlanId:any;
  userId:any;
  pagination = {
    page: 1,
    pageNumber: 1,
    pageSize: 10
  }

  constructor(
    private authService:AuthenticationService,
    private commonService: CommonService,
    private auditExeService:AuditExecutionService,
    private route:ActivatedRoute
  ) { 
    this.route.paramMap.subscribe((params:ParamMap)=>{
      const id = params.get('id');
      const cid = params.get('cid');
      id ? this.auditPlanId = id : '';
      cid ? this.categoryId = cid : '';
    });
    this.userId = this.authService.getLoginDetails().UserId;
  }

  ngOnInit(): void {
    this.getActionPlanList();
  }

  getActionPlanList(){
    this.commonService.showLoading();
    this.auditExeService.getActionPlan({auditPlanId:this.auditPlanId,
      categoryId: this.categoryId}).subscribe({
      next: (res) => {
        if(res){
         this.actionPlanList = res;
         this.actionPlanListToShow = res;
         this.commonService.hideLoading();
        }
       },
      error: (e) => {
        console.error(e);
        this.commonService.hideLoading();
      }, 
     });
  }

  submit(){
    this.commonService.showLoading();
    this.actionPlanList.forEach((element:any) => {
      element.auditPlanId = this.auditPlanId;
      element.createdBy = this.userId;
    });

    this.auditExeService.saveActionPlan(this.actionPlanList).subscribe({
      next: (res) => {
        if(res){
          Swal.fire({
            title: res.message,
            icon: 'success',
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

  pageChanged(event: any) {
    this.pagination.pageNumber = event;
  } 

}
