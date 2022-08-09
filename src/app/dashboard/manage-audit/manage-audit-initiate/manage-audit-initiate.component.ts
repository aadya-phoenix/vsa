import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { AuditPlanService } from 'src/app/shared/services/audit-plan/audit-plan.service';
import { VendorMasterService } from 'src/app/shared/services/vendor-master/vendor-master.service';

@Component({
  selector: 'app-manage-audit-initiate',
  templateUrl: './manage-audit-initiate.component.html',
  styleUrls: ['./manage-audit-initiate.component.css']
})
export class ManageAuditInitiateComponent implements OnInit {

  initiateForm:FormGroup;
  initiateId:any;
  initiateDetails:any;
  vendorObj:any=[];
  
  constructor(
    private fb: FormBuilder,
    private router:Router,
    private route: ActivatedRoute,
    private vendorService:VendorMasterService,
    private auditPlanService:AuditPlanService,
    private datepipe:DatePipe
  ) { 
    this.route.paramMap.subscribe((params: ParamMap) => {
      const Id = params.get('id');
      this.initiateId = Id ? Id : 0;
    });

    this.initiateForm = this.fb.group({
      vendorId:new FormControl('',[Validators.required]),
      startDate:new FormControl('',[Validators.required]),
      endDate:new FormControl('',[Validators.required]),
      partName: new FormControl('',[Validators.required]),
      actualStartDate: new FormControl('',[Validators.required]),
      actualEndDate: new FormControl('',[Validators.required]),
    })
  }

  ngOnInit(): void {
    this.getVendorList();
    this.getinitiateDetails();
  }

  getinitiateDetails(){
    this.auditPlanService.getPlanDetails(this.initiateId).subscribe({
      next: (res) => {
        if(res){
         this.initiateDetails = res;
         this.initiateForm.controls['vendorId'].setValue(this.initiateDetails.vendorId);
         this.initiateForm.controls['startDate'].setValue(this.dateFormat(this.initiateDetails.plannedStartDate));
         this.initiateForm.controls['endDate'].setValue(this.dateFormat(this.initiateDetails.plannedEndDate));
        // this.initiateForm.controls['partName'].setValue(this.dateFormat(this.initiateDetails.partName));
        }
       },
      error: (e) => console.error(e), 
     });
  }

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

  next(){
    const body = this.initiateForm.value;
    body.id = this.initiateId;
    this.auditPlanService.updateInitiatePlan(body).subscribe({
      next:(res: any) => {
        this.router.navigateByUrl(`dashboard/manage-audit/question/${this.initiateId}`);
      },
      error:(err:any) =>{
      }
    }); 
  }

  back(){
    this.router.navigateByUrl('dashboard/manage-audit');
  }

  dateFormat(date:any){
    const newdate = new Date(date);
    return this.datepipe.transform(newdate,'yyyy-MM-dd');
  }

}
