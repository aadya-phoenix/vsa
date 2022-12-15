import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { CommonService } from 'src/app/shared/services/common/common.service';
import { EmployeeMasterService } from 'src/app/shared/services/employee-master/employee-master.service';
import Swal from 'sweetalert2';

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
    private commonService: CommonService,
    private employeeService:EmployeeMasterService
  ) { 
    this.route.paramMap.subscribe((params: ParamMap) => {
      const Id = params.get('id');
      this.employee_id = Id ? Id : 0;
    });
    this.employeeForm = this.formBuilder.group({
      code: new FormControl('', [Validators.required]),
      name: new FormControl('', [Validators.required]),
      email:new FormControl('', [Validators.required]),
      roleId: new FormControl('', [Validators.required]),
      userName:new FormControl('', [Validators.required]),
   });
  }
  ngOnInit(): void {
    this.getRoles();
    this.employee_id ? this.getEmployeeDetails() : '';
  }

  save(){
    if (this.employeeForm.invalid) {
      Swal.fire({
        title: 'Please fill all fields.',
        icon: 'error',
      });
      return;
    }
    const body = this.employeeForm.value;
    this.employee_id ?  this.editEmployee(body) : this.addEmployee(body); 
  }

  editEmployee(body:any){
    this.commonService.showLoading();  
    body.id = this.employee_id;
    this.employeeService.edit(body).subscribe({
      next:(res: any) => {
        this.commonService.hideLoading();
        Swal.fire({
          title: 'User Edited Successfully',
          icon: 'success',
        })
        this.router.navigateByUrl('dashboard/employee'); 
      },
      error:(err:any) =>{
        this.commonService.hideLoading();
      }
    }); 
  }

  addEmployee(body:any){
    this.commonService.showLoading();
    this.employeeService.add(body).subscribe({
      next:(res: any) => {
        this.router.navigateByUrl('dashboard/employee'); 
        Swal.fire({
          title: 'User Created Successfully',
          icon: 'success',
        })
        this.commonService.hideLoading();
      },
      error:(err:any) =>{
        this.commonService.hideLoading();
      }
    }); 
  }

  getEmployeeDetails(){
    this.commonService.showLoading();  
    this.employeeService.getEmployeeDetails(this.employee_id).subscribe({
      next: (res) => {
        if(res){
         this.employeeDetails = res;
         this.employeeForm.controls['name'].setValue(this.employeeDetails.name);
         this.employeeForm.controls['code'].setValue(this.employeeDetails.code);
         this.employeeForm.controls['email'].setValue(this.employeeDetails.email);
         this.employeeForm.controls['roleId'].setValue(this.employeeDetails.roleId);
         this.employeeForm.controls['userName'].setValue(this.employeeDetails.userName);
         this.commonService.hideLoading();
        }
       },
      error: (e) =>{
        console.error(e);
        this.commonService.hideLoading();
      } , 
     });
  }
 
  getRoles(){
    this.employeeService.getRoles().subscribe({
      next: (res) => {
        if(res){
         let roles = res;
         this.rolesObj = roles.filter((a:any) => {
          return (a.name != "Admin" &&  a.name != "Vendor" );
        });
        }
       },
      error: (e) => console.error(e), 
     });
  }

  close(){
    this.router.navigateByUrl("dashboard/employee");
  }
}
