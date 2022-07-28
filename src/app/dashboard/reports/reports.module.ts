import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NgChartsModule } from 'ng2-charts';
import { ReportsRoutingModule } from './reports-routing.module';
import { AnualAuditComponent } from './anual-audit/anual-audit.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    AnualAuditComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    ReportsRoutingModule,
    NgChartsModule
  ]
})
export class ReportsModule { }
