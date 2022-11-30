import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl } from '@angular/forms';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { AuditExecutionService } from 'src/app/shared/services/audit-execution/audit-execution.service';
import { AuditPlanService } from 'src/app/shared/services/audit-plan/audit-plan.service';
import { CommonService } from 'src/app/shared/services/common/common.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-dpm-reject',
  templateUrl: './dpm-reject.component.html',
  styleUrls: ['./dpm-reject.component.css']
})
export class DpmRejectComponent implements OnInit {
  public rejectForm: FormGroup;
  public status: any;
  id:any;
  user:any;

  constructor(
    public bsModalRef: BsModalRef,
    private formBuilder: FormBuilder,
    private auditExeService:AuditExecutionService,
    private commonService: CommonService
  ) {
    this.rejectForm = this.formBuilder.group({
      remark: new FormControl('', []),
    });
   }

  ngOnInit(): void {
  }

  submit(){
    this.commonService.showLoading();
      const body = this.rejectForm.value;
      body.auditPlanId = this.id;
      body.roleId= this.user.RoleId;
      body.userId= this.user.UserId;
      body.status= this.status;
 
    this.auditExeService.saveHeadApproval(body).subscribe({
      next:(res: any) => {
        Swal.fire({
          title:' Audit Plan Rejected',
          icon: 'success',
        });
        this.bsModalRef.hide();
        this.commonService.hideLoading();
      },
      error:(err:any) =>{
        console.error(err);
        this.commonService.hideLoading();
      } 
    });  
  }


}
