import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-create-plan',
  templateUrl: './create-plan.component.html',
  styleUrls: ['./create-plan.component.css']
})
export class CreatePlanComponent implements OnInit {

  public createPlanForm: FormGroup;
  constructor(
    private formBuilder: FormBuilder,
  ) { 
    this.createPlanForm = this.formBuilder.group({
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

  close(){}

}
