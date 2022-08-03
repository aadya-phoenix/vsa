import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ActionPlanRoutingModule } from './action-plan-routing.module';
import { ActionPlanComponent } from './action-plan.component';


@NgModule({
  declarations: [
    ActionPlanComponent
  ],
  imports: [
    CommonModule,
    ActionPlanRoutingModule
  ]
})
export class ActionPlanModule { }
