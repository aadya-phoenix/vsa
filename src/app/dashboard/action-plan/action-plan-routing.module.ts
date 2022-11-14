import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ActionPlanAuditorCategoryComponent } from './action-plan-auditor-category/action-plan-auditor-category.component';
import { ActionPlanAuditorComponent } from './action-plan-auditor/action-plan-auditor.component';
import { ActionPlanCategoryVendorComponent } from './action-plan-category-vendor/action-plan-category-vendor.component';
import { ActionPlanDetailsComponent } from './action-plan-details/action-plan-details.component';
import { ActionPlanListComponent } from './action-plan-list/action-plan-list.component';
import { ActionPlanObservationComponent } from './action-plan-observation/action-plan-observation.component';
import { ActionPlanReceiveComponent } from './action-plan-receive/action-plan-receive.component';
import { ActionPlanUpdateComponent } from './action-plan-update/action-plan-update.component';
import { ActionPlanVendorComponent } from './action-plan-vendor/action-plan-vendor.component';
import { PendingActionPlanComponent } from './pending-action-plan/pending-action-plan.component';

const routes: Routes = [
  {path:'',component:ActionPlanListComponent},
  {path:'category/:id',component:ActionPlanDetailsComponent},
  {path:'observe/:id/:cid',component:ActionPlanObservationComponent},
  {path:'action-pending-plan/:id', component:PendingActionPlanComponent},
  {path:'auditor',component:ActionPlanAuditorComponent},
  {path:'vendor', component:ActionPlanVendorComponent},
  {path:'vendor/category/:id', component:ActionPlanCategoryVendorComponent},
  {path:'receive',component:ActionPlanReceiveComponent},
  {path:'auditor/category/:id', component:ActionPlanAuditorCategoryComponent},
  {path:'update/:id/:cid',component:ActionPlanUpdateComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ActionPlanRoutingModule { }
