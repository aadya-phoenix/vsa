import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { AuditPlanService } from 'src/app/shared/services/audit-plan/audit-plan.service';

@Component({
  selector: 'app-manage-audit-question-category',
  templateUrl: './manage-audit-question-category.component.html',
  styleUrls: ['./manage-audit-question-category.component.css']
})
export class ManageAuditQuestionCategoryComponent implements OnInit {

  executiveSummaryForm:FormGroup;
  auditPlanId:any;

  categoryScoreList:any;

  constructor(
    private fb:FormBuilder,
    private auditPlanService:AuditPlanService,
    private router:Router,
    private route:ActivatedRoute
  ) { 
    this.executiveSummaryForm=this.fb.group({
      criticalObservation: this.fb.array([]),
      vendorAttendee: this.fb.array([])
    });

    this.route.paramMap.subscribe((params:ParamMap)=>{
      const Id = params.get('id');
      this.auditPlanId = Id ? Id : 0;
    })
   this.criticalObservationArray.push(this.addMoreCriticalObservation(''));
   this.vendorAttendeeArray.push(this.addMoreVendorAttendee(''));
  }

  ngOnInit(): void {
    this.getCategoryList();
  }

  getCategoryList(){
    this.auditPlanService.getScoreAndCategoryList({id:this.auditPlanId}).subscribe({
      next: (res) => {
        if(res){
         this.categoryScoreList = res;
        }
       },
      error: (e) => console.error(e), 
     });
  }

  saveCriticalObservation(){
    const body = this.executiveSummaryForm.value;
    const data ={
      criticalObservation:body.criticalObservation
    } ;
    this.auditPlanService.saveCriticalObservation(data).subscribe({
      next:(res: any) => {
      },
      error:(err:any) =>{
      } 
    }); 

  }

  saveVendorAttendee(){
    const body = this.executiveSummaryForm.value;
    const data = {
      vendorAttendee: body.vendorAttendee
    };
    this.auditPlanService.saveVendorAttendees(data).subscribe({
      next:(res: any) => {
      },
      error:(err:any) =>{
      } 
    }); 
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

  get vendorAttendeeArray(): FormArray {
    return this.executiveSummaryForm.get("vendorAttendee") as FormArray;
  }

  addVendorAttendee(auditorVal: string) {
    return this.vendorAttendeeArray.push(this.addMoreVendorAttendee(auditorVal));
  }

  addMoreVendorAttendee(auditorVal: string) {
    return this.fb.group({
      vendorAttendee: new FormControl(auditorVal, [Validators.required]),
      auditPlanId: new FormControl(this.auditPlanId)
    });
  }

  removeVendorAttendee(i: any) {
    this.vendorAttendeeArray.removeAt(i);
  } 

  details(id:any){
    this.router.navigateByUrl(`dashboard/manage-audit/question-details/${this.auditPlanId}/${id}`);
  }

  viewSummary(){
    this.router.navigateByUrl('dashboard/manage-audit/summary');
  }

  back(){
    this.router.navigateByUrl('dashboard/manage-audit/initiate');
  }

}
