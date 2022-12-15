import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';

import { ViewPlanRoutingModule } from './view-plan-routing.module';

import { ViewPlanListComponent } from './view-plan-list/view-plan-list.component';
import { ViewPlanEditComponent } from './view-plan-edit/view-plan-edit.component';
import { ViewPlanAssignComponent } from './view-plan-assign/view-plan-assign.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ViewEvidenceComponent } from './view-evidence/view-evidence.component';
import { ViewPlanClosureComponent } from './view-plan-closure/view-plan-closure.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { AuditLogComponent } from './audit-log/audit-log.component';
import { ModalModule } from 'ngx-bootstrap/modal';
import { NgSelectModule } from '@ng-select/ng-select';
import { ViewPlanReSubmitComponent } from './view-plan-re-submit/view-plan-re-submit.component';
import { Ng2SearchPipeModule } from 'ng2-search-filter';


@NgModule({
  declarations: [
    ViewPlanListComponent,
    ViewPlanEditComponent,
    ViewPlanAssignComponent,
    ViewEvidenceComponent,
    ViewPlanClosureComponent,
    AuditLogComponent,
    ViewPlanReSubmitComponent
  ],
  entryComponents:[AuditLogComponent],
  providers:[DatePipe],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    ViewPlanRoutingModule,
    NgxPaginationModule,
    Ng2SearchPipeModule,
    NgSelectModule,
    ModalModule.forRoot(),
  ]
})
export class ViewPlanModule { }
