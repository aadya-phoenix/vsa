import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ManageAuditInitiateComponent } from './manage-audit-initiate/manage-audit-initiate.component';
import { ManageAuditListComponent } from './manage-audit-list/manage-audit-list.component';
import { ManageAuditViewComponent } from './manage-audit-view/manage-audit-view.component';


const routes: Routes = [
  {path:'',component:ManageAuditListComponent},
  {path:'view',component:ManageAuditViewComponent},
  {path:'initiate',component:ManageAuditInitiateComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ManageAuditRoutingModule { }
