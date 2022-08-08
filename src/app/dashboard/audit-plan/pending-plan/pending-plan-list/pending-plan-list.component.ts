import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BsModalRef, BsModalService, ModalOptions } from 'ngx-bootstrap/modal';
import { dataConstants } from 'src/app/shared/constants/dataConstants';
import { AuditPlanService } from 'src/app/shared/services/audit-plan/audit-plan.service';
import { AuthenticationService } from 'src/app/shared/services/auth/authentication.service';
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

  constructor(
    private router:Router,
    private modalService: BsModalService,
    private authService: AuthenticationService,
    private auditPlanService:AuditPlanService,) { 
    this.getUserrole = this.authService.getRolefromlocal();
    this.isSuperAdmin = this.getUserrole.RoleId === this.SuperAdmin.RoleId && this.getUserrole.role === this.SuperAdmin.role;
    this. isPlanner = this.getUserrole.RoleId === this.Planner.RoleId && this.getUserrole.role === this.Planner.role;
    this.isVendor = this.getUserrole.RoleId === this.Vendor.RoleId && this.getUserrole.role === this.Vendor.role;
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

  getVendorAction(status:any,item:any){
    const body = {
    auditPlanId: item.id,
    comment: "test",
    isRejected : status
    };
     this.auditPlanService.vendorAction(body).subscribe({
     next:(res: any) => {
      },
      error:(err:any) =>{
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
  }

}
