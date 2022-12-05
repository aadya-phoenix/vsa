import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormArray, FormControl, Validators } from '@angular/forms';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { AuditPlanService } from 'src/app/shared/services/audit-plan/audit-plan.service';
import { CommonService } from 'src/app/shared/services/common/common.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-vendor-attendees',
  templateUrl: './vendor-attendees.component.html',
  styleUrls: ['./vendor-attendees.component.css']
})
export class VendorAttendeesComponent implements OnInit {
  executiveSummaryForm:FormGroup;
  data:any;
  auditPlanId:any;
  constructor(
    private fb:FormBuilder,
    private commonService: CommonService,
    private auditPlanService:AuditPlanService,
    public bsModalRef: BsModalRef,
  ) { 
    this.executiveSummaryForm=this.fb.group({
      vendorAttendee: this.fb.array([])
    });
   
  }

  ngOnInit(): void {
    this.vendorAttendeeArray.push(this.addMoreVendorAttendee({vendor:'',auditId:this.data}));
  }

  get vendorAttendeeArray(): FormArray {
    return this.executiveSummaryForm.get("vendorAttendee") as FormArray;
  }

  addVendorAttendee(auditorVal: any) {
    return this.vendorAttendeeArray.push(this.addMoreVendorAttendee(auditorVal));
  }

  addMoreVendorAttendee(auditorVal: any) {
    return this.fb.group({
      vendorAttendee: new FormControl(auditorVal.vendor, [Validators.required]),
      auditPlanId: new FormControl(this.data)
    });
  }

  removeVendorAttendee(i: any) {
    this.vendorAttendeeArray.removeAt(i);
  } 

  saveVendorAttendee(){
    this.commonService.showLoading();
    const body = this.executiveSummaryForm.value;
    const data = {
      vendorAttendee: body.vendorAttendee
    };
    this.auditPlanService.saveVendorAttendees(data).subscribe({
      next:(res: any) => {
        Swal.fire({
          title: res.message,
          icon: 'success',
        });
        this.commonService.hideLoading();
      },
      error:(err:any) =>{
        this.commonService.hideLoading();
      } 
    }); 
  }


}
