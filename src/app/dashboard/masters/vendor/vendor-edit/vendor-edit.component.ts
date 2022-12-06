import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { dataConstants } from 'src/app/shared/constants/dataConstants';
import { CommonService } from 'src/app/shared/services/common/common.service';
import { EmployeeMasterService } from 'src/app/shared/services/employee-master/employee-master.service';
import { VendorMasterService } from 'src/app/shared/services/vendor-master/vendor-master.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-vendor-edit',
  templateUrl: './vendor-edit.component.html',
  styleUrls: ['./vendor-edit.component.css']
})
export class VendorEditComponent implements OnInit {

  vendorForm:FormGroup;
  vendor_id:any;
  vendorDetails:any;
  vendorRoleId = dataConstants.Vendor.RoleId;
  vendorRoleName = dataConstants.Vendor.role;

  constructor(
    private fb:FormBuilder,
    private employeeService:EmployeeMasterService,
    private router:Router,
    private route: ActivatedRoute,
    private commonService: CommonService, 
  ) {
    this.route.paramMap.subscribe((params: ParamMap) => {
      const Id = params.get('id');
      this.vendor_id = Id ? Id : 0;
    });
    this.vendorForm = this.fb.group({
      name: new FormControl('',[Validators.required]),
      code: new FormControl('',[Validators.required]),
      userName:new FormControl('', [Validators.required]),
    });
   }

  ngOnInit(): void {
   this.vendor_id ? this.getVendorDetails() : '';
  }

  get vendorLocationArray(): FormArray {
    return this.vendorForm.get("vendor_location") as FormArray;
  }

  addLocation(locationVal: string) {
    return this.vendorLocationArray.push(this.addMoreLocation(locationVal));
  }

  addMoreLocation(locationVal: string) {
    return this.fb.group({
      location: new FormControl(locationVal, [Validators.required]),
    });
  }

  removeLocation(i: any) {
    this.vendorLocationArray.removeAt(i);
  }

  getVendorDetails(){
    this.commonService.showLoading();  
    this.employeeService.getEmployeeDetails(this.vendor_id).subscribe({
      next: (res) => {
        if(res){
         this.vendorDetails = res;
         this.vendorForm.controls['name'].setValue(this.vendorDetails.name);
         this.vendorForm.controls['code'].setValue(this.vendorDetails.code);
         this.commonService.hideLoading();
        }
       },
      error: (e) =>{
        console.error(e);
        this.commonService.hideLoading();
      } , 
     });
  }
  
  save(){
    if (this.vendorForm.invalid) {
      Swal.fire({
        title: 'Please fill all fields.',
        icon: 'error',
      });
      return;
    }
    const body = this.vendorForm.value;
    this.vendor_id ?  this.editVendor(body) : this.addVendor(body); 
  }

  editVendor(body:any){
    this.commonService.showLoading();  
    body.id = this.vendor_id;
    body.roleId = this.vendorRoleId;
    body.roleName = this.vendorRoleName;
    this.employeeService.edit(body).subscribe({
      next:(res: any) => {
        Swal.fire({
          title: 'Vendor Edited Successfully',
          icon: 'success',
        });
        this.router.navigateByUrl('dashboard/vendor'); 
        this.commonService.hideLoading();
      },
      error:(err:any) =>{
        this.commonService.hideLoading();
      }
    }); 
  }

  addVendor(body:any){
    this.commonService.showLoading();
    body.roleId = this.vendorRoleId;
    body.roleName = this.vendorRoleName;  
    this.employeeService.add(body).subscribe({
      next:(res: any) => {
        Swal.fire({
          title: 'Vendor Created Successfully',
          icon: 'success',
        });
        this.commonService.hideLoading();
        this.router.navigateByUrl('dashboard/vendor'); 
      },
      error:(err:any) =>{
        this.commonService.hideLoading();
      }
    }); 
  }

  close(){
   this.router.navigateByUrl('dashboard/vendor'); 
  }

  
}