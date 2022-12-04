import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { BsModalRef} from 'ngx-bootstrap/modal';
import { AuditExecutionService } from 'src/app/shared/services/audit-execution/audit-execution.service';
import { CommonService } from 'src/app/shared/services/common/common.service';

@Component({
  selector: 'app-last-year-remarks',
  templateUrl: './last-year-remarks.component.html',
  styleUrls: ['./last-year-remarks.component.css']
})
export class LastYearRemarksComponent implements OnInit {
  data:any;
  auditId:any;
  lastRemarks:any=[];
  constructor(
    private fb:FormBuilder,
    public bsModalRef: BsModalRef,
    private auditExecuteService:AuditExecutionService,
    private commonService: CommonService,
  ) { }

  ngOnInit(): void {
  }

  getRemarks(){
    this.commonService.showLoading();
    const body ={
     auditPlanId: this.auditId,
     regulationId: this.data.id,
     filter: "ByLastYear"
    };
    this.auditExecuteService.getObservationByFilter(body).subscribe({
      next:(res: any) => {
       if(res){
        this.lastRemarks=res;
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
