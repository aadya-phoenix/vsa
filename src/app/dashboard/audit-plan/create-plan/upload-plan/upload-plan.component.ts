import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl } from '@angular/forms';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { AuditPlanService } from 'src/app/shared/services/audit-plan/audit-plan.service';
import { CommonService } from 'src/app/shared/services/common/common.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-upload-plan',
  templateUrl: './upload-plan.component.html',
  styleUrls: ['./upload-plan.component.css']
})
export class UploadPlanComponent implements OnInit {
  public createPlanForm: FormGroup;
  public status: any;
  data:any;
  bulkFile:any;
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

  bulkUpload(event: any) {
    this.bulkFile = event.target.files[0];
  }

  submit(){
    const formData = new FormData();
    formData.append('File', this.bulkFile);
    this.auditPlanService.bulkUpload(formData).subscribe({
      next: (res: any) => {
        Swal.fire({
          title: 'Plan Uploaded Successfully',
          icon: 'success',
        });
        this.bulkFile = '';
        this.commonService.hideLoading();
      },
      error: (err: any) => {
        /* Swal.fire({
          title: 'Please check format & try again',
          icon: 'error',
        }); */
        this.bulkFile = '';
        this.bsModalRef.hide();
        this.commonService.hideLoading();
      }
    });
  }
  
}
