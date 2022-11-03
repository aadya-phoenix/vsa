import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { dataConstants } from 'src/app/shared/constants/dataConstants';
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

  vendorName:string='';
  plannedStartDate:any;
  plannedEndDate:any;
  statusName:string='';

  isClosure1 = true;
  isClosure2 = false;
  isClosure3 = false;

  constructor(
    private router:Router,
    private authService: AuthenticationService,
    private auditPlanService:AuditPlanService,
    private commonService: CommonService) { 
    this.getUserrole = this.authService.getRolefromlocal();
    this.isSuperAdmin = this.getUserrole.RoleId === this.SuperAdmin.RoleId && this.getUserrole.role === this.SuperAdmin.role;
    this.isPlanner = this.getUserrole.RoleId === this.Planner.RoleId && this.getUserrole.role === this.Planner.role;
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
    body.vendorName= this.vendorName;
    body.plannedStartDate = this.plannedStartDate;
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
     this. vendorName = ' ';
     this.plannedStartDate = '';
     this.statusName ='';
    this.plannedEndDate =''
  }

  pendingAction(item:any){
    this.router.navigateByUrl(`dashboard/action-plan/action-pending-plan/${item.id}`); 
  }

  evidence(id:any){
    this.router.navigateByUrl(`dashboard/view-plan/evidence/${id}`); 
  }

  closure2(){
    this.isClosure1 = false;
    this.isClosure2 = false;
    this.isClosure3 = true;
  }

  back(){
   // this.router.navigateByUrl(`dashboard/view-plan`); 
   this.isClosure1 = true;
   this.isClosure2 = false;
   this.isClosure3 = false;
  }

  backevi(){
    // this.router.navigateByUrl(`dashboard/view-plan`); 
    this.isClosure1 = false;
    this.isClosure2 = true;
    this.isClosure3 = false;
  }

  backclose1(){
    // this.router.navigateByUrl(`dashboard/view-plan`); 
    this.isClosure1 = true;
    this.isClosure2 = false;
    this.isClosure3 = false;
  }
  closure1(){}
}
