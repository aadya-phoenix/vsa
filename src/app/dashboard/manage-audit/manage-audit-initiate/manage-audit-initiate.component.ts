import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { AuditPlanService } from 'src/app/shared/services/audit-plan/audit-plan.service';
import { CommonService } from 'src/app/shared/services/common/common.service';
import { EmployeeMasterService } from 'src/app/shared/services/employee-master/employee-master.service';
import { VendorMasterService } from 'src/app/shared/services/vendor-master/vendor-master.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-manage-audit-initiate',
  templateUrl: './manage-audit-initiate.component.html',
  styleUrls: ['./manage-audit-initiate.component.css']
})
export class ManageAuditInitiateComponent implements OnInit {

  initiateForm:FormGroup;
  auditPlanId:any;
  initiateDetails:any;
  vendorObj:any=[];
  vendorId:any;
  disabled= true;
  
  constructor(
    private fb: FormBuilder,
    private router:Router,
    private route: ActivatedRoute,
    private employeeService:EmployeeMasterService,
    private auditPlanService:AuditPlanService,
    private commonService: CommonService,
    private datepipe:DatePipe
  ) { 
    this.route.paramMap.subscribe((params: ParamMap) => {
      const Id = params.get('id');
      this.auditPlanId = Id ? Id : 0;
    });

    this.initiateForm = this.fb.group({
      vendorName:new FormControl('',[]),
      vendorCode:new FormControl('',[]),
      plannedStartDate:new FormControl('',[]),
      plannedEndDate:new FormControl('',[]),
      partName: new FormControl('',[Validators.required]),
      actualStartDate: new FormControl('',[Validators.required]),
      actualEndDate: new FormControl('',[Validators.required]),
      otherLocation: new FormControl('',[]),
      partNumber:  new FormControl('',[Validators.required]),
    })
  }

  ngOnInit(): void {
    this.getinitiateDetails();
  }

  getinitiateDetails(){
    this.commonService.showLoading();
    this.auditPlanService.getPlanDetails(this.auditPlanId).subscribe({
      next: (res) => {
        if(res){
         this.initiateDetails = res;
         this.vendorId = this.initiateDetails.vendorId;
         this.initiateForm.controls['vendorName'].setValue(this.initiateDetails.vendorName);
         this.initiateForm.controls['vendorCode'].setValue(this.initiateDetails.vendorCode);
         this.initiateForm.controls['plannedStartDate'].setValue(this.dateFormat(this.initiateDetails.plannedStartDate));
         this.initiateForm.controls['plannedEndDate'].setValue(this.dateFormat(this.initiateDetails.plannedEndDate));
         this.initiateForm.controls['partName'].setValue(this.initiateDetails?.partName);
         this.initiateForm.controls['partNumber'].setValue(this.initiateDetails?.partNumber);
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

  next(){
    this.commonService.showLoading();
    if(this.initiateForm.invalid){
      Swal.fire({
        title: 'Please fill all fields.',
        icon: 'error',
      });
      this.commonService.hideLoading();
      return;
    }
    const body = this.initiateForm.value;
    body.id = this.auditPlanId;
    body.vendorId = this.vendorId;
 
    this.auditPlanService.updateInitiatePlan(body).subscribe({
      next:(res: any) => {
        this.router.navigateByUrl(`dashboard/manage-audit/question/${this.auditPlanId}`);
        this.commonService.hideLoading();
      },
      error:(err:any) =>{
        this.commonService.hideLoading();
      }
    }); 
  }

  back(){
    this.router.navigateByUrl(`dashboard/manage-audit`);  
  }

  dateFormat(date:any){
    const newdate = new Date(date);
    return this.datepipe.transform(newdate,'yyyy-MM-dd');
  }

}
