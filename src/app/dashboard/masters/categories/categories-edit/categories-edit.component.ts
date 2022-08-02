import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { CategoryMasterService } from 'src/app/shared/services/category-master/category-master.service';

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
    private router:Router,
    private route: ActivatedRoute
  ) {
    this.route.paramMap.subscribe((params: ParamMap) => {
      const Id = params.get('id');
      this.category_id = Id ? Id : 0;
    });
    this.categoryForm = this.fb.group({
      name: new FormControl('', [Validators.required]),
    });
   }

  ngOnInit(): void {
    this.category_id ? this.getCategoryDetails() : '';
  }

  getCategoryDetails(){
    this.categoryService.getCategoryDetails(this.category_id).subscribe({
      next: (res) => {
        if(res){
         this.categoryDetails = res;
         this.categoryForm.controls['name'].setValue(this.categoryDetails.name);
        }
       },
      error: (e) => console.error(e), 
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
    body.id = this.category_id;
    this.categoryService.edit(body).subscribe({
      next:(res: any) => {
        this.router.navigateByUrl('dashboard/category'); 
      },
      error:(err:any) =>{
      }
    }); 
  }

  addCategory(body:any){
    this.categoryService.add(body).subscribe({
      next:(res: any) => {
        this.router.navigateByUrl('dashboard/category'); 
      },
      error:(err:any) =>{
      }
    }); 
  }

  close(){
    this.router.navigateByUrl('dashboard/category');
  }

}
