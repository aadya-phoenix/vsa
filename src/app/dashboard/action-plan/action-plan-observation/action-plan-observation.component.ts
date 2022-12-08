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
  minStartDate = {};
  today= new Date();
  actionPlanStatus:any;
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
    this.getActionPlanList();
  }

  getActionPlanList(){
    this.commonService.showLoading();
    this.auditExeService.getActionPlan({auditPlanId:this.auditPlanId}).subscribe({
      next: (res) => {
        if(res){
         this.actionPlanList = res;
         this.actionPlanList.find((x:any)=>{
          x.isActionPlanRejected =='2'? this.actionPlanStatus= 'Rejected' : this.actionPlanStatus= 'Accepted';
         });
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
    let submittedFields = 0;
    this.actionPlanList.forEach((element:any) => {
      if(!element.detailOfImprovement || !element.incharge || !element.dateOfSubmission){
        submittedFields++;
      }
    });
    if(submittedFields >0){
      Swal.fire({
        title: 'Please fill all fields.',
        icon: 'error',
      });
      this.commonService.hideLoading();
      return;
    } 
    this.actionPlanList.forEach((item:any) => {
      item.isDraft = false;
    });
    this.auditExeService.saveActionPlan(this.actionPlanList).subscribe({
      next: (res) => {
        if(res){
          Swal.fire({
            title: 'Improvement Plan Submitted Successfully',
            icon: 'success',
          });
          this.router.navigateByUrl(`dashboard/action-plan`);
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
   this.router.navigateByUrl(`dashboard/action-plan`);
  }

  save(item:any){
    item.isDraft = true;
    this.auditExeService.saveAsDraftActionPlan(item).subscribe({
      next: (res) => {
        if(res){
          Swal.fire({
            title: 'Improvement Plan Submitted Successfully',
            icon: 'success',
          });
          this.commonService.hideLoading();
        }
       },
       error: (e) => {
        console.error(e);
        this.commonService.hideLoading();
      }, 
     });  
  }
}
