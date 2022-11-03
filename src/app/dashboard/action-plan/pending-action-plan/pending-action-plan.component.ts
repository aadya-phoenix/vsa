import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { dataConstants } from 'src/app/shared/constants/dataConstants';
import { AuditExecutionService } from 'src/app/shared/services/audit-execution/audit-execution.service';
import { CommonService } from 'src/app/shared/services/common/common.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-pending-action-plan',
  templateUrl: './pending-action-plan.component.html',
  styleUrls: ['./pending-action-plan.component.css']
})
export class PendingActionPlanComponent implements OnInit {
  
  dateFormat = dataConstants.dateFormate;
  auditPlanId: any;
  actionPlanList:any = [];
  actionPlanAudi:any=[];

  constructor(
    private auditExeService:AuditExecutionService,
    private commonService: CommonService,
    private router:Router,
    private route:ActivatedRoute
  ) { 
    this.route.paramMap.subscribe((res:ParamMap)=>{
      let Id = res.get('id');
      this.auditPlanId = Id;
    })
  }

  ngOnInit(): void {
  this. getActionPlanList();
  }

  getActionPlanList(){
    this.commonService.showLoading();
    this.auditExeService.getActionPlan({auditPlanId:this.auditPlanId}).subscribe({
      next: (res) => {
        if(res){
         this.actionPlanList = res;
        // this.actionPlanListToShow = res;
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
    this.router.navigateByUrl(`dashboard/view-plan`); 
  }

}
