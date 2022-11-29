import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';

import { ManageAuditRoutingModule } from './manage-audit-routing.module';
import { ManageAuditComponent } from './manage-audit.component';
import { ManageAuditListComponent } from './manage-audit-list/manage-audit-list.component';
import { ManageAuditViewComponent } from './manage-audit-view/manage-audit-view.component';
import { ManageAuditInitiateComponent } from './manage-audit-initiate/manage-audit-initiate.component';
import { ManageAuditQuestionCategoryComponent } from './manage-audit-question-category/manage-audit-question-category.component';
import { ManageAuditQuestionDetailsComponent } from './manage-audit-question-details/manage-audit-question-details.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from 'src/app/shared/shared.module';
import { NgxPaginationModule } from 'ngx-pagination';
import { ManageAuditSummaryComponent } from './manage-audit-summary/manage-audit-summary.component';
import { NgChartsModule } from 'ng2-charts';



@NgModule({
  declarations: [
    ManageAuditComponent,
    ManageAuditListComponent,
    ManageAuditViewComponent,
    ManageAuditInitiateComponent,
    ManageAuditQuestionCategoryComponent,
    ManageAuditQuestionDetailsComponent,
    ManageAuditSummaryComponent
  ],
  providers:[DatePipe],
  imports: [
    CommonModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
    ManageAuditRoutingModule,
    NgxPaginationModule,
    NgChartsModule
  ]
})
export class ManageAuditModule { }
