import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';

import { EvidenceRoutingModule } from './evidence-routing.module';
import { EvidenceSubmissionComponent } from './evidence-submission/evidence-submission.component';
import { EvidenceReceivedComponent } from './evidence-received/evidence-received.component';
import { SectionHeadDataComponent } from './section-head-data/section-head-data.component';
import { EvidenceScoreCategoryComponent } from './evidence-score-category/evidence-score-category.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DpmDataComponent } from './dpm-data/dpm-data.component';
import { EvidenceAuditsComponent } from './evidence-audits/evidence-audits.component';
import { RouterModule } from '@angular/router';
import { NgxPaginationModule } from 'ngx-pagination';
import { ModalModule } from 'ngx-bootstrap/modal';
import { EvidenceAuditorRemarksComponent } from './evidence-auditor-remarks/evidence-auditor-remarks.component';
import { EvidenceReceiveCategoryComponent } from './evidence-receive-category/evidence-receive-category.component';
import { EvidenceExecutiveSummaryComponent } from './evidence-executive-summary/evidence-executive-summary.component';
import { NgChartsModule } from 'ng2-charts';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { DpmReportComponent } from './dpm-report/dpm-report.component';
import { SectionHeadRejectComponent } from './section-head-reject/section-head-reject.component';
import { DpmRejectComponent } from './dpm-reject/dpm-reject.component';
import { AddSectionHeadRemarksComponent } from './add-section-head-remarks/add-section-head-remarks.component';
import { SectionHeadRejectedRecordsComponent } from './section-head-rejected-records/section-head-rejected-records.component';


@NgModule({
  declarations: [
    EvidenceSubmissionComponent,
    EvidenceReceivedComponent,
    SectionHeadDataComponent,
    EvidenceScoreCategoryComponent,
    DpmDataComponent,
    EvidenceAuditsComponent,
    EvidenceAuditorRemarksComponent,
    EvidenceReceiveCategoryComponent,
    EvidenceExecutiveSummaryComponent,
    DpmReportComponent,
    SectionHeadRejectComponent,
    DpmRejectComponent,
    AddSectionHeadRemarksComponent,
    SectionHeadRejectedRecordsComponent
  ],
  providers:[DatePipe],
  entryComponents:[EvidenceAuditorRemarksComponent,SectionHeadRejectComponent,DpmRejectComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    EvidenceRoutingModule,
    RouterModule,
    ModalModule.forRoot(),
    NgxPaginationModule,
    NgChartsModule,
    Ng2SearchPipeModule
  ]
})
export class EvidenceModule { }
