import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormArray, FormControl, Validators } from '@angular/forms';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { AuditPlanService } from 'src/app/shared/services/audit-plan/audit-plan.service';
import { CommonService } from 'src/app/shared/services/common/common.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-critical-observation',
  templateUrl: './critical-observation.component.html',
  styleUrls: ['./critical-observation.component.css']
})
export class CriticalObservationComponent implements OnInit {
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
      criticalObservation: this.fb.array([]),
    });
    this.criticalObservationArray.push(this.addMoreCriticalObservation(''));
  }

  ngOnInit(): void {
  }

  get criticalObservationArray(): FormArray {
    return this.executiveSummaryForm.get("criticalObservation") as FormArray;
  }

  addCriticalObservation(auditorVal: string) {
    return this.criticalObservationArray.push(this.addMoreCriticalObservation(auditorVal));
  }

  addMoreCriticalObservation(auditorVal: string) {
    return this.fb.group({
      criticalObservation: new FormControl(auditorVal, [Validators.required]),
      auditPlanId: new FormControl(this.auditPlanId)
    });
  }

  removeCriticalObservation(i: any) {
    this.criticalObservationArray.removeAt(i);
  }

  saveCriticalObservation(){
    this.commonService.showLoading();
    const body = this.executiveSummaryForm.value;
    const data ={
      criticalObservation:body.criticalObservation
    } ;
    this.auditPlanService.saveCriticalObservation(data).subscribe({
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
