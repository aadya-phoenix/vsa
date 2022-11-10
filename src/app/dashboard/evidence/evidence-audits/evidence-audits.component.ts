import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { dataConstants } from 'src/app/shared/constants/dataConstants';
import { AuditPlanService } from 'src/app/shared/services/audit-plan/audit-plan.service';
import { AuthenticationService } from 'src/app/shared/services/auth/authentication.service';
import { CommonService } from 'src/app/shared/services/common/common.service';

@Component({
  selector: 'app-evidence-audits',
  templateUrl: './evidence-audits.component.html',
  styleUrls: ['./evidence-audits.component.css']
})
export class EvidenceAuditsComponent implements OnInit {
  dateFormate= dataConstants.dateFormate;
  getUserrole: any;
  isSuperAdmin = false;
  isPlanner = false;
  isVendor = false;
  SuperAdmin = dataConstants.SuperAdmin;
  Planner = dataConstants.SuperAdmin;
  Vendor = dataConstants.Vendor;
  viewPlanObj:any=[];
  pagination = {
    page: 1,
    pageNumber: 1,
    pageSize: 10
  };

  constructor(
    private router:Router,
    private authService: AuthenticationService,
    private auditPlanService:AuditPlanService,
    private commonService: CommonService) { 
    this.getUserrole = this.authService.getRolefromlocal();
    this.isSuperAdmin = this.getUserrole.RoleId === this.SuperAdmin.RoleId && this.getUserrole.role === this.SuperAdmin.role;
    this. isPlanner = this.getUserrole.RoleId === this.Planner.RoleId && this.getUserrole.role === this.Planner.role;
    this.isVendor = this.getUserrole.RoleId === this.Vendor.RoleId && this.getUserrole.role === this.Vendor.role;
  }

  ngOnInit(): void {
    this.getViewPlanList();
  }

  getViewPlanList(){
    this.commonService.showLoading();
    this.auditPlanService.getAuditPlan().subscribe({
      next: (res) => {
        if(res){
         this.viewPlanObj = res;
         this.commonService.hideLoading();
        }
       },
      error: (e) => {
        console.error(e);
        this.commonService.hideLoading();
      }, 
     });
  }

  goToScore(id:any){
    this.router.navigateByUrl(`dashboard/evidence/score/${id}`);
  }

  goToevidence(id:any){
    this.router.navigateByUrl(`dashboard/evidence/score/${id}`);
  }

  pageChanged(event: any) {
    this.pagination.pageNumber = event;
  }

}