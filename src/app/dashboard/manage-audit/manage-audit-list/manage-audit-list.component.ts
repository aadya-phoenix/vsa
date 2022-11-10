import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { dataConstants } from 'src/app/shared/constants/dataConstants';
import { AuditPlanService } from 'src/app/shared/services/audit-plan/audit-plan.service';
import { AuthenticationService } from 'src/app/shared/services/auth/authentication.service';
import { CommonService } from 'src/app/shared/services/common/common.service';

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
  viewPlanList:any=[];
  viewPlanListToShow :any=[];

  vendorName:string='';
  plannedStartDate:any;
  statusName:string='';

  pagination = {
    page: 1,
    pageNumber: 1,
    pageSize: 10
  }

  
  constructor(
    private authService: AuthenticationService,
    private auditPlanService:AuditPlanService,
    private commonService: CommonService,
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
    this.commonService.showLoading();
    this.auditPlanService.getAuditPlan().subscribe({
      next: (res) => {
        if(res){
         this.viewPlanList = res;
         this.viewPlanListToShow = res;
         this.commonService.hideLoading();
        }
       },
      error: (e) =>   {
        console.error(e);
        this.commonService.hideLoading();
      } , 
     });
  }

  viewManageAudit(){
    this.router.navigateByUrl(`dashboard/manage-audit/view`);
  }

  addAuditArea(){}

  initiateAudit(item:any){
    this.router.navigateByUrl(`dashboard/manage-audit/initiate/${item.id}`);  
  }

  filter(){
    this.commonService.showLoading();
    const body={} as any;
    body.vendorName= this.vendorName;
    body.plannedStartDate = this.plannedStartDate;
    body.statusName= this.statusName;

    this.auditPlanService.filter(body).subscribe({
      next:(res: any) => {
        this.viewPlanListToShow = res;
        this.commonService.hideLoading();
      },
      error:(err:any) =>   {
        console.error(err);
        this.commonService.hideLoading();
      } 
    }); 

  }

  reset(){
    this.viewPlanListToShow = this.viewPlanList;
     this. vendorName = ' ';
     this.plannedStartDate = '';
     this.statusName ='';
  }

  pageChanged(event: any) {
    this.pagination.pageNumber = event;
  }
}
