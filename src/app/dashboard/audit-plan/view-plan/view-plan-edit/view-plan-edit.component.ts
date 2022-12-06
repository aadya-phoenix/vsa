import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { take } from 'rxjs';
import { dataConstants } from 'src/app/shared/constants/dataConstants';
import { AuditExecutionService } from 'src/app/shared/services/audit-execution/audit-execution.service';
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
  attachUrl:any;

  constructor(
    private authService: AuthenticationService,
    private formBuilder: FormBuilder,
    private auditPlanService:AuditPlanService,
    private auditExeService:AuditExecutionService,
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
      vendorCode: new FormControl('', []),
      vendorName: new FormControl('', []),
      locationName: new FormControl('', [Validators.required]),
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
    if(this.viewPlanId){
      this.getViewPlanDetails();
   //   this.getAttachment();
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
     formData.append('locationName', body.locationName);
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
         this.viewPlanForm.controls['vendorCode'].setValue(this.viewPlanDetails.vendorCode);
         this.viewPlanForm.controls['vendorName'].setValue(this.viewPlanDetails.vendorName);
         this.viewPlanForm.controls['locationName'].setValue(this.viewPlanDetails.locationName);
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
    this.commonService.showLoading();
    this.auditPlanService.getAttachment(this.viewPlanId).pipe(take(1))
      .subscribe({
        next: (response: any) => {
          const downloadLink = document.createElement('a');
          downloadLink.href = URL.createObjectURL(new Blob([response.body], { type: response.body.type }));
          const contentDisposition = response.headers.get('content-disposition');
          const fileName = contentDisposition.split(';')[1].split('filename')[1].split('=')[1].trim().replaceAll('"','');
          console.log("file",fileName)
          downloadLink.download = fileName;
          downloadLink.click();
          this.commonService.hideLoading();
        }, error: (e) => {
          console.error(e);
          this.commonService.hideLoading();
        }
      });
  }

  download(fileName:any){
    this.commonService.showLoading();  
    this.auditExeService.downloadDocument({
      attachement: fileName
    }).subscribe({
      next: (response) => {
        if(response){
          const downloadLink = document.createElement('a');
          downloadLink.href = URL.createObjectURL(new Blob([response.body], { type: response.body.type }));
          const contentDisposition = response.headers.get('content-disposition');
          const fileName = contentDisposition.split(';')[1].split('filename')[1].split('=')[1].trim().replaceAll('"','');
          console.log("file",fileName)
          downloadLink.download = fileName;
          downloadLink.click();
         this.commonService.hideLoading();
        }
       },
      error: (e) => {
        console.error(e);
        this.commonService.hideLoading();
      }
      , 
     });
  }

  dateFormat(date:any){
    const newdate = new Date(date);
    return this.datepipe.transform(newdate,'yyyy-MM-dd');
  }

}
