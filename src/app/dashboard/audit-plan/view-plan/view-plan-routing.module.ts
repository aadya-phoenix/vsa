import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ViewPlanComponent } from './view-plan.component';

const routes: Routes = [
  {path:'',component:ViewPlanComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ViewPlanRoutingModule { }
