import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { AuditPlanService } from 'src/app/shared/services/audit-plan/audit-plan.service';
import { CommonService } from 'src/app/shared/services/common/common.service';
import { EmployeeMasterService } from 'src/app/shared/services/employee-master/employee-master.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-view-plan-assign',
  templateUrl: './view-plan-assign.component.html',
  styleUrls: ['./view-plan-assign.component.css']
})
export class ViewPlanAssignComponent implements OnInit {

  assignAuditorForm:FormGroup;
  auditorId:any;
  auditorList:any=[];

  constructor(
    private fb:FormBuilder,
    private employeeService:EmployeeMasterService,
    private auditPlanService:AuditPlanService,
    private router:Router,
    private commonService: CommonService,
    private route:ActivatedRoute
  ) { 
    this.route.paramMap.subscribe((params:ParamMap)=>{
      const Id = params.get('id');
      this.auditorId = Id ? Id : 0;
    })

    this.assignAuditorForm=this.fb.group({
      assignAuditor: this.fb.array([]),
    });
   this.assignAuditorArray.push(this.addMoreAuditor(''));
  }

  ngOnInit(): void {
    //this.getEmployeeList(); 
  }

  assign(){
    this.commonService.showLoading();
    const body = this.assignAuditorForm.value;
    this.auditPlanService.assignAuditor(body).subscribe({
      next:(res: any) => {
        Swal.fire({
          title: res.message,
          icon: 'success',
        });
        this.router.navigateByUrl('dashboard/view-plan');
        this.commonService.hideLoading();
      },
      error:(err:any) =>{
        this.commonService.hideLoading();
      } 
    });
  }

  searchAuditor(elem: any, index:any) {
    if (elem && elem.length > 1) {
      this.commonService.showLoading();
      const data = {
        name: elem,
        rolename: 'Auditor'
      }
      this.employeeService.getUsersByRoleId(data).subscribe({
        next: (res) => {
          if (res) {
            this.auditorList[index] = res.map((i:any) => { i.code = i.name + ' (' + i.code + ')'; return i; });;
            this.commonService.hideLoading();
          }
        },
        error: (e) => {
          console.error(e);
          this.commonService.hideLoading();
        },
      });
    }
    else {
      this.auditorList[index] = [];
    }
  }

 
  close(){
      this.router.navigateByUrl('dashboard/view-plan');
  }

  get assignAuditorArray(): FormArray {
    return this.assignAuditorForm.get("assignAuditor") as FormArray;
  }

  addAuditor(auditorVal: string) {
    return this.assignAuditorArray.push(this.addMoreAuditor(auditorVal));
  }

  addMoreAuditor(auditorVal: string) {
    return this.fb.group({
      auditorId: new FormControl(auditorVal, [Validators.required]),
      auditPlanId: new FormControl(this.auditorId)
    });
  }

  removeAuditor(i: any) {
    this.assignAuditorArray.removeAt(i);
  }

  getEmployeeList(){
    this.commonService.showLoading();
    this.employeeService.getEmployee().subscribe({
      next: (res) => {
        if(res){
        let employees = res;
         this.auditorList = employees.filter((a:any) => {
          return a.roleId == "87161db0-fadc-40f1-a9e0-b9c62e70583b" ;
        });
        this.commonService.hideLoading();
        }
       },
       error:(err:any) =>{
        this.commonService.hideLoading();
      } , 
     });
  }

}
