import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EvidenceReceivedComponent } from './evidence-received/evidence-received.component';
import { EvidenceSubmissionComponent } from './evidence-submission/evidence-submission.component';

const routes: Routes = [
  {path:'',component:EvidenceSubmissionComponent},
  {path:'receive',component:EvidenceReceivedComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EvidenceRoutingModule { }
