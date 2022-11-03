import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { dataConstants } from 'src/app/shared/constants/dataConstants';
import { AuditExecutionService } from 'src/app/shared/services/audit-execution/audit-execution.service';
import { CommonService } from 'src/app/shared/services/common/common.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-dpm-data',
  templateUrl: './dpm-data.component.html',
  styleUrls: ['./dpm-data.component.css']
})
export class DpmDataComponent implements OnInit {
  dateFormat = dataConstants.dateFormate;
  auditPlanId: any="8d0b375e-113d-47bd-b0dc-701c08ef3cd3";
  actionPlanList:any = [];
  actionPlanAudi:any=[];

  constructor(
    private auditExeService:AuditExecutionService,
    private commonService: CommonService,
    private router:Router,
    private route:ActivatedRoute
  ) { 
 /*    this.route.paramMap.subscribe((res:ParamMap)=>{
      let Id = res.get('id');
      this.auditPlanId = Id;
    }) */
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
    
  }
}