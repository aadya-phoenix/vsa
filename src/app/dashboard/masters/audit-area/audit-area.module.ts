import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuditAreaRoutingModule } from './audit-area-routing.module';
import { AuditAreaListComponent } from './audit-area-list/audit-area-list.component';
import { AuditAreaEditComponent } from './audit-area-edit/audit-area-edit.component';


@NgModule({
  declarations: [
    AuditAreaListComponent,
    AuditAreaEditComponent
  ],
  imports: [
    CommonModule,
    AuditAreaRoutingModule
  ]
})
export class AuditAreaModule { }
