import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ViewEvidenceComponent } from './view-evidence/view-evidence.component';
import { ViewPlanAssignComponent } from './view-plan-assign/view-plan-assign.component';
import { ViewPlanClosureComponent } from './view-plan-closure/view-plan-closure.component';
import { ViewPlanEditComponent } from './view-plan-edit/view-plan-edit.component';
import { ViewPlanListComponent } from './view-plan-list/view-plan-list.component';
import { ViewPlanReSubmitComponent } from './view-plan-re-submit/view-plan-re-submit.component';


const routes: Routes = [
  {path:'',component:ViewPlanListComponent},
  {path:'edit/:id',component:ViewPlanEditComponent},
  {path:'assign/:id',component:ViewPlanAssignComponent},
  {path:'evidence/:id',component:ViewEvidenceComponent},
  {path:'closure/:id',component:ViewPlanClosureComponent},
  {path:'resubmit/:id',component:ViewPlanReSubmitComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ViewPlanRoutingModule { }
