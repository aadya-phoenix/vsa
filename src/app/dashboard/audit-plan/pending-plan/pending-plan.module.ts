import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PendingPlanRoutingModule } from './pending-plan-routing.module';
import { PendingPlanComponent } from './pending-plan.component';
import { PendingPlanListComponent } from './pending-plan-list/pending-plan-list.component';


@NgModule({
  declarations: [
    PendingPlanComponent,
    PendingPlanListComponent
  ],
  imports: [
    CommonModule,
    PendingPlanRoutingModule
  ]
})
export class PendingPlanModule { }
