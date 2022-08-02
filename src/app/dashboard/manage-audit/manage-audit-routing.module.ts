import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ManageAuditInitiateComponent } from './manage-audit-initiate/manage-audit-initiate.component';
import { ManageAuditListComponent } from './manage-audit-list/manage-audit-list.component';
import { ManageAuditQuestionCategoryComponent } from './manage-audit-question-category/manage-audit-question-category.component';
import { ManageAuditQuestionDetailsComponent } from './manage-audit-question-details/manage-audit-question-details.component';
import { ManageAuditViewComponent } from './manage-audit-view/manage-audit-view.component';


const routes: Routes = [
  {path:'',component:ManageAuditListComponent},
  {path:'view',component:ManageAuditViewComponent},
  {path:'initiate',component:ManageAuditInitiateComponent},
  {path:'question',component:ManageAuditQuestionCategoryComponent},
  {path:'question-details',component:ManageAuditQuestionDetailsComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ManageAuditRoutingModule { }
