import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { AuditExecutionService } from 'src/app/shared/services/audit-execution/audit-execution.service';
import { CommonService } from 'src/app/shared/services/common/common.service';
import { ReportService } from 'src/app/shared/services/report/report.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-section-head-remarks',
  templateUrl: './add-section-head-remarks.component.html',
  styleUrls: ['./add-section-head-remarks.component.css']
})
export class AddSectionHeadRemarksComponent implements OnInit {

  auditPlanId:any;
  summaryDetails: any = [];
  constructor(
    private router: Router,
    private route: ActivatedRoute,
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

  submit(item:any){
    this.commonService.showLoading();
    const body ={
       auditPlanId: this.auditPlanId,
       regulationId: item?.regulationId,
       remark: item.secRemarks,
    }
     this.auditExecutionService.saveSectionHeadRemarks(body).subscribe({
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
    this.router.navigateByUrl(`dashboard/evidence/section-data`);
  }

}
