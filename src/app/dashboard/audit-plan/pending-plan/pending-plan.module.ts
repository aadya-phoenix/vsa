import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PendingPlanRoutingModule } from './pending-plan-routing.module';

import { PendingPlanListComponent } from './pending-plan-list/pending-plan-list.component';
import { PendingPlanRejectComponent } from './pending-plan-reject/pending-plan-reject.component';


@NgModule({
  declarations: [

    PendingPlanListComponent,
      PendingPlanRejectComponent
  ],
  entryComponents:[PendingPlanRejectComponent],
  imports: [
    CommonModule,
   
    PendingPlanRoutingModule
  ]
})
export class PendingPlanModule { }
