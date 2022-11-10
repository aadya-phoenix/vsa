import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { dataConstants } from 'src/app/shared/constants/dataConstants';
import { AuthenticationService } from 'src/app/shared/services/auth/authentication.service';
import { CommonService } from 'src/app/shared/services/common/common.service';
import { VendorMasterService } from 'src/app/shared/services/vendor-master/vendor-master.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-vendor-list',
  templateUrl: './vendor-list.component.html',
  styleUrls: ['./vendor-list.component.css']
})
export class VendorListComponent implements OnInit {
 
  getUserrole: any;
  vendorObj:any=[];
  isSuperAdmin = false;
  isPlanner = false;
  SuperAdmin = dataConstants.SuperAdmin;
  Planner = dataConstants.SuperAdmin;
  pagination = {
    page: 1,
    pageNumber: 1,
    pageSize: 10
  }

  constructor(
    private router:Router,
    private authService: AuthenticationService,
    private vendorService:VendorMasterService,
    private commonService: CommonService, 
    ) { 
    this.getUserrole = this.authService.getRolefromlocal();
    this.isSuperAdmin = this.getUserrole.RoleId === this.SuperAdmin.RoleId && this.getUserrole.role === this.SuperAdmin.role;
    this. isPlanner = this.getUserrole.RoleId === this.Planner.RoleId && this.getUserrole.role === this.Planner.role;
  }

  ngOnInit(): void {
    this.getVendorList();
  }

  close(){}

  addVendor(){
    this.router.navigateByUrl('dashboard/vendor/add');
  }

  editVendor(item:any){
    this.router.navigateByUrl(`dashboard/vendor/edit/${item.id}`);  
  }

  getVendorList(){
    this.commonService.showLoading();  
    this.vendorService.getVendor().subscribe({
      next: (res) => {
        if(res){
         this.vendorObj = res;
         this.commonService.hideLoading();
        }
       },
      error: (e) =>{
        console.error(e);
        this.commonService.hideLoading();
      } , 
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
         this.vendorService.delete(item_id).subscribe({
          next :(res:any)=>{
          this.getVendorList();
           Swal.fire(
             'Deleted!',
             'Your request has been deleted.',
             'success'
           )
         },
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
