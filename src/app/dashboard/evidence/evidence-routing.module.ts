import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DpmDataComponent } from './dpm-data/dpm-data.component';
import { EvidenceReceivedComponent } from './evidence-received/evidence-received.component';
import { EvidenceScoreCategoryComponent } from './evidence-score-category/evidence-score-category.component';
import { EvidenceSubmissionComponent } from './evidence-submission/evidence-submission.component';
import { SectionHeadDataComponent } from './section-head-data/section-head-data.component';

const routes: Routes = [
  {path:'',component:EvidenceScoreCategoryComponent},
  {path:'submit/:id/:cid',component:EvidenceSubmissionComponent},
  {path:'receive',component:EvidenceReceivedComponent},
  {path:'section-data',component:SectionHeadDataComponent},
  {path:'dpm',component:DpmDataComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EvidenceRoutingModule { }
