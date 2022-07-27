import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-vendor-edit',
  templateUrl: './vendor-edit.component.html',
  styleUrls: ['./vendor-edit.component.css']
})
export class VendorEditComponent implements OnInit {

  vendorForm:FormGroup;
  constructor(
    private fb:FormBuilder,
    private router:Router
  ) {
    this.vendorForm = this.fb.group({
      vendor_name: new FormControl('',[Validators.required]),
      vendor_code: new FormControl('',[Validators.required]),
      vendor_email: new FormControl('',[Validators.required]),
      vendor_creation_date: new FormControl('',[Validators.required]),
      vendor_location: this.fb.array([]),
    });
   }

  ngOnInit(): void {
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

  save(){}
  close(){
   this.router.navigateByUrl('dashboard/vendor'); 
  }
  
}