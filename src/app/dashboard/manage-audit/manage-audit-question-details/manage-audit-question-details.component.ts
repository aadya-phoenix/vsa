import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { AuditPlanService } from 'src/app/shared/services/audit-plan/audit-plan.service';

@Component({
  selector: 'app-manage-audit-question-details',
  templateUrl: './manage-audit-question-details.component.html',
  styleUrls: ['./manage-audit-question-details.component.css']
})
export class ManageAuditQuestionDetailsComponent implements OnInit {

  questionForm:FormGroup;
  regulationList:any=[];

  constructor(
    private auditPlanService:AuditPlanService,
    private fb:FormBuilder
  ) { 
    this.questionForm =this.fb.group({
      triangle : new FormControl('',[]),
      square : new FormControl('',[]),
      moon : new FormControl('',[]),
      judge: this.fb.array([])
    })
    
  }

  ngOnInit(): void {
    this.getPlanRegulation();
    this.judgeArray.push(this.addMoreJudge(''));
  }

  getPlanRegulation(){
    const data={};
    this.auditPlanService.getPlanRegulation(data).subscribe({
      next: (res) => {
        if(res){
         this.regulationList = res;
        }
       },
      error: (e) => console.error(e), 
     });
  }

  get judgeArray(): FormArray {
    return this.questionForm.get("judge") as FormArray;
  }

  addJudge(auditorVal: string) {
    return this.judgeArray.push(this.addMoreJudge(auditorVal));
  }

  addMoreJudge(auditorVal: string) {
    return this.fb.group({
      remarks: new FormControl(auditorVal, []),
      fileJ: new FormControl()
    });
  }

  removeJudge(i: any) {
    this.judgeArray.removeAt(i);
  }

  addData(){}

  init(){}

  back(){}

  auditCreate(){}

  saveAsDraft(){}

}
