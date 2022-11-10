import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { dataConstants } from 'src/app/shared/constants/dataConstants';
import { AuditExecutionService } from 'src/app/shared/services/audit-execution/audit-execution.service';
import { CommonService } from 'src/app/shared/services/common/common.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-evidence-received',
  templateUrl: './evidence-received.component.html',
  styleUrls: ['./evidence-received.component.css']
})
export class EvidenceReceivedComponent implements OnInit {

  dateFormat = dataConstants.dateFormate;
  //auditPlanId="8d0b375e-113d-47bd-b0dc-701c08ef3cd3";
  actionPlanList:any=[];
  observationAction:any;
  id:any;
  auditPlanId :any;
  pagination = {
    page: 1,
    pageNumber: 1,
    pageSize: 10
  }


  constructor(
    private commonService: CommonService,
    private auditExeService:AuditExecutionService,
    private route:ActivatedRoute
  ) { 
    this.route.paramMap.subscribe((res:ParamMap)=>{
      let Id = res.get('id');
       Id ? this.auditPlanId = Id : this.auditPlanId="8d0b375e-113d-47bd-b0dc-701c08ef3cd3";
    });
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
       //  this.actionPlanListToShow = res;
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
  }

  save(){
    this.commonService.showLoading();
    this.auditExeService.updateEvidenceReceived({observationAction:this.observationAction,id:this.id}).subscribe({
      next: (res) => {
        if(res){
          Swal.fire({
            title: res.message,
          //  text: 'Please login again!',
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


}
