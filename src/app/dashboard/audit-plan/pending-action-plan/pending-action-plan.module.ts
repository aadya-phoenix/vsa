import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PendingActionPlanRoutingModule } from './pending-action-plan-routing.module';
import { PendingActionPlanComponent } from './pending-action-plan.component';
import { RouterModule } from '@angular/router';


@NgModule({
  declarations: [
    PendingActionPlanComponent
  ],
  imports: [
    CommonModule,
    PendingActionPlanRoutingModule,
    RouterModule
  ]
})
export class PendingActionPlanModule { }
