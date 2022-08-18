import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EvidenceRoutingModule } from './evidence-routing.module';
import { EvidenceSubmissionComponent } from './evidence-submission/evidence-submission.component';
import { EvidenceReceivedComponent } from './evidence-received/evidence-received.component';


@NgModule({
  declarations: [
    EvidenceSubmissionComponent,
    EvidenceReceivedComponent
  ],
  imports: [
    CommonModule,
    EvidenceRoutingModule
  ]
})
export class EvidenceModule { }
