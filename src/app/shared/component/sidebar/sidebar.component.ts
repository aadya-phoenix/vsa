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
    this.isSuperAdmin = this.getUserrole.role?.toLowerCase() === this.SuperAdmin.role.toLowerCase();
    this.isPlanner = this.getUserrole.role?.toLowerCase() === this.Planner.role.toLowerCase();
    this.isAuditor = this.getUserrole.role?.toLowerCase() === this.Auditor.role.toLowerCase(); 
    this.isVendor = this.getUserrole.role?.toLowerCase() === this.Vendor.role.toLowerCase(); 
    this.isSectionHead = this.getUserrole.role?.toLowerCase() === this.SectionHead.role.toLowerCase();
    this.isVerticalHead = this.getUserrole.role?.toLowerCase() === this.VerticalHead.role.toLowerCase();
    this.isDPM = this.getUserrole.role?.toLowerCase() === this.DPM.role.toLowerCase();
  }

  ngOnInit(): void {
  }

}
