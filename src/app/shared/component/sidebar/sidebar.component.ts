import { Component, OnInit } from '@angular/core';
import { dataConstants } from '../../constants/dataConstants';
import { AuthenticationService } from '../../services/auth/authentication.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {

  getUserrole: any;
  isSuperAdmin =false;
  isPlanner =false;
  isVendor =false;
  isAuditor= false;
  SuperAdmin = dataConstants.SuperAdmin;
  Planner = dataConstants.Planner;
  Auditor = dataConstants.Auditor;
  Vendor = dataConstants.Vendor;


  constructor(
    private authService: AuthenticationService,
  ) { 
    this.getUserrole = this.authService.getRolefromlocal();
    this.isSuperAdmin = this.getUserrole.RoleId === this.SuperAdmin.RoleId && this.getUserrole.role === this.SuperAdmin.role;
    this. isPlanner = this.getUserrole.RoleId === this.Planner.RoleId && this.getUserrole.role === this.Planner.role;
    this.isAuditor = this.getUserrole.RoleId === this.Auditor.RoleId && this.getUserrole.role === this.Auditor.role; 
    this.isVendor = this.getUserrole.RoleId === this.Vendor.RoleId && this.getUserrole.role === this.Vendor.role; 
  }

  ngOnInit(): void {
  }

}
