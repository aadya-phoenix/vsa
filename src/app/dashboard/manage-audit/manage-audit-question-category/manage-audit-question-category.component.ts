import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { BsModalRef, BsModalService, ModalOptions } from 'ngx-bootstrap/modal';
import { dataConstants } from 'src/app/shared/constants/dataConstants';
import { AuditExecutionService } from 'src/app/shared/services/audit-execution/audit-execution.service';
import { AuditPlanService } from 'src/app/shared/services/audit-plan/audit-plan.service';
import { AuthenticationService } from 'src/app/shared/services/auth/authentication.service';
import { CategoryMasterService } from 'src/app/shared/services/category-master/category-master.service';
import { CommonService } from 'src/app/shared/services/common/common.service';
import { EmployeeMasterService } from 'src/app/shared/services/employee-master/employee-master.service';
import Swal from 'sweetalert2';
import { CriticalObservationComponent } from '../critical-observation/critical-observation.component';
import { VendorAttendeesComponent } from '../vendor-attendees/vendor-attendees.component';



@Component({
  selector: 'app-manage-audit-question-category',
  templateUrl: './manage-audit-question-category.component.html',
  styleUrls: ['./manage-audit-question-category.component.css']
})
export class ManageAuditQuestionCategoryComponent implements OnInit {
  bsModalRef ?: BsModalRef;
  executiveSummaryForm:FormGroup;
  auditPlanId:any;
  sectionHeadObj:any=[];
  categoryScoreList:any;
  draft = dataConstants.ReportType.Provisional;
  final = dataConstants.ReportType.Final;
  getLoginDetails:any;
  sectionHeadId:any;
  auditPlanDetails:any;
  reportType:any;
  Final = 'Final';
  vendorName:any;
  isNotCompleteRegulation = true;
  constructor(
    private fb:FormBuilder,
    private authService:AuthenticationService,
    private modalService: BsModalService,
    private auditPlanService:AuditPlanService,
    private auditExecuteService:AuditExecutionService,
    private commonService: CommonService,
    private employeeService:EmployeeMasterService,
    private router:Router,
    private route:ActivatedRoute
  ) { 
    this.executiveSummaryForm=this.fb.group({
      criticalObservation: this.fb.array([]),
      vendorAttendee: this.fb.array([])
    });

    this.route.paramMap.subscribe((params:ParamMap)=>{
      const Id = params.get('id');
      this.auditPlanId = Id ? Id : 0;
    })
    this.criticalObservationArray.push(this.addMoreCriticalObservation(''));
    this.vendorAttendeeArray.push(this.addMoreVendorAttendee(''));
    this.getLoginDetails = this.authService.getLoginDetails();
  }

  ngOnInit(): void {
    this.getCategoryList();
    this.getAuditPlanDetails();
  }

  getCategoryList(){
    this.commonService.showLoading();
    let overAllRegulations = 0;
    let overAllCompetedRegulation = 0;
    this.auditPlanService.getScoreAndCategoryList({id:this.auditPlanId}).subscribe({
      next: (res) => {
        if(res){
         this.categoryScoreList = res;
         let i=0;
         this.categoryScoreList.forEach((x:any):any=>{
          
          x.totalRegulation = Math.round((x.totalCount)/3);

         x.completePercent = Math.round(((x.competedRegulation)/x.totalRegulation)*100);
         x.scorePercent = Math.round(((x.categoryScore)/x.totalCount)*100);
          overAllRegulations += x.totalRegulation;
          overAllCompetedRegulation += x.competedRegulation;
         });
         if(overAllRegulations == overAllCompetedRegulation)
         {
          this.isNotCompleteRegulation=false;
         }
         this.commonService.hideLoading();
        }
       },
      error: (e) =>{
        console.error(e),
        this.commonService.hideLoading();
      } , 
     });
  }

  saveCriticalObservation(){
    this.commonService.showLoading();
    const body = this.executiveSummaryForm.value;
    const data ={
      criticalObservation:body.criticalObservation
    } ;
    this.auditPlanService.saveCriticalObservation(data).subscribe({
      next:(res: any) => {
        Swal.fire({
          title: res.message,
          icon: 'success',
        });
        this.commonService.hideLoading();
      },
      error:(err:any) =>{
        this.commonService.hideLoading();
      } 
    }); 

  }

  saveVendorAttendee(){
    this.commonService.showLoading();
    const body = this.executiveSummaryForm.value;
    const data = {
      vendorAttendee: body.vendorAttendee
    };
    this.auditPlanService.saveVendorAttendees(data).subscribe({
      next:(res: any) => {
        Swal.fire({
          title: res.message,
          icon: 'success',
        });
        this.commonService.hideLoading();
      },
      error:(err:any) =>{
        this.commonService.hideLoading();
      } 
    }); 
  }

  get criticalObservationArray(): FormArray {
    return this.executiveSummaryForm.get("criticalObservation") as FormArray;
  }

  addCriticalObservation(auditorVal: string) {
    return this.criticalObservationArray.push(this.addMoreCriticalObservation(auditorVal));
  }

  addMoreCriticalObservation(auditorVal: string) {
    return this.fb.group({
      criticalObservation: new FormControl(auditorVal, [Validators.required]),
      auditPlanId: new FormControl(this.auditPlanId)
    });
  }

  removeCriticalObservation(i: any) {
    this.criticalObservationArray.removeAt(i);
  }

  get vendorAttendeeArray(): FormArray {
    return this.executiveSummaryForm.get("vendorAttendee") as FormArray;
  }

  addVendorAttendee(auditorVal: string) {
    return this.vendorAttendeeArray.push(this.addMoreVendorAttendee(auditorVal));
  }

  addMoreVendorAttendee(auditorVal: string) {
    return this.fb.group({
      vendorAttendee: new FormControl(auditorVal, [Validators.required]),
      auditPlanId: new FormControl(this.auditPlanId)
    });
  }

  removeVendorAttendee(i: any) {
    this.vendorAttendeeArray.removeAt(i);
  } 

  details(id:any){
    this.router.navigateByUrl(`dashboard/manage-audit/question-details/${this.auditPlanId}/${id}`);
  }

  viewSummary(){
    this.router.navigateByUrl(`dashboard/manage-audit/summary/${this.auditPlanId}`);
  }

  reportSubmit(status:any){
  const body ={
    id : this.auditPlanId,
    typeOfReportId : status,
    userId:this.getLoginDetails.UserId
  };
  const sectionHeadData ={
    id: this.auditPlanId,
    sectionHeadUserId: this.sectionHeadId,
      isAuditPlanRejected: 1
  }
  status == this.final ? this.assignSectionHead(sectionHeadData):'';
  this.commonService.showLoading();
  this.auditExecuteService.submitReport(body).subscribe({
    next: (res) => {
      if(res.type == "Error"){
        this.commonService.hideLoading();
        Swal.fire({
          title: res.message,
          icon: 'error',
        });
        return;
       }
        else{
          this.commonService.hideLoading();
          Swal.fire({
            title: res.message,
            icon: 'success',
          });
        this.router.navigateByUrl('dashboard/view-plan');
      }
     },
    error: (e) =>{
      console.error(e),
      this.commonService.hideLoading();
    } , 
   });
  }

  assignSectionHead(body:any){
    this.commonService.showLoading();
    this.auditExecuteService.assignSectionHead(body).subscribe({
      next: (res) => {
        if(res){
          this.commonService.hideLoading();        
        }
       },
      error: (e) =>{
        console.error(e),
        this.commonService.hideLoading();
      } , 
     });
  }

  getEmployeeList(){
    this.commonService.showLoading();  
    this.employeeService.getEmployee().subscribe({
      next: (res) => {
        if(res){
         this.sectionHeadObj = res.filter((x:any)=>{
          return x.roleId == "aa1b2adc-e205-451e-8b2f-5b184df9e4f4" &&
          x.roleName == 'SectionHead';
         });
         this.commonService.hideLoading();
        }
       },
      error: (e) =>{
        console.error(e);
        this.commonService.hideLoading();
      } , 
     });
  }

  back(){
    this.router.navigateByUrl(`dashboard/manage-audit/initiate/${this.auditPlanId}`);
  }

  getSectionHead(event:any){
    this.sectionHeadId = event.target.value;
  }

  getAuditPlanDetails(){
    this.commonService.showLoading();  
    this.auditPlanService.getPlanDetails(this.auditPlanId).subscribe({
      next: (res) => {
        if(res){
         this.auditPlanDetails = res;
         this.vendorName =  this.auditPlanDetails.vendorName;
         this.reportType = res.typeOfReport;
         this.commonService.hideLoading();
        }
       },
      error: (e) => {
        console.error(e);
        this.commonService.hideLoading();
      }, 
     });
  }

  isSubmit(){
  if(this.reportType != this.Final)
  return true;
  else 
  return false;
  }

  openVendorModal(){
    const initialState: ModalOptions = {
      initialState: {
       data:this.auditPlanId,
       title: 'Modal with component'
      }
    };
    this.bsModalRef = this.modalService.show(VendorAttendeesComponent, initialState);
    this.bsModalRef.content.closeBtnName = 'Close';
    this.bsModalRef.onHidden?.subscribe(() => {
   });
  }

  openCriticalModal(){
    const initialState: ModalOptions = {
      initialState: {
       data:this.auditPlanId,
       title: 'Modal with component'
      }
    };
    this.bsModalRef = this.modalService.show(CriticalObservationComponent, initialState);
    this.bsModalRef.content.closeBtnName = 'Close';
    this.bsModalRef.onHidden?.subscribe(() => {
   });
  }

}
