import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PendingActionPlanComponent } from './pending-action-plan.component';

const routes: Routes = [
  {path:'',component: PendingActionPlanComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PendingActionPlanRoutingModule { }
