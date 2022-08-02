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
  ) {
    this.route.paramMap.subscribe((params: ParamMap) => {
      const Id = params.get('id');
      console.log("id",Id);
      this.vendor_id = Id ? parseInt(Id) : 0;
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
         console.log("vendor",res);
        }
       },
      error: (e) => console.error(e), 
     /*  (res:any)=>{
      if(res){
        this.vendorObj = res;
        console.log("vendor",res);
      } */
     });
  }
  
  save(){
    if (this.vendorForm.invalid) {
      return;
    }
    const body = this.vendorForm.value;
    this.vendorService.addVendor(body).subscribe(
      (res: any) => {
        console.log("res",res)
      }
    ); 
  }

  close(){
   this.router.navigateByUrl('dashboard/vendor'); 
  }
  
}