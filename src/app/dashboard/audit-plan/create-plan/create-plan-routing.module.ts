import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreatePlanComponent } from './create-plan.component';

const routes: Routes = [
  {path:'',component:CreatePlanComponent},
  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CreatePlanRoutingModule { }
