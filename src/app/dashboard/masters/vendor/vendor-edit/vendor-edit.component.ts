import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { CommonService } from 'src/app/shared/services/common/common.service';
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

  constructor(
    private fb:FormBuilder,
    private vendorService:VendorMasterService,
    private router:Router,
    private route: ActivatedRoute,
    private commonService: CommonService, 
    private datepipe:DatePipe
  ) {
    this.route.paramMap.subscribe((params: ParamMap) => {
      const Id = params.get('id');
      this.vendor_id = Id ? Id : 0;
    });
    this.vendorForm = this.fb.group({
      name: new FormControl('',[Validators.required]),
      code: new FormControl('',[Validators.required]),
      email: new FormControl('',[Validators.required]),
      createdDate: new FormControl('',[Validators.required]),
      vendor_location: this.fb.array([]),
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
    this.vendorService.getVendorDetails(this.vendor_id).subscribe({
      next: (res) => {
        if(res){
         this.vendorDetails = res;
         this.vendorForm.controls['name'].setValue(this.vendorDetails.name);
         this.vendorForm.controls['code'].setValue(this.vendorDetails.code);
         this.vendorForm.controls['email'].setValue(this.vendorDetails.email);
         this.vendorForm.controls['createdDate'].setValue(this.dateFormat(this.vendorDetails.createdDate));
         this.commonService.hideLoading();
        }
       },
      error: (e) => {
        console.error(e);
        this.commonService.hideLoading();
      }, 
     });
  }
  
  save(){
    if (this.vendorForm.invalid) {
      return;
    }
    const body = this.vendorForm.value;
    this.vendor_id ?  this.editVendor(body) : this.addVendor(body); 
  }

  editVendor(body:any){
    this.commonService.showLoading();  
    body.id = this.vendor_id;
    console.log("body",body);
    this.vendorService.edit(body).subscribe({
      next:(res: any) => {
        Swal.fire({
          title: res.message,
        //  text: 'Please login again!',
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
    this.vendorService.add(body).subscribe({
      next:(res: any) => {
        Swal.fire({
          title: res.message,
        //  text: 'Please login again!',
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

  dateFormat(date:any){
    const newdate = new Date(date);
    return this.datepipe.transform(newdate,'yyyy-MM-dd');
  }
  
}