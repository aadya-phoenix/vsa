import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PendingPlanRoutingModule } from './pending-plan-routing.module';
import { ModalModule } from 'ngx-bootstrap/modal';
import { PendingPlanListComponent } from './pending-plan-list/pending-plan-list.component';
import { PendingPlanRejectComponent } from './pending-plan-reject/pending-plan-reject.component';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [

    PendingPlanListComponent,
      PendingPlanRejectComponent
  ],
  entryComponents:[PendingPlanRejectComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    ModalModule.forRoot(),
    PendingPlanRoutingModule
  ]
})
export class PendingPlanModule { }
