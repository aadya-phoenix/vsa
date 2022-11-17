import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuditPlanService } from 'src/app/shared/services/audit-plan/audit-plan.service';
import { CommonService } from 'src/app/shared/services/common/common.service';
import { EmployeeMasterService } from 'src/app/shared/services/employee-master/employee-master.service';
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
  bulkFile:any;
 
  constructor(
    private formBuilder: FormBuilder,
    private auditPlanService:AuditPlanService,
    private commonService: CommonService, 
    private employeeService:EmployeeMasterService,
    private router:Router
  ) { 
    this.createPlanForm = this.formBuilder.group({
      vendorId: new FormControl('', [Validators.required]),
      locationId: new FormControl('', [Validators.required]),
      otherLocation: new FormControl('', [Validators.required]),
      otherCode: new FormControl('', [Validators.required]),
      typeCode: new FormControl('', []),
      typeName: new FormControl('', []),
      typeLocation: new FormControl('', []),
      plannedStartDate: new FormControl('', [Validators.required]),
      plannedEndDate: new FormControl('', [Validators.required]),
      additionalMSILEmail: new FormControl('', []),
      auditeeEmail: new FormControl('', [Validators.required]),
      attachment: new FormControl('', []),
   });
  }

  ngOnInit(): void {
   this.getEmployeeList();
  }

  onFileSelected(event:any){
    this.selectedFile = event.target.files[0];
  }

  submit(){
    this.commonService.showLoading();
    if (this.createPlanForm.invalid) {
      Swal.fire({
        title: 'Please fill all mandatory fields.',
        icon: 'error',
      });
      this.commonService.hideLoading();
      return;
    }
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
          icon: 'success',
        });
        this.commonService.hideLoading();
      },
      error:(err:any) =>{
        this.commonService.hideLoading();
      } 
    }); 
  }

  getEmployeeList(){
    this.commonService.showLoading();  
    this.employeeService.getEmployee().subscribe({
      next: (res) => {
        if(res){
         this.vendorObj = res.filter((x:any)=>{
          return x.roleId == "ae44799a-e90a-43a1-8c77-e6b68bf3a9f0" &&
          x.roleName == 'Vendor';
         });
         this.commonService.hideLoading();
        }
       },
      error: (e) =>{
        console.error(e);
        this.commonService.hideLoading();
      } , 
     });
  }

  getVendor(event:any){
    let vendorId = event.target.value;
    this.createPlanForm.controls['vendorId'].setValue(vendorId);
    this.getLocation(vendorId);
  }

  getLocation(id:any){
    this.commonService.showLoading(); 
    this.auditPlanService.getLocationByVendor(id).subscribe({
      next: (res) => {
        if(res){
         this.locationObj = res;
         this.commonService.hideLoading();
        }
       },
       error: (e) =>{
        console.error(e);
        this.commonService.hideLoading();
      } , 
     });
  }

  bulkUpload(event:any){
    this.commonService.showLoading();
    this.bulkFile = event.target.files[0];
    console.log("bulk ",this.bulkFile);
    const formData = new FormData(); 
    formData.append('File', this.bulkFile);
    this.auditPlanService.bulkUpload(formData).subscribe({
      next:(res: any) => {
        Swal.fire({
          title: 'Plan Uploaded Successfully',
          icon: 'success',
        });
        this.commonService.hideLoading();
      },
      error:(err:any) =>{
        this.commonService.hideLoading();
      } 
    }); 
  }

  download(){
    this.commonService.showLoading();  
    this.auditPlanService.downloadTemplate().subscribe({
      next: (res) => {
        if(res){
          let fileName = res.headers.get('content-disposition')?.
          split(';')[1].split('=')[1];
          let blob:Blob =res.body as Blob;
          let a = document.createElement('a');
          a.download = fileName;
          a.href =window.URL.createObjectURL(blob);
          a.click();
         this.commonService.hideLoading();
        }
       },
      error: (e) =>{
        console.error(e);
        this.commonService.hideLoading();
      } , 
     });
  }

  close(){
    this.router.navigateByUrl('/dashboard');
  }

}
