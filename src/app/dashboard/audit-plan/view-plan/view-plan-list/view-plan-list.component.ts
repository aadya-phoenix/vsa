import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ItemsList } from '@ng-select/ng-select/lib/items-list';
import { dataConstants } from 'src/app/shared/constants/dataConstants';
import { AuditExecutionService } from 'src/app/shared/services/audit-execution/audit-execution.service';
import { AuditPlanService } from 'src/app/shared/services/audit-plan/audit-plan.service';
import { AuthenticationService } from 'src/app/shared/services/auth/authentication.service';
import { CommonService } from 'src/app/shared/services/common/common.service';

@Component({
  selector: 'app-view-plan-list',
  templateUrl: './view-plan-list.component.html',
  styleUrls: ['./view-plan-list.component.css']
})
export class ViewPlanListComponent implements OnInit {
  dateFormate= dataConstants.dateFormate;
  getUserrole: any;
  isSuperAdmin = false;
  isPlanner = false;
  isVendor = false;
  SuperAdmin = dataConstants.SuperAdmin;
  Planner = dataConstants.Planner;
  Vendor = dataConstants.Vendor;
  viewPlanList:any=[];
  viewPlanListToShow:any = [];
  counters:any=[];
  vendorName:string='';
  vendorCode:any;
  plannedStartDate:any = null;
  plannedEndDate:any = null;
  statusName:string='';
  pagination = {
    page: 1,
    pageNumber: 1,
    pageSize: 10
  }
  Accepted = 'Accepted';
  Final = 'Final';

  constructor(
    private router:Router,
    private authService: AuthenticationService,
    private auditPlanService:AuditPlanService,
    private auditExecuteService:AuditExecutionService,
    private commonService: CommonService) { 
    this.getUserrole = this.authService.getRolefromlocal();
    this.isSuperAdmin = this.getUserrole.RoleId === this.SuperAdmin.RoleId && this.getUserrole.role === this.SuperAdmin.role;
    this.isPlanner = this.getUserrole.RoleId === this.Planner.RoleId && this.getUserrole.role === this.Planner.role;
    this.isVendor = this.getUserrole.RoleId === this.Vendor.RoleId && this.getUserrole.role === this.Vendor.role;
  }

  ngOnInit(): void {
    this.getDashboardCounters();
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
      error: (e) => 
      {
        console.error(e);
        this.commonService.hideLoading();
      } 
     });
  }

  viewPlan(item:any){
    this.router.navigateByUrl(`dashboard/view-plan/edit/${item.id}`);
  }

  assign(item:any){
    this.router.navigateByUrl(`dashboard/view-plan/assign/${item.id}`);
  }

  filter(){
    const body={} as any;
    body.vendorCode = this.vendorCode;
    body.vendorName= this.vendorName;
    body.plannedStartDate = this.plannedStartDate;
    body.plannedEndDate = this.plannedEndDate;
    body.statusName= this.statusName;
    this.commonService.showLoading();
    this.auditPlanService.filter(body).subscribe({
      next:(res: any) => {
        this.viewPlanListToShow = res;
        this.commonService.hideLoading();
      },
      error:(err:any) =>  {
        console.error(err);
        this.commonService.hideLoading();
      }
    }); 
  }

  reset(){
    this.viewPlanListToShow = this.viewPlanList;
    this.vendorCode = '';
    this. vendorName = ' ';
    this.plannedStartDate = null;
    this.plannedEndDate =null;
    this.statusName ='';
  }

  pendingAction(item:any){
    this.router.navigateByUrl(`dashboard/action-plan/action-pending-plan/${item.id}`); 
  }

  evidence(id:any){
    this.router.navigateByUrl(`dashboard/view-plan/evidence/${id}`); 
  }

  pageChanged(event: any) {
    this.pagination.pageNumber = event;
  }

  getDashboardCounters(){
    this.commonService.showLoading();
    this.auditExecuteService.getDashboardCounters().subscribe({
      next:(res: any) => {
        this.counters = res[0];
        this.commonService.hideLoading();
      },
      error:(err:any) =>  {
        console.error(err);
        this.commonService.hideLoading();
      }
    }); 
  }

}
