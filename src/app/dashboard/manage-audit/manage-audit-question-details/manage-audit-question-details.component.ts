import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { AuditPlanService } from 'src/app/shared/services/audit-plan/audit-plan.service';
import { AuthenticationService } from 'src/app/shared/services/auth/authentication.service';

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

  constructor(
    private auditPlanService:AuditPlanService,
    private fb:FormBuilder,
    private route:ActivatedRoute,
    private authService: AuthenticationService,
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

  private metaDataGroup(): FormGroup {
    return this.fb.group({
      JudgementId: new FormControl('',[]),
      ObservationList: this.fb.array([this.judgeGroup()])
    })
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
  
  get metadataArray(): FormArray {
    return <FormArray>this.questionForm.get('metadata');
  }
 
  obsArray(index:number) : FormArray {
    return <FormArray>this.metadataArray.at(index).get("ObservationList");
  }

  addMetadata(): void {
    console.log("add");
    this.metadataArray.push(this.metaDataGroup());
  }

  updateMeta(data:any){
    this.metadataArray.push(this.metaDataUpdateGroup(data)); 
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
         this.regulationList.forEach((obs: any) => {
          if(obs.issubmitted == true){
          let observation = this.observationList.find((x:any) => 
          x.regulationId == obs.id);
           if (observation) {
            console.log("obse",observation)
            this.judgeDetails.ObservationList.push(observation.remark);
            this.judgeDetails.JudgementId = obs.judgementId
           } 
           this.updateMeta(this.judgeDetails);
          } 
          else{
            this.addMetadata();
           }
          });
          console.log("judge",this.judgeDetails);
   /*       if(this.regulationList.length !=0){
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
        this.getJudgement(); */
        }
       },
      error: (e) => console.error(e), 
     });
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


  get judgeArray(): FormArray {
    return this.questionForm.get("ObservationList") as FormArray;
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

  /* addJudge(i:any,auditorVal: string) {
   return  (<FormArray>(<FormGroup>this.questionForm.controls[index]).controls['ObservationList']). push(this.addMoreJudge(auditorVal));
   return this.judgeArray.push(this.addMoreJudge(auditorVal));
  }

  addMoreJudge(auditorVal: string) {
    return this.fb.group({
      remark: new FormControl(auditorVal, []),
      file: new FormControl(),
      auditPlanId: new FormControl(this.auditPlanId,[]),
      createdBy: new FormControl(this.userId,[]),
      regulationId: new FormControl()
    });
  }

  removeJudge(i: any,j:any) {
    (<FormArray>(<FormGroup>this.questionForm.controls[i]).controls['ObservationList']).removeAt(j);
    this.judgeArray.removeAt(j);
  } */

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

  addData(){}

  init(){}

  back(){}

  submit(index:any,id:any){
    const body = this.questionForm.controls['metadata'].value;
    body[index].ObservationList.forEach((x:any)=> {
      x.regulationId = id;
  });
    body[index].isSubmitted = true;
    const data = body[index];
    const formData :any = new FormData();
    /* formData.append('JudgementId', data.JudgementId);
    formData.append('isSubmitted', data.isSubmitted);
    formData.append('ObservationList',JSON.stringify(data.ObservationList)); 
    console.log("data",data); */
    for(let dataKey in data) {
      console.log("datakey",dataKey);
      if(dataKey === 'ObservationList') {
        // append nested object
        for (let previewKey in data[dataKey]) {
          console.log("previewKey",previewKey);
          console.log(`ObservationList[${previewKey}]`, data[dataKey][previewKey]);
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
    console.log("data",formData);
   /*  Object.entries(data.ObservationList)
     .forEach(([key, value]) => {   formData.append(key, value);
   }));
    Object.entries(data.ObservationList).forEach(([key, value]) => {
      formData.append(key, value);
   });

  for(let key in data) {
    console.log("key",data[key],typeof(data[key]));
    if(typeof(data[key]) === 'object') {
      for (let subKey in data[key]) {
        formData.append('${key}[${subKey}]', data[key][subKey]);
      }
    }
    else {
      formData.append(key, data[key]);
    }
  }
     Object.entries(data.ObservationList).map(([key , value]) =>
    formData.append(`ObservationList[${key}]`, value) 
    ); 
*/
    this.auditPlanService.saveObservation(formData).subscribe({
      next: (res) => {
        if(res){
        }
       },
      error: (e) => console.error(e), 
     });
     
  }

  fileInput(event:any,i:any,j:any){
    console.log("event",event.target.files[0],i,j);
  }

  saveAsDraft(){}

}
