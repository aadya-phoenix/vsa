import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { CategoryMasterService } from 'src/app/shared/services/category-master/category-master.service';
import { CommonService } from 'src/app/shared/services/common/common.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-categories-edit',
  templateUrl: './categories-edit.component.html',
  styleUrls: ['./categories-edit.component.css']
})
export class CategoriesEditComponent implements OnInit {

  categoryForm:FormGroup;
  category_id:any;
  categoryDetails:any;

  constructor(
    private fb:FormBuilder,
    private categoryService:CategoryMasterService,
    private commonService: CommonService, 
    private router:Router,
    private route: ActivatedRoute
  ) {
    this.route.paramMap.subscribe((params: ParamMap) => {
      const Id = params.get('id');
      this.category_id = Id ? Id : 0;
    });
    this.categoryForm = this.fb.group({
      name: new FormControl('', [Validators.required]),
      isCriticalObservation:new FormControl('', []),
      active:new FormControl('', []),
    });
   }

  ngOnInit(): void {
    this.category_id ? this.getCategoryDetails() : '';
  }

  getCategoryDetails(){
    this.commonService.showLoading();  
    this.categoryService.getCategoryDetails(this.category_id).subscribe({
      next: (res) => {
        if(res){
         this.categoryDetails = res;
         this.categoryForm.controls['name'].setValue(this.categoryDetails.name);
         this.commonService.hideLoading();
        }
       },
      error: (e) => {
        console.error(e);
        this.commonService.hideLoading();
      }
      , 
     });
  }
  
  save(){
    if (this.categoryForm.invalid) {
      return;
    }
    const body = this.categoryForm.value;
    this.category_id ?  this.editCategory(body) : this.addCategory(body); 
  }

  editCategory(body:any){
    this.commonService.showLoading();  
    body.id = this.category_id;
    this.categoryService.edit(body).subscribe({
      next:(res: any) => {
        Swal.fire({
          title: res.message,
          icon: 'success',
        });
        this.router.navigateByUrl('dashboard/category'); 
        this.commonService.hideLoading();
      },
      error:(err:any) =>{
      }
    }); 
  }

  addCategory(body:any){
    this.commonService.showLoading();
    body.active = true;  
    this.categoryService.add(body).subscribe({
      next:(res: any) => {
        Swal.fire({
          title: res.message,
          icon: 'success',
        });
        this.router.navigateByUrl('dashboard/category');
        this.commonService.hideLoading();
      },
      error:(err:any) =>{
        this.commonService.hideLoading();
      }
    }); 
  }

  close(){
    this.router.navigateByUrl('dashboard/category');
  }

  checkStatus(event:any){

  }

}
