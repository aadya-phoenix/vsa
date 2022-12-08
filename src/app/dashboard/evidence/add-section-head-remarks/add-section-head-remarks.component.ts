import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { AuditExecutionService } from 'src/app/shared/services/audit-execution/audit-execution.service';
import { AuthenticationService } from 'src/app/shared/services/auth/authentication.service';
import { CommonService } from 'src/app/shared/services/common/common.service';
import { ReportService } from 'src/app/shared/services/report/report.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-section-head-remarks',
  templateUrl: './add-section-head-remarks.component.html',
  styleUrls: ['./add-section-head-remarks.component.css']
})
export class AddSectionHeadRemarksComponent implements OnInit {
  accept = 1;
   reject = 2;
  auditPlanId:any;
  summaryDetails: any = [];
  user:any
  headRemarks:any=[];
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private authService:AuthenticationService,
    private commonService: CommonService,
    private auditExecutionService: AuditExecutionService,
    private reportService: ReportService
  ) {
    this.route.paramMap.subscribe((params: ParamMap) => {
      const Id = params.get('id');
      this.auditPlanId = Id ? Id : 0;
    })
   }

  ngOnInit(): void {
    this.user = this.authService.getLoginDetails();
    this.getSummaryDetails();
  }

  getSummaryDetails() {
    this.commonService.showLoading();
    this.auditExecutionService.getSummaryDetails(this.auditPlanId).subscribe({
      next: (res) => {
        if (res) {
          this.summaryDetails = res;
          this.summaryDetails.forEach((x: any) => {
            if (x.judgementSymbol == 'Pie') {
              x.judgeSymbol = ''
            }
          });
          this.commonService.hideLoading();
        }
      },
      error: (e) => {
        console.error(e);
        this.commonService.hideLoading();
      }
    });
  }

  submit(){
    this.commonService.showLoading();
    this.summaryDetails.forEach((x: any) => {
      this.headRemarks.push(
        {
          auditPlanId: this.auditPlanId,
          regulationId: x.regulationId,
          remark: x?.secRemarks,
        });
     });
     this.auditExecutionService.saveSectionHeadRemarks(this.headRemarks).subscribe({
      next:(res: any) => {
        Swal.fire({
          title: 'Section Head Remarks Submitted Successfully',
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
    this.router.navigateByUrl(`dashboard/evidence/section-data`);
  }

  giveStatus(status:any){
    this.commonService.showLoading();
    this.summaryDetails.forEach((x: any) => {
      this.headRemarks.push(
        {
          auditPlanId: this.auditPlanId,
          regulationId: x.regulationId,
          remark: x?.secRemarks,
        });
     });
     this.auditExecutionService.saveSectionHeadRemarks(this.headRemarks).subscribe({
      next:(res: any) => {
        const body={
          auditPlanId: this.auditPlanId,
          roleId: this.user.RoleId,
          userId: this.user.UserId,
          status: status,
          remark:""
        };
        this.auditExecutionService.saveHeadApproval(body).subscribe({
          next:(res: any) => {
            Swal.fire({
              title: status == this.accept ? 'Audit Plan Approved' : ' Audit Plan Rejected',
              icon: 'success',
            });
            this.router.navigateByUrl('dashboard/evidence/section-data');
            this.commonService.hideLoading();
          },
          error:(err:any) =>{
            console.error(err);
            this.commonService.hideLoading();
          } 
        });  
        this.commonService.hideLoading();
      },
      error:(err:any) =>{
        console.error(err);
        this.commonService.hideLoading();
      } 
    }); 
  }

}
