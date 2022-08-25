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
  isSectionHead = false;
  isVerticalHead = false;
  isDPM = false;
  SuperAdmin = dataConstants.SuperAdmin;
  Planner = dataConstants.Planner;
  Auditor = dataConstants.Auditor;
  Vendor = dataConstants.Vendor;
  SectionHead = dataConstants.SectionHead;
  VerticalHead = dataConstants.VerticalHead;
  DPM = dataConstants.DPM;



  constructor(
    private authService: AuthenticationService,
  ) { 
    this.getUserrole = this.authService.getRolefromlocal();
    this.isSuperAdmin = this.getUserrole.RoleId === this.SuperAdmin.RoleId && this.getUserrole.role === this.SuperAdmin.role;
    this. isPlanner = this.getUserrole.RoleId === this.Planner.RoleId && this.getUserrole.role === this.Planner.role;
    this.isAuditor = this.getUserrole.RoleId === this.Auditor.RoleId && this.getUserrole.role === this.Auditor.role; 
    this.isVendor = this.getUserrole.RoleId === this.Vendor.RoleId && this.getUserrole.role === this.Vendor.role; 
    this.isSectionHead = this.getUserrole.RoleId === this.SectionHead.RoleId && this.getUserrole.role === this.SectionHead.role;
    this.isVerticalHead = this.getUserrole.RoleId === this.VerticalHead.RoleId && this.getUserrole.role === this.VerticalHead.role;
    this.isDPM = this.getUserrole.RoleId === this.DPM.RoleId && this.getUserrole.role === this.DPM.role;
  }

  ngOnInit(): void {
  }

}
