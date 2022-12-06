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
import { VendorAttendeesComponent } from './vendor-attendees/vendor-attendees.component';
import { CriticalObservationComponent } from './critical-observation/critical-observation.component';
import { SectionHeadRemarksComponent } from './section-head-remarks/section-head-remarks.component';
import { LastYearRemarksComponent } from './last-year-remarks/last-year-remarks.component';
import { ModalModule } from 'ngx-bootstrap/modal';
import { ManageAuditLogComponent } from './manage-audit-log/manage-audit-log.component';



@NgModule({
  declarations: [
    ManageAuditComponent,
    ManageAuditListComponent,
    ManageAuditViewComponent,
    ManageAuditInitiateComponent,
    ManageAuditQuestionCategoryComponent,
    ManageAuditQuestionDetailsComponent,
    ManageAuditSummaryComponent,
    VendorAttendeesComponent,
    CriticalObservationComponent,
    SectionHeadRemarksComponent,
    LastYearRemarksComponent,
    ManageAuditLogComponent
  ],
  entryComponents:[VendorAttendeesComponent,ManageAuditLogComponent,
    CriticalObservationComponent,SectionHeadRemarksComponent, LastYearRemarksComponent],
  providers:[DatePipe],
  imports: [
    CommonModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
    ModalModule.forRoot(),
    ManageAuditRoutingModule,
    NgxPaginationModule,
    NgChartsModule
  ]
})
export class ManageAuditModule { }
