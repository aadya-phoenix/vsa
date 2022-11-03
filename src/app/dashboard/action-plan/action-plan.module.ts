import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ActionPlanRoutingModule } from './action-plan-routing.module';
import { ActionPlanComponent } from './action-plan.component';
import { ActionPlanObservationComponent } from './action-plan-observation/action-plan-observation.component';
import { ActionPlanListComponent } from './action-plan-list/action-plan-list.component';
import { ActionPlanDetailsComponent } from './action-plan-details/action-plan-details.component';
import { FormsModule } from '@angular/forms';
import { PendingActionPlanComponent } from './pending-action-plan/pending-action-plan.component';


@NgModule({
  declarations: [
    ActionPlanComponent,
    ActionPlanObservationComponent,
    ActionPlanListComponent,
    ActionPlanDetailsComponent,
    PendingActionPlanComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ActionPlanRoutingModule
  ]
})
export class ActionPlanModule { }
