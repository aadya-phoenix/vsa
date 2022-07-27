import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-employee-edit',
  templateUrl: './employee-edit.component.html',
  styleUrls: ['./employee-edit.component.css']
})
export class EmployeeEditComponent implements OnInit {

  employeeForm: FormGroup;
  
  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
  ) { 
    this.employeeForm = this.formBuilder.group({
      employee_code: new FormControl('', [Validators.required]),
      employee_name: new FormControl('', [Validators.required]),
      employee_role: new FormControl('', [Validators.required]),
   });
  }
  ngOnInit(): void {
  }

  addEmployee(){
    
  }
  
  close(){
    this.router.navigateByUrl("dashboard/employee")
  }

  save(){}
  

}
