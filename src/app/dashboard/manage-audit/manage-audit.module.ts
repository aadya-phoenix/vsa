import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ManageAuditRoutingModule } from './manage-audit-routing.module';
import { ManageAuditComponent } from './manage-audit.component';
import { ManageAuditListComponent } from './manage-audit-list/manage-audit-list.component';
import { ManageAuditViewComponent } from './manage-audit-view/manage-audit-view.component';
import { ManageAuditInitiateComponent } from './manage-audit-initiate/manage-audit-initiate.component';


@NgModule({
  declarations: [
    ManageAuditComponent,
    ManageAuditListComponent,
    ManageAuditViewComponent,
    ManageAuditInitiateComponent
  ],
  imports: [
    CommonModule,
    ManageAuditRoutingModule
  ]
})
export class ManageAuditModule { }
