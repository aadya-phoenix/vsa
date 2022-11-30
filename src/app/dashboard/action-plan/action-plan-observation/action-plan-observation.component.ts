import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { dataConstants } from 'src/app/shared/constants/dataConstants';
import { AuditExecutionService } from 'src/app/shared/services/audit-execution/audit-execution.service';
import { AuthenticationService } from 'src/app/shared/services/auth/authentication.service';
import { CategoryMasterService } from 'src/app/shared/services/category-master/category-master.service';
import { CommonService } from 'src/app/shared/services/common/common.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-action-plan-observation',
  templateUrl: './action-plan-observation.component.html',
  styleUrls: ['./action-plan-observation.component.css']
})
export class ActionPlanObservationComponent implements OnInit {
  dateFormat = dataConstants.dateFormate;
  actionPlanList :any=[];
  actionPlanListToShow :any;
  categoryId:any;
  auditPlanId:any;
  userId:any;
  pagination = {
    page: 1,
    pageNumber: 1,
    pageSize: 10
  }
  categoryName:any;
  minStartDate = {};
  today= new Date();
  constructor(
    private authService:AuthenticationService,
    private commonService: CommonService,
    private auditExeService:AuditExecutionService,
    private categoryService:CategoryMasterService,
    private route:ActivatedRoute,
    private datepipe:DatePipe,
    private router:Router
  ) { 
    this.minStartDate = `${this.today.getFullYear()}-${("0" + (this.today.getMonth() + 1)).slice(-2)}-${("0" + this.today.getDate()).slice(-2)}`;
    this.route.paramMap.subscribe((params:ParamMap)=>{
      const id = params.get('id');
      const cid = params.get('cid');
      id ? this.auditPlanId = id : '';
      cid ? this.categoryId = cid : '';
    });
    this.userId = this.authService.getLoginDetails().UserId;
  }

  ngOnInit(): void {
    this.getCategoryDetails();
    this.getActionPlanList();
  }

  getActionPlanList(){
    this.commonService.showLoading();
    this.auditExeService.getActionPlan({auditPlanId:this.auditPlanId,
      categoryId: this.categoryId}).subscribe({
      next: (res) => {
        if(res){
         this.actionPlanList = res;
        
         this.actionPlanList.forEach((x:any)=>{
          if(x.dateOfSubmission == "0001-01-01T00:00:00"){
            x.dateOfSubmission = null
          }
          else{
          x.dateOfSubmission = this.datepipe.transform( x.dateOfSubmission,'yyyy-MM-dd');
          }
         });
         this.actionPlanListToShow = res;
         this.commonService.hideLoading();
        }
       },
      error: (e) => {
        console.error(e);
        this.commonService.hideLoading();
      }, 
     });
  }

  submit(){
    this.commonService.showLoading();
    let overAllRegulations = 0;
    this.actionPlanList.forEach((element:any) => {
      element.auditPlanId = this.auditPlanId;
      element.createdBy = this.userId;
      if(!element.dateOfSubmission || !element.detailOfImprovement|| !element.incharge){
        overAllRegulations++;
      }
    });
    if(overAllRegulations >0){
      Swal.fire({
        title: 'Please fill all mandatory fields.',
        icon: 'error',
      });
      this.commonService.hideLoading();
      return;
    }
    this.auditExeService.saveActionPlan(this.actionPlanList).subscribe({
      next: (res) => {
        if(res){
          Swal.fire({
            title: 'Improvement Plan Submitted Successfully',
            icon: 'success',
          });
          this.router.navigateByUrl(`dashboard/action-plan/category/${this.auditPlanId}`);
          this.commonService.hideLoading();
        }
       },
       error: (e) => {
        console.error(e);
        this.commonService.hideLoading();
      }, 
     }); 
  }

  pageChanged(event: any) {
    this.pagination.pageNumber = event;
  } 

  back(){
    Swal.fire({
      title: 'Are you sure want to Go Back?',
      text: 'The data you entered will not be saved',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes',
      cancelButtonText: 'No'
    }).then((result) => {
      if (result.value) {
      this.router.navigateByUrl(`dashboard/action-plan/category/${this.auditPlanId}`);
      }
    })
    
  }

  getCategoryDetails(){
    this.commonService.showLoading();  
    this.categoryService.getCategoryDetails(this.categoryId).subscribe({
      next: (res) => {
        if(res){
         this.categoryName = res.name;
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

}
