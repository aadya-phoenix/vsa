import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ManageAuditComponent } from './manage-audit.component';

const routes: Routes = [
  {path:'',component:ManageAuditComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ManageAuditRoutingModule { }
