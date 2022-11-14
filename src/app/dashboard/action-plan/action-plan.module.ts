import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ActionPlanRoutingModule } from './action-plan-routing.module';
import { ActionPlanComponent } from './action-plan.component';
import { ActionPlanObservationComponent } from './action-plan-observation/action-plan-observation.component';
import { ActionPlanListComponent } from './action-plan-list/action-plan-list.component';
import { ActionPlanDetailsComponent } from './action-plan-details/action-plan-details.component';
import { FormsModule } from '@angular/forms';
import { PendingActionPlanComponent } from './pending-action-plan/pending-action-plan.component';
import { ActionPlanAuditorComponent } from './action-plan-auditor/action-plan-auditor.component';
import { RouterModule } from '@angular/router';
import { NgxPaginationModule } from 'ngx-pagination';
import { ActionPlanVendorComponent } from './action-plan-vendor/action-plan-vendor.component';
import { ActionPlanCategoryVendorComponent } from './action-plan-category-vendor/action-plan-category-vendor.component';
import { ActionPlanUpdateComponent } from './action-plan-update/action-plan-update.component';
import { ActionPlanAuditorCategoryComponent } from './action-plan-auditor-category/action-plan-auditor-category.component';
import { ActionPlanReceiveComponent } from './action-plan-receive/action-plan-receive.component';


@NgModule({
  declarations: [
    ActionPlanComponent,
    ActionPlanObservationComponent,
    ActionPlanListComponent,
    ActionPlanDetailsComponent,
    PendingActionPlanComponent,
    ActionPlanAuditorComponent,
    ActionPlanVendorComponent,
    ActionPlanCategoryVendorComponent,
    ActionPlanUpdateComponent,
    ActionPlanAuditorCategoryComponent,
    ActionPlanReceiveComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ActionPlanRoutingModule,
    RouterModule,
    NgxPaginationModule
  ]
})
export class ActionPlanModule { }
