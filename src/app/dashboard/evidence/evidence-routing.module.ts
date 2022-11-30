import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DpmDataComponent } from './dpm-data/dpm-data.component';
import { DpmReportComponent } from './dpm-report/dpm-report.component';
import { EvidenceAuditsComponent } from './evidence-audits/evidence-audits.component';
import { EvidenceExecutiveSummaryComponent } from './evidence-executive-summary/evidence-executive-summary.component';
import { EvidenceReceiveCategoryComponent } from './evidence-receive-category/evidence-receive-category.component';
import { EvidenceReceivedComponent } from './evidence-received/evidence-received.component';
import { EvidenceScoreCategoryComponent } from './evidence-score-category/evidence-score-category.component';
import { EvidenceSubmissionComponent } from './evidence-submission/evidence-submission.component';
import { SectionHeadDataComponent } from './section-head-data/section-head-data.component';

const routes: Routes = [
  {path:'',component:EvidenceAuditsComponent},
  {path:'score/:id',component:EvidenceScoreCategoryComponent},
  {path:'submit/:id/:cid',component:EvidenceSubmissionComponent},
  {path:'receive/:id/:cid',component:EvidenceReceivedComponent},
  {path:'receive',component:EvidenceReceivedComponent},
  {path:'section-data',component:SectionHeadDataComponent},
  {path:'dpm',component:DpmDataComponent},
  {path:'category/:id',component:EvidenceReceiveCategoryComponent},
  {path:'report/:id',component:EvidenceExecutiveSummaryComponent},
  {path:'dpm-report/:id',component:DpmReportComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EvidenceRoutingModule { }
