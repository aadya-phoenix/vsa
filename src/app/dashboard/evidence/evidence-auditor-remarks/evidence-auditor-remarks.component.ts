import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { AuditExecutionService } from 'src/app/shared/services/audit-execution/audit-execution.service';
import { AuditPlanService } from 'src/app/shared/services/audit-plan/audit-plan.service';
import { CommonService } from 'src/app/shared/services/common/common.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-evidence-auditor-remarks',
  templateUrl: './evidence-auditor-remarks.component.html',
  styleUrls: ['./evidence-auditor-remarks.component.css']
})
export class EvidenceAuditorRemarksComponent implements OnInit {

  public auditorRemakForm: FormGroup;
  public status: any;
  data:any;
  userId:any

  constructor(  
    public bsModalRef: BsModalRef,
    private formBuilder: FormBuilder,
    private commonService: CommonService,
    private auditPlanService:AuditPlanService,
    private auditExeService:AuditExecutionService,
    ) {
    this.auditorRemakForm = this.formBuilder.group({
      comment: new FormControl('', []),
    })
   }

  ngOnInit(): void {
  }

  submit(){    
    this.commonService.showLoading();
    const body  = this.auditorRemakForm.value;
    this.auditExeService.updateEvidenceReceived({
      observationAction:this.status,
      observationActionRemark:body.comment,
      id:this.data.id}).subscribe({
      next: (res) => {
        if(res){
          Swal.fire({
            title: res.message,
            icon: 'success',
          });
          this.bsModalRef.hide();
          this.commonService.hideLoading();
        }
       },
       error: (e) => {
        console.error(e);
        this.commonService.hideLoading();
      },
     }); 

  }
}
