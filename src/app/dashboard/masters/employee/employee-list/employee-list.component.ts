import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { dataConstants } from 'src/app/shared/constants/dataConstants';
import { AuthenticationService } from 'src/app/shared/services/auth/authentication.service';
import { CommonService } from 'src/app/shared/services/common/common.service';
import { EmployeeMasterService } from 'src/app/shared/services/employee-master/employee-master.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.css']
})
export class EmployeeListComponent implements OnInit {
  dateFormat = dataConstants.dateFormate;
  getUserrole: any;
  isSuperAdmin = false;
  isPlanner = false;
  SuperAdmin = dataConstants.SuperAdmin;
  Planner = dataConstants.SuperAdmin;
  employeeObj:any=[];
  pagination = {
    page: 1,
    pageNumber: 1,
    pageSize: 10
  }
  searchText:any;
  constructor(
    private router:Router,
    private commonService: CommonService, 
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
    this.commonService.showLoading();  
    this.employeeService.getEmployee().subscribe({
      next: (res) => {
        if(res){
         this.employeeObj = res;
         this.employeeObj = res.filter((x: any) => {
          return x.roleId != "ae44799a-e90a-43a1-8c77-e6b68bf3a9f0" &&
            x.roleName != 'Vendor';
        });
         this.commonService.hideLoading();
        }
       },
      error: (e) => {
        console.error(e);
        this.commonService.hideLoading();
      }, 
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

  pageChanged(event: any) {
    this.pagination.pageNumber = event;
  }

}
