import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { dataConstants } from 'src/app/shared/constants/dataConstants';
import { AuditPlanService } from 'src/app/shared/services/audit-plan/audit-plan.service';
import { AuthenticationService } from 'src/app/shared/services/auth/authentication.service';

@Component({
  selector: 'app-manage-audit-list',
  templateUrl: './manage-audit-list.component.html',
  styleUrls: ['./manage-audit-list.component.css']
})
export class ManageAuditListComponent implements OnInit {
  dateFormate= dataConstants.dateFormate;
  getUserrole: any;
  isSuperAdmin =false;
  isPlanner =false;
  isAuditor= false;
  SuperAdmin = dataConstants.SuperAdmin;
  Planner = dataConstants.Planner;
  Auditor = dataConstants.Auditor;
  Vendor = dataConstants.Vendor;
  viewPlanObj:any=[];
  
  constructor(
    private authService: AuthenticationService,
    private auditPlanService:AuditPlanService,
    private router:Router
  ) { 
    this.getUserrole = this.authService.getRolefromlocal();
    this.isSuperAdmin = this.getUserrole.RoleId === this.SuperAdmin.RoleId && this.getUserrole.role === this.SuperAdmin.role;
    this. isPlanner = this.getUserrole.RoleId === this.Planner.RoleId && this.getUserrole.role === this.Planner.role;
    this.isAuditor = this.getUserrole.RoleId === this.Auditor.RoleId && this.getUserrole.role === this.Auditor.role; 
    
  }

  ngOnInit(): void {
    this.getViewPlanList();
  }

  getViewPlanList(){
    this.auditPlanService.getAuditPlan().subscribe({
      next: (res) => {
        if(res){
         this.viewPlanObj = res;
        }
       },
      error: (e) => console.error(e), 
     });
  }


  viewManageAudit(){
    this.router.navigateByUrl(`dashboard/manage-audit/view`);
  }

  addAuditArea(){}

  initiateAudit(item:any){
    this.router.navigateByUrl(`dashboard/manage-audit/initiate/${item.id}`);  
  }
}
