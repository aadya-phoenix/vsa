import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';

import { ViewPlanRoutingModule } from './view-plan-routing.module';

import { ViewPlanListComponent } from './view-plan-list/view-plan-list.component';
import { ViewPlanEditComponent } from './view-plan-edit/view-plan-edit.component';
import { ViewPlanAssignComponent } from './view-plan-assign/view-plan-assign.component';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    ViewPlanListComponent,
    ViewPlanEditComponent,
    ViewPlanAssignComponent
  ],
  providers:[DatePipe],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    ViewPlanRoutingModule
  ]
})
export class ViewPlanModule { }
