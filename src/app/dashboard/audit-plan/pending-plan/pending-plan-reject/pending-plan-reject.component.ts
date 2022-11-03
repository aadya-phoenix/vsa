import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormGroup, FormBuilder, FormControl } from '@angular/forms';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { AuditPlanService } from 'src/app/shared/services/audit-plan/audit-plan.service';
import { CommonService } from 'src/app/shared/services/common/common.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-pending-plan-reject',
  templateUrl: './pending-plan-reject.component.html',
  styleUrls: ['./pending-plan-reject.component.css']
})
export class PendingPlanRejectComponent implements OnInit {

  public createPlanForm: FormGroup;
  public status: any;
  data:any;

  constructor(
    public bsModalRef: BsModalRef,
    private formBuilder: FormBuilder,
    private auditPlanService:AuditPlanService,
    private commonService: CommonService
  ) {
    this.createPlanForm = this.formBuilder.group({
      comment: new FormControl('', []),
    })
   }

  ngOnInit(): void {
  }

  submit(){
    this.commonService.showLoading();
    const body  = this.createPlanForm.value;
    body.auditPlanId = this.data.id;
    body.isRejected = this.status;
     this.auditPlanService.vendorAction(body).subscribe({
     next:(res: any) => {
      Swal.fire({
        title: res.message,
        icon: 'success',
      })
      this.bsModalRef.hide();
      this.commonService.hideLoading();
      },
      error:(err:any) =>{
        this.commonService.hideLoading();

      } 
    });  
  }

}
