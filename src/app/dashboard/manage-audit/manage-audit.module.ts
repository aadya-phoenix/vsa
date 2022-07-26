import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ManageAuditRoutingModule } from './manage-audit-routing.module';
import { ManageAuditComponent } from './manage-audit.component';


@NgModule({
  declarations: [
    ManageAuditComponent
  ],
  imports: [
    CommonModule,
    ManageAuditRoutingModule
  ]
})
export class ManageAuditModule { }
