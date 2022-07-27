import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-view-plan-assign',
  templateUrl: './view-plan-assign.component.html',
  styleUrls: ['./view-plan-assign.component.css']
})
export class ViewPlanAssignComponent implements OnInit {

  assignAuditorForm:FormGroup;

  constructor(
    private fb:FormBuilder,
    private router:Router
  ) { 
    this.assignAuditorForm=this.fb.group({
      assignAuditor: this.fb.array([]),
   });
   this.assignAuditorArray.push(this.addMoreAuditor(''));
  }

  ngOnInit(): void {
  }

  assign(){}

 
  close(){
      this.router.navigateByUrl('dashboard/view-plan');
  }

  get assignAuditorArray(): FormArray {
    return this.assignAuditorForm.get("assignAuditor") as FormArray;
  }

  addAuditor(auditorVal: string) {
    return this.assignAuditorArray.push(this.addMoreAuditor(auditorVal));
  }

  addMoreAuditor(auditorVal: string) {
    return this.fb.group({
      auditor: new FormControl(auditorVal, [Validators.required]),
    });
  }

  removeAuditor(i: any) {
    this.assignAuditorArray.removeAt(i);
  }

}
