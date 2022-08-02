import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { dataConstants } from 'src/app/shared/constants/dataConstants';
import { AuthenticationService } from 'src/app/shared/services/auth/authentication.service';
import { CategoryMasterService } from 'src/app/shared/services/category-master/category-master.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-categories-list',
  templateUrl: './categories-list.component.html',
  styleUrls: ['./categories-list.component.css']
})
export class CategoriesListComponent implements OnInit {
  getUserrole: any;
  isSuperAdmin = false;
  isPlanner = false;
  SuperAdmin = dataConstants.SuperAdmin;
  Planner = dataConstants.SuperAdmin;

  categoryObj:any=[];

  constructor(
    private router:Router,
    private authService: AuthenticationService,
    private categoryService:CategoryMasterService
    ) { 
    this.getUserrole = this.authService.getRolefromlocal();
    this.isSuperAdmin = this.getUserrole.RoleId === this.SuperAdmin.RoleId && this.getUserrole.role === this.SuperAdmin.role;
    this. isPlanner = this.getUserrole.RoleId === this.Planner.RoleId && this.getUserrole.role === this.Planner.role;
    this.getCategoryList();
  }

  ngOnInit(): void {
    
  }

  
  getCategoryList(){
    this.categoryService.getCategory().subscribe({
      next: (res) => {
        if(res){
         this.categoryObj = res;
        }
       },
      error: (e) => console.error(e), 
     });
  }

  delete(item_id: any){
    Swal.fire({
       title: 'Are you sure want to remove?',
       text: 'You will not be able to recover this request!',
       icon: 'warning',
       showCancelButton: true,
       confirmButtonText: 'Yes, delete it!',
       cancelButtonText: 'No, keep it'
     }).then((result) => {
       if (result.value) {
         this.categoryService.delete(item_id).subscribe({
          next :(res:any)=>{
          this.getCategoryList();
           Swal.fire(
             'Deleted!',
             'Your request has been deleted.',
             'success'
           )
         },
         error:  (err:any)=>{
         }
        })
       }
     }) 
  }

  update(item:any){
    this.router.navigateByUrl(`dashboard/category/edit/${item.id}`);  
  }

  addCategory(){
    this.router.navigateByUrl('dashboard/category/add');
  }
 
}
