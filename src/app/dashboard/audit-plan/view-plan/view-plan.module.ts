import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ViewPlanRoutingModule } from './view-plan-routing.module';
import { ViewPlanComponent } from './view-plan.component';


@NgModule({
  declarations: [
    ViewPlanComponent
  ],
  imports: [
    CommonModule,
    ViewPlanRoutingModule
  ]
})
export class ViewPlanModule { }
