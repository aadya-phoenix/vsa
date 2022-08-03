import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { VendorMasterService } from 'src/app/shared/services/vendor-master/vendor-master.service';

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
    this.vendorService.getVendorDetails(this.vendor_id).subscribe({
      next: (res) => {
        if(res){
         this.vendorDetails = res;
         this.vendorForm.controls['name'].setValue(this.vendorDetails.name);
         this.vendorForm.controls['code'].setValue(this.vendorDetails.code);
         this.vendorForm.controls['email'].setValue(this.vendorDetails.email);
         this.vendorForm.controls['createdDate'].setValue(this.dateFormat(this.vendorDetails.createdDate));
        }
       },
      error: (e) => console.error(e), 
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
    body.id = this.vendor_id;
    console.log("body",body);
    this.vendorService.edit(body).subscribe({
      next:(res: any) => {
        this.router.navigateByUrl('dashboard/vendor'); 
      },
      error:(err:any) =>{
      }
    }); 
  }

  addVendor(body:any){
    this.vendorService.add(body).subscribe({
      next:(res: any) => {
        this.router.navigateByUrl('dashboard/vendor'); 
      },
      error:(err:any) =>{
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