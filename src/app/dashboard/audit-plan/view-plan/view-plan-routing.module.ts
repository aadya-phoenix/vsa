import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ViewPlanAssignComponent } from './view-plan-assign/view-plan-assign.component';
import { ViewPlanEditComponent } from './view-plan-edit/view-plan-edit.component';
import { ViewPlanListComponent } from './view-plan-list/view-plan-list.component';


const routes: Routes = [
  {path:'',component:ViewPlanListComponent},
  {path:'edit/:id',component:ViewPlanEditComponent},
  {path:'assign',component:ViewPlanAssignComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ViewPlanRoutingModule { }
