import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
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
    this. getAuditAreaByCategory();
    this.getPlanObservation();
  }

  getRegulation(id:any){
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
         this.observationList.forEach((obs: any) => {
          let regulation = this.regulationList.find((x:any) => 
          x.id == obs.regulationId);
          this.judgeDetails.JudgementId ='';
          this.judgeDetails.ObservationList = [];
          if (regulation) {
            console.log("obs.remark",obs.remark)
            this.judgeDetails.ObservationList.push(this.fb.group({remark:
              obs.remark,file:''}));
             // console.log("obs.remark",obs.remark,regulation.judgementId)
            this.judgeDetails.JudgementId = regulation.judgementId;
            console.log("this.judgeDetails",this.judgeDetails);
            this.metadataArray.push(this.metaDataUpdateGroup(this.judgeDetails)); 
         //this.updateMeta(this.judgeDetails);
          }
          else{
            this.addMetadata();
           }
         });
          this.regulationList.forEach((obs: any) => {
          if(obs.issubmitted == true){
          let observation = this.observationList.find((x:any) => 
          x.regulationId == obs.id);
           if (observation) {
            console.log("observation list",observation);
            this.judgeDetails.ObservationList.push(this.fb.group({remark:
              observation?.remark,file:''}));
            this.judgeDetails.JudgementId = obs.judgementId;
            console.log("details",this.judgeDetails);
            this.updateMeta(this.judgeDetails);
           } 
          } 
          else{
            this.addMetadata();
           }
        }); 
         if(this.regulationList.length !=0){
         this.regulationList.forEach((x:any)=>{
          if(x.issubmitted == true){
            this.judgeDetails.JudgementId = x.judgementId
            this.metadataArray.push(this.metaDataUpdateGroup(data)); 
            this.updateMeta(this.judgeDetails);
          }
          else{
           this.addMetadata();
          }
         }); 
         }
        this.getJudgement(); 
        }
       },
      error: (e) => console.error(e), 
     });
  }

  private metaDataGroup(): FormGroup {
    return this.fb.group({
      JudgementId: new FormControl('',[]),
      ObservationList: this.fb.array([this.judgeGroup()])
    })
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

  private judgeGroup(): FormGroup {
    return this.fb.group({
      remark: new FormControl('',[]),
      file: new FormControl('',[]),
      auditPlanId: new FormControl(this.auditPlanId,[]),
      createdBy: new FormControl(this.userId,[]),
      regulationId: new FormControl()
    });
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

  updateMeta(data:any){
    console.log("meta",data)
    this.metadataArray.push(this.metaDataUpdateGroup(data)); 
  }

  private metaDataUpdateGroup(data:any): FormGroup {
    console.log("data",data);
    return this.fb.group({
      JudgementId: new FormControl(data.judgementId,[]),
      ObservationList: this.fb.array(data.ObservationList)
    })
  }

  updateMetadata(data:any){
    console.log("data group",data);
    return this.fb.group({
      JudgementId: new FormControl(data.judgementId,[]),
      ObservationList: this.fb.array([this.judgeGroup()])
    })
  }

  getPlanObservation(){
    this.auditPlanService.getPlanObservation({auditPlanId:this.auditPlanId, categoryId:this.categoryId}).subscribe({
      next: (res) => {
        if(res){
         this.observationList = res;    
        }
       },
      error: (e) => console.error(e), 
     });
  }

  getAuditAreaByCategory(){
    this.auditPlanService.getAuditAreaByCategory(this.categoryId).subscribe({
      next: (res) => {
        if(res){
          this.auditAreaList = res;
          this.getRegulation(this.auditAreaList[0]?.id);
        }
       },
      error: (e) => console.error(e), 
     }); 
  }

  getJudgement(){
    this.auditPlanService.getJudgement().subscribe({
      next: (res) => {
        if(res){
         this.observationList = res;
        }
       },
      error: (e) => console.error(e), 
     });  
  }

  submit(index:any,id:any){
    this.commonService.showLoading();
    const body = this.questionForm.controls['metadata'].value;
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
            console.log("nestedKey",nestedKey);
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

  addData(){}

  init(){}

  back(){
    this.router.navigateByUrl(`dashboard/manage-audit/question/${this.auditPlanId}`);;
  }

  fileInput(event:any,i:any,j:any){
    console.log("event",event.target.files[0],i,j);
  }

}
