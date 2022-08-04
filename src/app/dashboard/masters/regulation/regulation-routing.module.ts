import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegulationEditComponent } from './regulation-edit/regulation-edit.component';
import { RegulationListComponent } from './regulation-list/regulation-list.component';

const routes: Routes = [
  {path:'',component:RegulationListComponent},
  {path:'add',component:RegulationEditComponent},
  {path:'edit/:id',component:RegulationEditComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RegulationRoutingModule { }
