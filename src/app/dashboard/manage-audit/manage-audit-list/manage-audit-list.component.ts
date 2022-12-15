import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BsModalRef, BsModalService, ModalOptions } from 'ngx-bootstrap/modal';
import { dataConstants } from 'src/app/shared/constants/dataConstants';
import { AuditExecutionService } from 'src/app/shared/services/audit-execution/audit-execution.service';
import { AuditPlanService } from 'src/app/shared/services/audit-plan/audit-plan.service';
import { AuthenticationService } from 'src/app/shared/services/auth/authentication.service';
import { CommonService } from 'src/app/shared/services/common/common.service';
import { ManageAuditLogComponent } from '../manage-audit-log/manage-audit-log.component';

@Component({
  selector: 'app-manage-audit-list',
  templateUrl: './manage-audit-list.component.html',
  styleUrls: ['./manage-audit-list.component.css']
})
export class ManageAuditListComponent implements OnInit {
  bsModalRef ?: BsModalRef;
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
  vendorCode:any;
  vendorName:string='';
  plannedStartDate:any;
  plannedEndDate:any;
  statusName:string='';
  counters:any;
  searchText:any;
  pagination = {
    page: 1,
    pageNumber: 1,
    pageSize: 10
  }

  constructor(
    private authService: AuthenticationService,
    private modalService: BsModalService,
    private auditPlanService:AuditPlanService,
    private auditExecuteService:AuditExecutionService,
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
    this.getStatusCount();
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

  viewManageAudit(item:any){
    this.router.navigateByUrl(`dashboard/manage-audit/view/${item.id}`);
  }

  addAuditArea(){}

  initiateAudit(item:any){
    this.router.navigateByUrl(`dashboard/manage-audit/initiate/${item.id}`);  
  }

  filter(){
    this.commonService.showLoading();
    const body={} as any;
    body.vendorCode = this.vendorCode;
    body.vendorName= this.vendorName;
    body.plannedStartDate = this.plannedStartDate;
    body.plannedEndDate = this.plannedEndDate;
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
    this.vendorName = ' ';
    this.plannedStartDate = '';
    this.statusName ='';
    this.vendorCode = '';
    this.plannedEndDate = '';
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

  openModal(item:any){
    const initialState: ModalOptions = {
      initialState: {
       data:item.id,
       title: 'Modal with component'
      }
    };
    this.bsModalRef = this.modalService.show(ManageAuditLogComponent, initialState);
    this.bsModalRef.content.closeBtnName = 'Close';
    this.bsModalRef.onHidden?.subscribe(() => {
    });
  }

  goToReport(id:any){
   this.router.navigateByUrl(`dashboard/manage-audit/report/${id}`)
  }

  getStatusCount(){
    this.commonService.showLoading();
    this.auditExecuteService.getStatusCount().subscribe({
      next:(res: any) => {
        this.counters = res;
        this.commonService.hideLoading();
      },
      error:(err:any) =>  {
        console.error(err);
        this.commonService.hideLoading();
      }
    });  
  }
}
