import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { dataConstants } from 'src/app/shared/constants/dataConstants';
import { AuthenticationService } from 'src/app/shared/services/auth/authentication.service';
import { CommonService } from 'src/app/shared/services/common/common.service';
import { RegulationMasterService } from 'src/app/shared/services/regulation-master/regulation-master.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-regulation-list',
  templateUrl: './regulation-list.component.html',
  styleUrls: ['./regulation-list.component.css']
})
export class RegulationListComponent implements OnInit {

  getUserrole: any;
  isSuperAdmin = false;
  isPlanner = false;
  SuperAdmin = dataConstants.SuperAdmin;
  Planner = dataConstants.SuperAdmin;
  regulationObj:any = [];
  dateFormate = dataConstants.dateFormate;
  
  pagination = {
    page: 1,
    pageNumber: 1,
    pageSize: 10
  }

  
  constructor(
    private router:Router,
    private authService: AuthenticationService,
    private commonService: CommonService, 
    private regulationService:RegulationMasterService
    ) { 
    this.getUserrole = this.authService.getRolefromlocal();
    this.isSuperAdmin = this.getUserrole.RoleId === this.SuperAdmin.RoleId && this.getUserrole.role === this.SuperAdmin.role;
    this. isPlanner = this.getUserrole.RoleId === this.Planner.RoleId && this.getUserrole.role === this.Planner.role;
  }

  ngOnInit(): void {
    this.getRegulationList();
  }

  addRegulation(){
    this.router.navigateByUrl('dashboard/regulation/add');
  }

  editRegulation(item:any){
    this.router.navigateByUrl(`dashboard/regulation/edit/${item.id}`);  
  }

  getRegulationList(){
    this.commonService.showLoading();  
    this.regulationService.getRegulation().subscribe({
      next: (res) => {
        if(res){
         this.regulationObj = res;
         this.commonService.hideLoading();
        }
       },
      error: (e) => {
        console.error(e);
        this.commonService.hideLoading();
      }, 
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
         this.regulationService.delete(item_id).subscribe({
          next :(res:any)=>{
          this.getRegulationList();
           Swal.fire(
             'Deleted!',
             'Your request has been deleted.',
             'success'
           )},
         error:  (err:any)=>{
         }
        })
       }
     }) 
  }

  pageChanged(event: any) {
    this.pagination.pageNumber = event;
  }

}
