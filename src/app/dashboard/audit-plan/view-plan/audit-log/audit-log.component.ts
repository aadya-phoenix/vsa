import { Component, OnInit } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { dataConstants } from 'src/app/shared/constants/dataConstants';
import { AuditExecutionService } from 'src/app/shared/services/audit-execution/audit-execution.service';
import { CommonService } from 'src/app/shared/services/common/common.service';

@Component({
  selector: 'app-audit-log',
  templateUrl: './audit-log.component.html',
  styleUrls: ['./audit-log.component.css']
})
export class AuditLogComponent implements OnInit {
  data:any;
  dateFormat = dataConstants.dateFormate;
  logDetails:any;
  constructor(
    private auditExecution:AuditExecutionService,
    private commonService:CommonService,
    public bsModalRef: BsModalRef,
  ) { }

  ngOnInit(): void {
    this.getAuditLog();
  }

  getAuditLog(){
    this.commonService.showLoading();
    this.auditExecution.getAuditLog(this.data).subscribe({
      next:(res: any) => {
        this.logDetails = res;
        this.commonService.hideLoading();
      },
      error:(err:any) =>  {
        console.error(err);
        this.commonService.hideLoading();
      }
    });
  }

}
