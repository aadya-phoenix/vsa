import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ActionPlanRoutingModule } from './action-plan-routing.module';
import { ActionPlanComponent } from './action-plan.component';
import { ActionPlanObservationComponent } from './action-plan-observation/action-plan-observation.component';
import { ActionPlanListComponent } from './action-plan-list/action-plan-list.component';
import { ActionPlanDetailsComponent } from './action-plan-details/action-plan-details.component';


@NgModule({
  declarations: [
    ActionPlanComponent,
    ActionPlanObservationComponent,
    ActionPlanListComponent,
    ActionPlanDetailsComponent
  ],
  imports: [
    CommonModule,
    ActionPlanRoutingModule
  ]
})
export class ActionPlanModule { }
