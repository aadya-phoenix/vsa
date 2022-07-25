import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CreatePlanRoutingModule } from './create-plan-routing.module';
import { CreatePlanComponent } from './create-plan.component';


@NgModule({
  declarations: [
    CreatePlanComponent
  ],
  imports: [
    CommonModule,
    CreatePlanRoutingModule
  ]
})
export class CreatePlanModule { }
