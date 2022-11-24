import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PendingPlanRoutingModule } from './pending-plan-routing.module';
import { ModalModule } from 'ngx-bootstrap/modal';
import { PendingPlanListComponent } from './pending-plan-list/pending-plan-list.component';
import { PendingPlanRejectComponent } from './pending-plan-reject/pending-plan-reject.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxPaginationModule } from 'ngx-pagination';
import { Ng2SearchPipeModule } from 'ng2-search-filter';


@NgModule({
  declarations: [

    PendingPlanListComponent,
      PendingPlanRejectComponent
  ],
  entryComponents:[PendingPlanRejectComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    ModalModule.forRoot(),
    PendingPlanRoutingModule,
    NgxPaginationModule,
    Ng2SearchPipeModule
  ]
})
export class PendingPlanModule { }
