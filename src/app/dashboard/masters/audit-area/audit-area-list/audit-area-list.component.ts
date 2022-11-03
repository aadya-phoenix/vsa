import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { dataConstants } from 'src/app/shared/constants/dataConstants';
import { AuditAreaMasterService } from 'src/app/shared/services/audit-area-master/audit-area-master.service';
import { AuthenticationService } from 'src/app/shared/services/auth/authentication.service';
import { CommonService } from 'src/app/shared/services/common/common.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-audit-area-list',
  templateUrl: './audit-area-list.component.html',
  styleUrls: ['./audit-area-list.component.css']
})
export class AuditAreaListComponent implements OnInit {

  getUserrole: any;
  isSuperAdmin = false;
  isPlanner = false;
  SuperAdmin = dataConstants.SuperAdmin;
  Planner = dataConstants.SuperAdmin;

  auditAreaObj:any=[];

  constructor(
    private router:Router,
    private authService: AuthenticationService,
    private commonService: CommonService, 
    private auditAreaService:AuditAreaMasterService
    ) { 
    this.getUserrole = this.authService.getRolefromlocal();
    this.isSuperAdmin = this.getUserrole.RoleId === this.SuperAdmin.RoleId && this.getUserrole.role === this.SuperAdmin.role;
    this. isPlanner = this.getUserrole.RoleId === this.Planner.RoleId && this.getUserrole.role === this.Planner.role;
  }

  ngOnInit(): void {
    this.getAuditAreaList();
  }

  close(){
  }

  addAuditArea(){
    this.router.navigateByUrl('dashboard/audit-area/add');
  }

  editAuditArea(item:any){
    this.router.navigateByUrl(`dashboard/audit-area/edit/${item.id}`);  
  }

  getAuditAreaList(){
    this.commonService.showLoading();  
    this.auditAreaService.getAuditArea().subscribe({
      next: (res) => {
        if(res){
         this.auditAreaObj = res;
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
         this.auditAreaService.delete(item_id).subscribe({
          next :(res:any)=>{
          this.getAuditAreaList();
           Swal.fire(
             'Deleted!',
             'Your request has been deleted.',
             'success'
           )},
         error:  (err:any)=>{
         }
        });
       }
     }) 
  }

}
