import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { AuditPlanService } from 'src/app/shared/services/audit-plan/audit-plan.service';
import { VendorMasterService } from 'src/app/shared/services/vendor-master/vendor-master.service';

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
    private vendorService:VendorMasterService
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
    this.getVendorList();
    this.getLocation();
  }

  onFileSelected(event:any){
    this.selectedFile = event.target.files[0];
  }

  getFormData(object:any) {
   
  }


  submit(){
    if (this.createPlanForm.invalid) {
      return;
    }
    const body = this.createPlanForm.value as any ;
    const formData = new FormData(); 

    for ( var key in body ) {
      console.log("key1",key)
      console.log("key",body[key])
      formData.append(key, body[key]);
    //  console.log("form",key,formData,body)
  }
  

    console.log("body",formData);
    this.auditPlanService.add(body).subscribe({
      next:(res: any) => {
        //this.router.navigateByUrl('dashboard/vendor'); 
      },
      error:(err:any) =>{
      }
    }); 
  }

  close(){}

  getVendorList(){
    this.vendorService.getVendor().subscribe({
      next: (res) => {
        if(res){
         this.vendorObj = res;
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
