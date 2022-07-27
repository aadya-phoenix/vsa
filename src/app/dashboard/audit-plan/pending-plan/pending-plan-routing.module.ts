import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PendingPlanListComponent } from './pending-plan-list/pending-plan-list.component';
import { PendingPlanComponent } from './pending-plan.component';

const routes: Routes = [
  {path:'',component:PendingPlanListComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PendingPlanRoutingModule { }
