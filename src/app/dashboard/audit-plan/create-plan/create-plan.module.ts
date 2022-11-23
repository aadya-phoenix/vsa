import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CreatePlanRoutingModule } from './create-plan-routing.module';
import { CreatePlanComponent } from './create-plan.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { NgSelectModule } from '@ng-select/ng-select';


@NgModule({
  declarations: [
    CreatePlanComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    CreatePlanRoutingModule,
    RouterModule,
    NgSelectModule
  ]
})
export class CreatePlanModule { }
