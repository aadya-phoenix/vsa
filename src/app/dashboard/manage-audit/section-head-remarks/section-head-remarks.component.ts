import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { AuditExecutionService } from 'src/app/shared/services/audit-execution/audit-execution.service';
import { CommonService } from 'src/app/shared/services/common/common.service';

@Component({
  selector: 'app-section-head-remarks',
  templateUrl: './section-head-remarks.component.html',
  styleUrls: ['./section-head-remarks.component.css']
})
export class SectionHeadRemarksComponent implements OnInit {
  data:any;
  auditId:any;
  sectionRemarks:any=[];

  constructor(
    private fb:FormBuilder,
    public bsModalRef: BsModalRef,
    private auditExecuteService:AuditExecutionService,
    private commonService: CommonService,

  ) { }

  ngOnInit(): void {
    this.getRemarks();
  }

  getRemarks(){
    this.commonService.showLoading();
    const body ={
      auditPlanId: this.auditId,
      regulationId: this.data.id,
      filter: "BySectionHead"
     };
    this.auditExecuteService.getObservationByFilter(body).subscribe({
      next:(res: any) => {
        if(res){
          this.sectionRemarks = res;
        }
        this.commonService.hideLoading();
      },
      error:(err:any) =>  {
        console.error(err);
        this.commonService.hideLoading();
      }
    }); 
  }

}
