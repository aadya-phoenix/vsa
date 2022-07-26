import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PendingPlanComponent } from './pending-plan.component';

const routes: Routes = [
  {path:'',component:PendingPlanComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PendingPlanRoutingModule { }
