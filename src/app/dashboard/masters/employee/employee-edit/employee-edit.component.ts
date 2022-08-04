import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { EmployeeMasterService } from 'src/app/shared/services/employee-master/employee-master.service';

@Component({
  selector: 'app-employee-edit',
  templateUrl: './employee-edit.component.html',
  styleUrls: ['./employee-edit.component.css']
})
export class EmployeeEditComponent implements OnInit {

  employeeForm: FormGroup;
  employee_id:any;
  employeeDetails:any;
  rolesObj:any=[];
  
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private employeeService:EmployeeMasterService
  ) { 
    this.route.paramMap.subscribe((params: ParamMap) => {
      const Id = params.get('id');
      this.employee_id = Id ? Id : 0;
    });
    this.employeeForm = this.formBuilder.group({
      code: new FormControl('', [Validators.required]),
      name: new FormControl('', [Validators.required]),
      roleId: new FormControl('', [Validators.required]),
   });
  }
  ngOnInit(): void {
    this.getRoles();
    this.employee_id ? this.getEmployeeDetails() : '';
  }

  save(){
    if (this.employeeForm.invalid) {
      return;
    }
    const body = this.employeeForm.value;
    this.employee_id ?  this.editEmployee(body) : this.addEmployee(body); 
  }

  editEmployee(body:any){
    body.id = this.employee_id;
    this.employeeService.edit(body).subscribe({
      next:(res: any) => {
        this.router.navigateByUrl('dashboard/employee'); 
      },
      error:(err:any) =>{
      }
    }); 
  }

  addEmployee(body:any){
    this.employeeService.add(body).subscribe({
      next:(res: any) => {
        this.router.navigateByUrl('dashboard/employee'); 
      },
      error:(err:any) =>{
      }
    }); 
  }

  getEmployeeDetails(){
    this.employeeService.getEmployeeDetails(this.employee_id).subscribe({
      next: (res) => {
        if(res){
         this.employeeDetails = res;
         this.employeeForm.controls['name'].setValue(this.employeeDetails.name);
         this.employeeForm.controls['code'].setValue(this.employeeDetails.code);
         this.employeeForm.controls['roleId'].setValue(this.employeeDetails.roleId);
        }
       },
      error: (e) => console.error(e), 
     });
  }
 
  getRoles(){
    this.employeeService.getRoles().subscribe({
      next: (res) => {
        if(res){
         this.rolesObj = res;
        }
       },
      error: (e) => console.error(e), 
     });
  }

  close(){
    this.router.navigateByUrl("dashboard/employee")
  }
}
