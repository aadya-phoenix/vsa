import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PendingActionPlanRoutingModule } from './pending-action-plan-routing.module';
import { PendingActionPlanComponent } from './pending-action-plan.component';


@NgModule({
  declarations: [
    PendingActionPlanComponent
  ],
  imports: [
    CommonModule,
    PendingActionPlanRoutingModule
  ]
})
export class PendingActionPlanModule { }
