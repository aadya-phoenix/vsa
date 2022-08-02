import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { dataConstants } from 'src/app/shared/constants/dataConstants';
import { AuthenticationService } from 'src/app/shared/services/auth/authentication.service';

@Component({
  selector: 'app-view-plan-list',
  templateUrl: './view-plan-list.component.html',
  styleUrls: ['./view-plan-list.component.css']
})
export class ViewPlanListComponent implements OnInit {

  getUserrole: any;
  isSuperAdmin = false;
  isPlanner = false;
  isVendor = false;
  SuperAdmin = dataConstants.SuperAdmin;
  Planner = dataConstants.SuperAdmin;
  Vendor = dataConstants.Vendor;

  constructor(
    private router:Router,
    private authService: AuthenticationService,) { 
    this.getUserrole = this.authService.getRolefromlocal();
    console.log("isvendor, userrole",this.isVendor,this.getUserrole);
    this.isSuperAdmin = this.getUserrole.RoleId === this.SuperAdmin.RoleId && this.getUserrole.role === this.SuperAdmin.role;
    this. isPlanner = this.getUserrole.RoleId === this.Planner.RoleId && this.getUserrole.role === this.Planner.role;
    this.isVendor = this.getUserrole.RoleId === this.Vendor.RoleId && this.getUserrole.role === this.Vendor.role;
  }

  ngOnInit(): void {
  }

  viewPlan(){
   this.router.navigateByUrl('dashboard/view-plan/edit');
  }

  assign(){
    this.router.navigateByUrl('dashboard/view-plan/assign');
  }

}
