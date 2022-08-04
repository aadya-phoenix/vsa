import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuditAreaEditComponent } from './audit-area-edit/audit-area-edit.component';
import { AuditAreaListComponent } from './audit-area-list/audit-area-list.component';

const routes: Routes = [
  {path:'',component:AuditAreaListComponent},
  {path:'add',component:AuditAreaEditComponent},
  {path:'edit/:id',component:AuditAreaEditComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuditAreaRoutingModule { }
