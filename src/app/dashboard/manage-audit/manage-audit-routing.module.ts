import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ManageAuditInitiateComponent } from './manage-audit-initiate/manage-audit-initiate.component';
import { ManageAuditListComponent } from './manage-audit-list/manage-audit-list.component';
import { ManageAuditQuestionCategoryComponent } from './manage-audit-question-category/manage-audit-question-category.component';
import { ManageAuditQuestionDetailsComponent } from './manage-audit-question-details/manage-audit-question-details.component';
import { ManageAuditReportComponent } from './manage-audit-report/manage-audit-report.component';
import { ManageAuditSummaryComponent } from './manage-audit-summary/manage-audit-summary.component';
import { ManageAuditViewComponent } from './manage-audit-view/manage-audit-view.component';
import { ManageAuditComponent } from './manage-audit.component';


const routes: Routes = [
  {path:'',component:ManageAuditListComponent},
  {path:'view/:id',component:ManageAuditViewComponent},
  {path:'initiate/:id',component:ManageAuditInitiateComponent},
  {path:'question/:id',component:ManageAuditQuestionCategoryComponent},
  {path:'question-details/:id/:cid',component:ManageAuditQuestionDetailsComponent},
  {path:'summary/:id',component:ManageAuditSummaryComponent},
  {path:'report/:id',component:ManageAuditReportComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ManageAuditRoutingModule { }
