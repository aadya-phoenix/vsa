import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { dataConstants } from 'src/app/shared/constants/dataConstants';
import { AuthenticationService } from 'src/app/shared/services/auth/authentication.service';
import { EmployeeMasterService } from 'src/app/shared/services/employee-master/employee-master.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.css']
})
export class EmployeeListComponent implements OnInit {

  getUserrole: any;
  isSuperAdmin = false;
  isPlanner = false;
  SuperAdmin = dataConstants.SuperAdmin;
  Planner = dataConstants.SuperAdmin;
  employeeObj:any=[];

  constructor(
    private router:Router,
    private authService: AuthenticationService,
    private employeeService:EmployeeMasterService) { 
    this.getUserrole = this.authService.getRolefromlocal();
    this.isSuperAdmin = this.getUserrole.RoleId === this.SuperAdmin.RoleId && this.getUserrole.role === this.SuperAdmin.role;
    this. isPlanner = this.getUserrole.RoleId === this.Planner.RoleId && this.getUserrole.role === this.Planner.role;
  }

  ngOnInit(): void {
    this.getEmployeeList(); 
  }

  addEmployee(){
  this.router.navigateByUrl("dashboard/employee/add");
  }

  
  editEmployee(item:any){
    this.router.navigateByUrl(`dashboard/employee/edit/${item.id}`);  
  }

  getEmployeeList(){
    this.employeeService.getEmployee().subscribe({
      next: (res) => {
        if(res){
         this.employeeObj = res;
        }
       },
      error: (e) => console.error(e), 
     });
  }

  delete(item_id: any){
    Swal.fire({
       title: 'Are you sure want to remove?',
       text: 'You will not be able to recover this request!',
       icon: 'warning',
       showCancelButton: true,
       confirmButtonText: 'Yes, delete it!',
       cancelButtonText: 'No, keep it'
     }).then((result) => {
       if (result.value) {
         this.employeeService.delete(item_id).subscribe({
          next :(res:any)=>{
          this.getEmployeeList();
           Swal.fire(
             'Deleted!',
             'Your request has been deleted.',
             'success'
           )},
         error:  (err:any)=>{
         }
        })
       }
     }) 
  }

}
