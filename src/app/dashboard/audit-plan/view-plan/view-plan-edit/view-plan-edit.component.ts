import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-view-plan-edit',
  templateUrl: './view-plan-edit.component.html',
  styleUrls: ['./view-plan-edit.component.css']
})
export class ViewPlanEditComponent implements OnInit {
  public viewPlanForm: FormGroup;
  constructor(
    private formBuilder: FormBuilder,
    private router:Router
  ) { 
    this.viewPlanForm = this.formBuilder.group({
      vendor_code: new FormControl('', [Validators.required]),
      vendor_name: new FormControl('', [Validators.required]),
      location: new FormControl('', [Validators.required]),
      other_location: new FormControl('', [Validators.required]),
      other_code: new FormControl('', [Validators.required]),
      code: new FormControl('', [Validators.required]),
      name: new FormControl('', [Validators.required]),
      new_location: new FormControl('', [Validators.required]),
      start_date: new FormControl('', [Validators.required]),
      end_date: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required]),
      auditee_email: new FormControl('', [Validators.required]),
      attachment: new FormControl('', [Validators.required]),
   });
  }

  ngOnInit(): void {
  }

  submit(){}

  close(){
    this.router.navigateByUrl('dashboard/view-plan');
  }

}
