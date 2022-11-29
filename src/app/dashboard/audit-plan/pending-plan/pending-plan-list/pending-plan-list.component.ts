import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BsModalRef, BsModalService, ModalOptions } from 'ngx-bootstrap/modal';
import { dataConstants } from 'src/app/shared/constants/dataConstants';
import { AuditPlanService } from 'src/app/shared/services/audit-plan/audit-plan.service';
import { AuthenticationService } from 'src/app/shared/services/auth/authentication.service';
import { CommonService } from 'src/app/shared/services/common/common.service';
import Swal from 'sweetalert2';
import { PendingPlanRejectComponent } from '../pending-plan-reject/pending-plan-reject.component';

@Component({
  selector: 'app-pending-plan-list',
  templateUrl: './pending-plan-list.component.html',
  styleUrls: ['./pending-plan-list.component.css']
})
export class PendingPlanListComponent implements OnInit {
  dateFormate= dataConstants.dateFormate;
  getUserrole: any;
  isSuperAdmin = false;
  isPlanner = false;
  isVendor = false;
  SuperAdmin = dataConstants.SuperAdmin;
  Planner = dataConstants.SuperAdmin;
  Vendor = dataConstants.Vendor;
  viewPlanObj:any=[];
  accept=false;
  reject=true;
  bsModalRef ?: BsModalRef;
  pagination = {
    page: 1,
    pageNumber: 1,
    pageSize: 10
  }
  searchText:any;

  constructor(
    private router:Router,
    private modalService: BsModalService,
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

  getVendorAction(status:any,item:any){
    this.commonService.showLoading();
    const body = {
    auditPlanId: item.id,
    comment: "test",
    isRejected : status
    };
     this.auditPlanService.vendorAction(body).subscribe({
     next:(res: any) => {
      Swal.fire({
        title: res.message,
        icon: 'success',
      });
      this.getViewPlanList();
      this.commonService.hideLoading();
      },
      error:(err:any) =>{
        this.commonService.hideLoading();
      } 
    });  
  }

  openModal(status:any,item:any){
    const initialState: ModalOptions = {
      initialState: {
       data:item,
       status:status,
       title: 'Modal with component'
      }
    };
    this.bsModalRef = this.modalService.show(PendingPlanRejectComponent, initialState);
    this.bsModalRef.content.closeBtnName = 'Close';
    this.getViewPlanList();
  }

  pageChanged(event: any) {
    this.pagination.pageNumber = event;
  }

}
