import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { AuditAreaMasterService } from 'src/app/shared/services/audit-area-master/audit-area-master.service';
import { CategoryMasterService } from 'src/app/shared/services/category-master/category-master.service';
import { CommonService } from 'src/app/shared/services/common/common.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-audit-area-edit',
  templateUrl: './audit-area-edit.component.html',
  styleUrls: ['./audit-area-edit.component.css']
})
export class AuditAreaEditComponent implements OnInit {

  auditAreaForm: FormGroup;
  audit_id:any;
  auditAreaDetails:any;
  categoryObj:any=[];

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router:Router,
    private auditAreaService:AuditAreaMasterService,
    private commonService: CommonService, 
    private categoryService:CategoryMasterService
  ) { 
    this.route.paramMap.subscribe((params: ParamMap) => {
      const Id = params.get('id');
      this.audit_id = Id ? Id : 0;
    });
    this.auditAreaForm = this.formBuilder.group({
      name: new FormControl('', [Validators.required]),
      categoryId: new FormControl('', [Validators.required])
    });
  }

  ngOnInit(): void {
    this.getCategoryList();
    this.audit_id ? this.getAuditAreaDetails() : '';
  }

  save(){
    if (this.auditAreaForm.invalid) {
      return;
    }
    const body = this.auditAreaForm.value;
    this.audit_id ?  this.editAuditArea(body) : this.addAuditArea(body); 
  }

  editAuditArea(body:any){
    this.commonService.showLoading();  
    body.id = this.audit_id;
    this.auditAreaService.edit(body).subscribe({
      next:(res: any) => {
        Swal.fire({
          title: res.message,
        //  text: 'Please login again!',
          icon: 'success',
        });
        this.router.navigateByUrl('dashboard/audit-area'); 
        this.commonService.hideLoading();
      },
      error:(err:any) =>{
        this.commonService.hideLoading();
      }
    }); 
  }

  addAuditArea(body:any){
    this.commonService.showLoading();  
    this.auditAreaService.add(body).subscribe({
      next:(res: any) => {
        Swal.fire({
          title: res.message,
        //  text: 'Please login again!',
          icon: 'success',
        });
        this.router.navigateByUrl('dashboard/audit-area'); 
        this.commonService.hideLoading();
      },
      error:(err:any) =>{
        this.commonService.hideLoading();
      }
    }); 
  }

  getAuditAreaDetails(){
    this.commonService.showLoading();  
    this.auditAreaService.getAuditAreaDetails(this.audit_id).subscribe({
      next: (res) => {
        if(res){
         this.auditAreaDetails = res;
         this.auditAreaForm.controls['name'].setValue(this.auditAreaDetails.name);
         this.auditAreaForm.controls['categoryId'].setValue(this.auditAreaDetails.categoryId);
         this.commonService.hideLoading();
        }
       },
      error: (e) => {
        console.error(e);
        this.commonService.hideLoading();
      }, 
     });
  }

  getCategoryList(){
    this.categoryService.getCategory().subscribe({
      next: (res) => {
        if(res){
         this.categoryObj = res;
        }
       },
      error: (e) => {
      console.error(e);
     }, 
     });
  }

  close(){
    this.router.navigateByUrl('dashboard/audit-area');
  }

}
