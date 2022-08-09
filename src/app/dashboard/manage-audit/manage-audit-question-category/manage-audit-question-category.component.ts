import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-manage-audit-question-category',
  templateUrl: './manage-audit-question-category.component.html',
  styleUrls: ['./manage-audit-question-category.component.css']
})
export class ManageAuditQuestionCategoryComponent implements OnInit {

  executiveSummaryForm:FormGroup;
  auditorId:any;

  constructor(
    private fb:FormBuilder,
    private router:Router
  ) { 
    this.executiveSummaryForm=this.fb.group({
      criticalObservation: this.fb.array([]),
      vendorAttendee: this.fb.array([])
    });
   this.criticalObservationArray.push(this.addMoreCriticalObservation(''));
   this.vendorAttendeeArray.push(this.addMoreVendorAttendee(''));
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
      auditPlanId: new FormControl(this.auditorId)
    });
  }

  removeCriticalObservation(i: any) {
    this.criticalObservationArray.removeAt(i);
  }

  get vendorAttendeeArray(): FormArray {
    return this.executiveSummaryForm.get("vendorAttendee") as FormArray;
  }

  addVendorAttendee(auditorVal: string) {
    return this.vendorAttendeeArray.push(this.addMoreVendorAttendee(auditorVal));
  }

  addMoreVendorAttendee(auditorVal: string) {
    return this.fb.group({
      vendorAttendee: new FormControl(auditorVal, [Validators.required]),
      auditPlanId: new FormControl(this.auditorId)
    });
  }

  removeVendorAttendee(i: any) {
    this.vendorAttendeeArray.removeAt(i);
  } 


  details(){
    this.router.navigateByUrl('dashboard/manage-audit/question-details');
  }

  viewSummary(){
    this.router.navigateByUrl('dashboard/manage-audit/summary');
  }

  back(){
    this.router.navigateByUrl('dashboard/manage-audit/initiate');
  }

}
