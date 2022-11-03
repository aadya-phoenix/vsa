import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { dataConstants } from 'src/app/shared/constants/dataConstants';
import { AuditPlanService } from 'src/app/shared/services/audit-plan/audit-plan.service';
import { AuthenticationService } from 'src/app/shared/services/auth/authentication.service';
import { CommonService } from 'src/app/shared/services/common/common.service';
import { EmployeeMasterService } from 'src/app/shared/services/employee-master/employee-master.service';
import { VendorMasterService } from 'src/app/shared/services/vendor-master/vendor-master.service';

@Component({
  selector: 'app-view-plan-edit',
  templateUrl: './view-plan-edit.component.html',
  styleUrls: ['./view-plan-edit.component.css']
})
export class ViewPlanEditComponent implements OnInit {
  public viewPlanForm: FormGroup;
  getUserrole: any;
  isSuperAdmin = false;
  isPlanner = false;
  isVendor = false;
  SuperAdmin = dataConstants.SuperAdmin;
  Planner = dataConstants.Planner;
  Vendor = dataConstants.Vendor;
  locationObj:any=[];
  vendorObj:any=[];
  viewPlanId:any;
  viewPlanDetails:any;

  constructor(
    private authService: AuthenticationService,
    private formBuilder: FormBuilder,
    private auditPlanService:AuditPlanService,
    private employeeService:EmployeeMasterService,
    private router:Router,
    private route: ActivatedRoute,
    private commonService: CommonService, 
    private datepipe:DatePipe
    
  ) { 
    this.getUserrole = this.authService.getRolefromlocal();
    this.isSuperAdmin = this.getUserrole.RoleId === this.SuperAdmin.RoleId && this.getUserrole.role === this.SuperAdmin.role;
    this. isPlanner = this.getUserrole.RoleId === this.Planner.RoleId && this.getUserrole.role === this.Planner.role;
    this.isVendor = this.getUserrole.RoleId === this.Vendor.RoleId && this.getUserrole.role === this.Vendor.role;

    this.route.paramMap.subscribe((params: ParamMap) => {
      const Id = params.get('id');
      this.viewPlanId = Id ? Id : 0;
    });
    
    this.viewPlanForm = this.formBuilder.group({
      vendorId: new FormControl('', []),
      locationId: new FormControl('', [Validators.required]),
      otherLocation: new FormControl('', [Validators.required]),
      otherCode: new FormControl('', [Validators.required]),
      typeCode: new FormControl('', [Validators.required]),
      typeName: new FormControl('', [Validators.required]),
      typeLocation: new FormControl('', [Validators.required]),
      plannedStartDate: new FormControl('', [Validators.required]),
      plannedEndDate: new FormControl('', [Validators.required]),
      additionalMSILEmail: new FormControl('', [Validators.required]),
      auditeeEmail: new FormControl('', [Validators.required]),
      attachment: new FormControl('', []),
   });
  }

  ngOnInit(): void {
    this.getLocation();
    this.getEmployeeList();
    if(this.viewPlanId){
      this.getViewPlanDetails();
      this.getAttachment();
    }
  }

  submit(){
    if (this.viewPlanForm.invalid) {
      return;
    }
    const body = this.viewPlanForm.value;
    body.id = this.viewPlanId;
    
    const formData = new FormData();
     formData.append('Id', body.id);  
     formData.append('vendorId', body.vendorId); 
     formData.append('locationId', body.locationId);
     formData.append('otherLocation', body.otherLocation);
     formData.append('otherCode', body.otherCode);
     formData.append('typeCode', body.typeCode);
     formData.append('typeName', body.typeName);
     formData.append('typeLocation', body.typeLocation);
     formData.append('plannedStartDate', body.plannedStartDate);
     formData.append('plannedEndDate', body.plannedEndDate);
     formData.append('additionalMSILEmail', body.additionalMSILEmail);
     formData.append('auditeeEmail', body.auditeeEmail);
    this.auditPlanService.edit(formData).subscribe({
      next:(res: any) => {
        this.router.navigateByUrl('dashboard/view-plan'); 
      },
      error:(err:any) =>{
      }
    }); 
  }

  close(){
    this.router.navigateByUrl('dashboard/view-plan');
  }

  getViewPlanDetails(){
    this.commonService.showLoading();  
    this.auditPlanService.getPlanDetails(this.viewPlanId).subscribe({
      next: (res) => {
        if(res){
         this.viewPlanDetails = res;
         this.viewPlanForm.controls['vendorId'].setValue(this.viewPlanDetails.vendorId);
         this.viewPlanForm.controls['locationId'].setValue(this.viewPlanDetails.locationId);
         this.viewPlanForm.controls['otherLocation'].setValue(this.viewPlanDetails.otherLocation);
         this.viewPlanForm.controls['otherCode'].setValue(this.viewPlanDetails.otherCode);
         this.viewPlanForm.controls['typeCode'].setValue(this.viewPlanDetails.typeCode);
         this.viewPlanForm.controls['typeName'].setValue(this.viewPlanDetails.typeName);
         this.viewPlanForm.controls['typeLocation'].setValue(this.viewPlanDetails.typeLocation);
         this.viewPlanForm.controls['plannedEndDate'].setValue(this.dateFormat(this.viewPlanDetails.plannedEndDate));
         this.viewPlanForm.controls['plannedStartDate'].setValue(this.dateFormat(this.viewPlanDetails.plannedStartDate));
         this.viewPlanForm.controls['additionalMSILEmail'].setValue(this.viewPlanDetails.additionalMSILEmail);
         this.viewPlanForm.controls['auditeeEmail'].setValue(this.viewPlanDetails.auditeeEmail);
         this.commonService.hideLoading();
        }
       },
      error: (e) => {
        console.error(e);
        this.commonService.hideLoading();
      }, 
     });
  }

  getAttachment(){
    this.auditPlanService.getAttachment(this.viewPlanId).subscribe({
      next: (res) => {
        if(res){
          console.log("attachment",res)
        }
      },
     error: (e) => console.error(e), 
    });
  }

  getLocation(){
    this.auditPlanService.getLocation().subscribe({
      next: (res) => {
        if(res){
         this.locationObj = res;
        }
       },
      error: (e) => console.error(e), 
     });
  }

  getEmployeeList(){
    this.employeeService.getEmployee().subscribe({
      next: (res) => {
        if(res){
          this.vendorObj = res.filter((x:any)=>{
            return x.roleId == "ae44799a-e90a-43a1-8c77-e6b68bf3a9f0" &&
            x.roleName == 'Vendor';
           });
        }
       },
      error: (e) => console.error(e), 
     });
  }

  dateFormat(date:any){
    const newdate = new Date(date);
    return this.datepipe.transform(newdate,'yyyy-MM-dd');
  }

}
