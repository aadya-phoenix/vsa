import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { dataConstants } from 'src/app/shared/constants/dataConstants';
import { AuthenticationService } from 'src/app/shared/services/auth/authentication.service';
import { VendorMasterService } from 'src/app/shared/services/vendor-master/vendor-master.service';

@Component({
  selector: 'app-vendor-list',
  templateUrl: './vendor-list.component.html',
  styleUrls: ['./vendor-list.component.css']
})
export class VendorListComponent implements OnInit {
 
  getUserrole: any;
  isSuperAdmin = false;
  isPlanner = false;
  SuperAdmin = dataConstants.SuperAdmin;
  Planner = dataConstants.SuperAdmin;

  constructor(
    private router:Router,
    private authService: AuthenticationService,
    private vendorService:VendorMasterService
    ) { 
    this.getUserrole = this.authService.getRolefromlocal();
    this.isSuperAdmin = this.getUserrole.RoleId === this.SuperAdmin.RoleId && this.getUserrole.role === this.SuperAdmin.role;
    this. isPlanner = this.getUserrole.RoleId === this.Planner.RoleId && this.getUserrole.role === this.Planner.role;
  }

  ngOnInit(): void {
    this.getVendor();
  }

  save(){}
  close(){
 
  }
  addVendor(){
    this.router.navigateByUrl('dashboard/vendor/edit');
  }

  getVendor(){
    this.vendorService.getVendor().subscribe((res:any)=>{
      if(res){
        console.log("vendor",res);
        //this.router.navigateByUrl('dashboard');
      }
     });
  }

}
