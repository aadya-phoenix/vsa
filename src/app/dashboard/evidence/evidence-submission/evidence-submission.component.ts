import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { dataConstants } from 'src/app/shared/constants/dataConstants';
import { AuditExecutionService } from 'src/app/shared/services/audit-execution/audit-execution.service';
import { AuditPlanService } from 'src/app/shared/services/audit-plan/audit-plan.service';
import { CategoryMasterService } from 'src/app/shared/services/category-master/category-master.service';
import { CommonService } from 'src/app/shared/services/common/common.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-evidence-submission',
  templateUrl: './evidence-submission.component.html',
  styleUrls: ['./evidence-submission.component.css']
})
export class EvidenceSubmissionComponent implements OnInit {

  dateFormat = dataConstants.dateFormate;
  auditPlanId :any;
  categoryId :any;
  actionPlanList:any=[];
  selectedFiles:any;
  filesArray:any=[];
  pagination = {
    page: 1,
    pageNumber: 1,
    pageSize: 10
  }
  categoryName:any;
  constructor(
    private commonService: CommonService,
    private auditExeService:AuditExecutionService,
    private categoryService:CategoryMasterService,
    private router:Router,
    private route:ActivatedRoute
  ) { 
    this.route.paramMap.subscribe((res:ParamMap)=>{
      let Id = res.get('id');
      let Cid = res.get('cid');
      this.auditPlanId = Id;
      this.categoryId = Cid;
    });
  }

  ngOnInit(): void {
    this.getActionPlanList();
    this.getCategoryDetails();
  }

  fileUpload(event:any){
    this.selectedFiles = event.target.files[0];
    this.filesArray.push(this.selectedFiles);
  }

  getActionPlanList(){
    this.commonService.showLoading();
    this.auditExeService.getActionPlan({auditPlanId:this.auditPlanId,
      categoryId: this.categoryId}).subscribe({
      next: (res) => {
        if(res){
          var i =1;
          var j = 1;
         this.actionPlanList = res;
         this.actionPlanList.forEach((item: any) => {
          this.actionPlanList.forEach((subitem: any) => {
           if(item.regulationId
            == subitem.regulationId
            ){
             item.itemno = 
            subitem.itemno = i;
            subitem.subitemno = i + '.' + j;
            j++;
            console.log("j ++",j);
           }
          });
          i++;
        });
        console.log("item",this.actionPlanList);
        this.commonService.hideLoading();
       }},
      error: (e) => {
        console.error(e);
        this.commonService.hideLoading();
      }, 
     });
  }

  submit(item:any){
    this.commonService.showLoading();
    const formData = new FormData(); 
    for(let i = 0; i < this.filesArray.length; i++){
     const element = this.filesArray[i];
     formData.append('AttachmentFile', element);
    }  
     formData.append('AuditPlanId', this.auditPlanId); 
     formData.append('RegulationId', item.regulationId);
     formData.append('AuditPlanExecutionObservation', item.auditPlanExecutionObservation);
     formData.append('AuditPlanActionPlanId', item.id);
     this.commonService.hideLoading();
     this.auditExeService.saveEvidence(formData).subscribe({
      next:(res: any) => {
        Swal.fire({
          title: 'Evidence Submitted Successfully',
          icon: 'success',
        });
        this.commonService.hideLoading();
      },
      error:(err:any) =>{
        console.error(err);
        this.commonService.hideLoading();
      } 
    });  
  }

  back(){
    this.router.navigateByUrl(`dashboard/action-plan/vendor/category/${this.auditPlanId}`);
  }

  pageChanged(event: any) {
    this.pagination.pageNumber = event;
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
