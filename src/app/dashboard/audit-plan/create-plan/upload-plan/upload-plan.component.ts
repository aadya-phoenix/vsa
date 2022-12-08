import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl } from '@angular/forms';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { AuditPlanService } from 'src/app/shared/services/audit-plan/audit-plan.service';
import { CommonService } from 'src/app/shared/services/common/common.service';

@Component({
  selector: 'app-upload-plan',
  templateUrl: './upload-plan.component.html',
  styleUrls: ['./upload-plan.component.css']
})
export class UploadPlanComponent implements OnInit {
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
   
  }
  



}
