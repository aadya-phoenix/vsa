import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ActionPlanComponent } from './action-plan.component';

const routes: Routes = [
  {path:'',component:ActionPlanComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ActionPlanRoutingModule { }
