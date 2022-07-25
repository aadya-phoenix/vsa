import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PendingPlanRoutingModule } from './pending-plan-routing.module';
import { PendingPlanComponent } from './pending-plan.component';


@NgModule({
  declarations: [
    PendingPlanComponent
  ],
  imports: [
    CommonModule,
    PendingPlanRoutingModule
  ]
})
export class PendingPlanModule { }
