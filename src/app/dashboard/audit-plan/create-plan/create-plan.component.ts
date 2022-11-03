import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { zip } from 'rxjs';
import { AuditPlanService } from 'src/app/shared/services/audit-plan/audit-plan.service';
import { CommonService } from 'src/app/shared/services/common/common.service';
import { EmployeeMasterService } from 'src/app/shared/services/employee-master/employee-master.service';
import { VendorMasterService } from 'src/app/shared/services/vendor-master/vendor-master.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-create-plan',
  templateUrl: './create-plan.component.html',
  styleUrls: ['./create-plan.component.css']
})
export class CreatePlanComponent implements OnInit {

  public createPlanForm: FormGroup;
  vendorObj:any=[];
  locationObj:any=[];
  selectedFile:any;
 
  constructor(
    private formBuilder: FormBuilder,
    private auditPlanService:AuditPlanService,
    private commonService: CommonService, 
    private employeeService:EmployeeMasterService
  ) { 
    this.createPlanForm = this.formBuilder.group({
      vendorId: new FormControl('', [Validators.required]),
     // vendor_name: new FormControl('', [Validators.required]),
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
    this.getEmployeeList();
    this.getLocation();
  }

  onFileSelected(event:any){
    this.selectedFile = event.target.files[0];
  }

  submit(){
    
    if (this.createPlanForm.invalid) {
      return;
    }
    this.commonService.showLoading();  
    const body = this.createPlanForm.value ;

    const formData = new FormData(); 
    
     formData.append('AttachmentFile', this.selectedFile);
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
     
    this.auditPlanService.add(formData).subscribe({
      next:(res: any) => {
        Swal.fire({
          title: 'Plan Created Successfully',
         // text: 'Please login again!',
          icon: 'success',
        });
        this.commonService.hideLoading();
      },
      error:(err:any) =>{
        this.commonService.hideLoading();
      } 
    }); 
  }

  close(){}

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

}
