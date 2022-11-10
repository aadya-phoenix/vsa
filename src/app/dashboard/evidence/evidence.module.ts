import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EvidenceRoutingModule } from './evidence-routing.module';
import { EvidenceSubmissionComponent } from './evidence-submission/evidence-submission.component';
import { EvidenceReceivedComponent } from './evidence-received/evidence-received.component';
import { SectionHeadDataComponent } from './section-head-data/section-head-data.component';
import { EvidenceScoreCategoryComponent } from './evidence-score-category/evidence-score-category.component';
import { FormsModule } from '@angular/forms';
import { DpmDataComponent } from './dpm-data/dpm-data.component';
import { EvidenceAuditsComponent } from './evidence-audits/evidence-audits.component';
import { RouterModule } from '@angular/router';
import { NgxPaginationModule } from 'ngx-pagination';


@NgModule({
  declarations: [
    EvidenceSubmissionComponent,
    EvidenceReceivedComponent,
    SectionHeadDataComponent,
    EvidenceScoreCategoryComponent,
    DpmDataComponent,
    EvidenceAuditsComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    EvidenceRoutingModule,
    RouterModule,
    NgxPaginationModule
  ]
})
export class EvidenceModule { }
