import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ActionPlanDetailsComponent } from './action-plan-details/action-plan-details.component';
import { ActionPlanListComponent } from './action-plan-list/action-plan-list.component';
import { ActionPlanObservationComponent } from './action-plan-observation/action-plan-observation.component';

const routes: Routes = [
  {path:'',component:ActionPlanListComponent},
  {path:'category/:id',component:ActionPlanDetailsComponent},
  {path:'observe/:id/:cid',component:ActionPlanObservationComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ActionPlanRoutingModule { }
