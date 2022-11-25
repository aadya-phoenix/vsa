import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { dataConstants } from 'src/app/shared/constants/dataConstants';
import { AuditPlanService } from 'src/app/shared/services/audit-plan/audit-plan.service';
import { AuthenticationService } from 'src/app/shared/services/auth/authentication.service';
import { CommonService } from 'src/app/shared/services/common/common.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-manage-audit-question-details',
  templateUrl: './manage-audit-question-details.component.html',
  styleUrls: ['./manage-audit-question-details.component.css']
})
export class ManageAuditQuestionDetailsComponent implements OnInit {

  questionForm:FormGroup;
  regulationList:any=[];
  auditAreaList: any = [];
  observationList:any = [];
  auditPlanId:any;
  categoryId:any;
  getUserDetails:any;
  userId:any;
  judgeDetails:any={
    JudgementId:'',
    ObservationList:[]
  };
  observeArray = [];
  nullId =dataConstants.NullId;
  judgeNew:any=[];
  regulationId:any;
  triangle = dataConstants.JudgementValues.Triangle;
  cross = dataConstants.JudgementValues.X;
  pie = dataConstants.JudgementValues.Pie;
  auditPlanDetails:any;
  viewPlanId:any;
  vendorName:any;

  constructor(
    private auditPlanService:AuditPlanService,
    private fb:FormBuilder,
    private route:ActivatedRoute,
    private commonService: CommonService,
    private authService: AuthenticationService,
    private router:Router
  ) { 
    this.getUserDetails = this.authService.getLoginDetails();
    this.userId = this.getUserDetails.UserId;
   
    this.route.paramMap.subscribe((params:ParamMap)=>{
      const Id = params.get('id');
      const cid = params.get('cid');
      this.auditPlanId = Id ? Id : 0;
      this.categoryId = cid ? cid : 0;
    });

    this.questionForm =this.fb.group({
      metadata: this.fb.array([]),
    });
  }

  ngOnInit(): void {
    this.getAuditAreaByCategory();
    this.getAuditPlanDetails();
  }

  private metaDataGroup(): FormGroup {
    return this.fb.group({
      JudgementId: new FormControl('',[Validators.required]),
      ObservationList: this.fb.array([this.judgeGroup()])
    })
  } 

  private judgeGroup(): FormGroup {
    return this.fb.group({
      remark: new FormControl('',[]),
      file: new FormControl('',[]),
      auditPlanId: new FormControl(this.auditPlanId,[]),
      createdBy: new FormControl(this.userId,[]),
      regulationId: new FormControl('',[]),
      id:new FormControl('',[])
    });
  }
  
  get metadataArray(): FormArray {
    return <FormArray>this.questionForm.get('metadata');
  }
 
  obsArray(index:number) : FormArray {
    return <FormArray>this.metadataArray.at(index).get("ObservationList");
  }

  get judgeArray(): FormArray {
    return this.questionForm.get("ObservationList") as FormArray;
  }

  addJudge(index: any,val:any): void {
    (<FormArray>(<FormGroup>this.metadataArray.controls[index]).controls['ObservationList']).push(this.judgeGroup());
  }

  removeJudge(sessIndex: any,breakIndex:any): void{
    (<FormArray>(<FormGroup>this.metadataArray.controls[sessIndex]).controls['ObservationList']).removeAt(breakIndex);
  }

  addMetadata(): void {
    this.metadataArray.push(this.metaDataGroup());
  }

  updateMetadata(data:any){
    this.metadataArray.push(this.metaUpdateGroup(data)); 
  }

  private metaUpdateGroup(data:any): FormGroup {
    return this.fb.group({
      JudgementId: new FormControl(data.judgementId,[Validators.required]),
      ObservationList: this.fb.array(data.judgeNew,[])
    })
  }

  getAuditAreaByCategory(){
    this.commonService.showLoading();
    this.auditPlanService.getAuditAreaByCategory(this.categoryId).subscribe({
      next: (res) => {
        if(res){
          this.auditAreaList = res;
          this.getRegulation(this.auditAreaList[0]?.id);
          this.commonService.hideLoading();
        }
       },
      error: (e) => {
        console.error(e);
        this.commonService.hideLoading();
      }, 
     }); 
  }

  getRegulation(id:any){
    this.commonService.showLoading();
    this.metadataArray.controls = [];
    const data={
      auditPlanId: this.auditPlanId,
      categoryId: this.categoryId,
      auditAreaId: id
    };
    this.auditPlanService.getPlanRegulation(data).subscribe({
      next: (res) => {
        if(res){
         this.regulationList = res;
         this.regulationList.forEach((reg:any)=>{
          this.judgeNew=[];
          reg.remarks = [];
          reg.judgeNew = [];
          this.auditPlanService.getPlanObservation({auditPlanId:this.auditPlanId, 
            regulationId:reg.id}).subscribe({
            next: (res) => {
              if(res){
                this.observationList = res;
              //  debugger;
                 if(reg.issubmitted == true){
                  this.judgeNew=[];
                  reg.remarks = [];
                  reg.judgeNew = [];
                  this.regulationId = reg.id;
                  if(this.observationList.length>0){
                    this.observationList.forEach((x:any)=>{
                      reg.remarks.push({remark:x.remark, id:x.id});
                    });
                    for(let item of reg.remarks){
                      this.judgeNew.push(this.fb.group({
                       remark: item.remark ,
                       file:'',
                       auditPlanId:this.auditPlanId,
                       createdBy: this.userId,
                       regulationId:reg.id,
                       id: item.id
                       }));
                     }
                  }
                  else{
                    this.judgeNew.push(this.judgeGroup())
                  }
                   reg.judgeNew = this.judgeNew;
                   this.updateMetadata(reg);
                 }              
                else{
                  this.addMetadata();
                 }
                 this.commonService.hideLoading();
              }
             },
            error: (e) => {
              console.error(e);
              this.commonService.hideLoading();
            }, 
           });
         });
        }
       },
      error: (e) => console.error(e), 
     });
  }

  getPlanObservation(id:any){
    this.commonService.showLoading();
    this.auditPlanService.getPlanObservation({auditPlanId:this.auditPlanId, regulationId:id}).subscribe({
      next: (res) => {
        if(res){
         this.observationList = res;    
         this.commonService.hideLoading();
        }
       },
      error: (e) => {
        console.error(e);
        this.commonService.hideLoading();
      }, 
     });
  }

  submit(index:any,id:any){
    this.commonService.showLoading();
    const body = this.questionForm.controls['metadata'].value;
    if (!body[index].JudgementId) {
      Swal.fire({
        title: 'Please Submit Judgement.',
        icon: 'error',
      });
      this.commonService.hideLoading();
      return;
    }
    body[index].ObservationList.forEach((x:any)=> {
      x.regulationId = id;
    });
    body[index].isSubmitted = true;
    const data = body[index];
    const formData :any = new FormData();
    for(let dataKey in data) {
      if(dataKey === 'ObservationList') {
        for (let previewKey in data[dataKey]) {
          for (let nestedKey in data[dataKey][previewKey]){
            formData.append(`ObservationList[${previewKey}][${nestedKey}]`, data[dataKey][previewKey][nestedKey]);
          }
        }
      }
      else {
        formData.append(dataKey, data[dataKey]);
      }
    }
    this.commonService.hideLoading();
    this.auditPlanService.saveObservation(formData).subscribe({
     next: (res) => {
       if(res){
         this.commonService.hideLoading();
         Swal.fire({
           title: res.message,
           icon: 'success',
         });
       }
      },
     error: (e) =>{
       console.error(e);
       this.commonService.hideLoading();
     } , 
    });  
  }

  fileInput(event:any,i:any,j:any){
    console.log("event",event.target.files[0],i,j);
  }

  judgeValue(event:any,i:any){
    console.log("judge",event,i);
  }

  back(){
    this.router.navigateByUrl(`dashboard/manage-audit/question/${this.auditPlanId}`);;
  }

  getAuditPlanDetails(){
    this.commonService.showLoading();  
    this.auditPlanService.getPlanDetails(this.auditPlanId).subscribe({
      next: (res) => {
        if(res){
         this.auditPlanDetails = res;
         this.vendorName = res.vendorName;
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
