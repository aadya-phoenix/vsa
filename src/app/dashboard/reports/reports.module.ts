import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NgChartsModule } from 'ng2-charts';
import { ReportsRoutingModule } from './reports-routing.module';
import { AnualAuditComponent } from './anual-audit/anual-audit.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DistStatusComponent } from './dist-status/dist-status.component';
import { VendorDistStatusComponent } from './vendor-dist-status/vendor-dist-status.component';
import { VsaStatusComponent } from './vsa-status/vsa-status.component';
import { VsaTrendComponent } from './vsa-trend/vsa-trend.component';
import { ActionPlanVendorComponent } from './action-plan-vendor/action-plan-vendor.component';
import { ActionPlanObservationComponent } from './action-plan-observation/action-plan-observation.component';
import { AverageDefectComponent } from './average-defect/average-defect.component';
import { PendingStatusComponent } from './pending-status/pending-status.component';
import { AverageDefectSupplierComponent } from './average-defect-supplier/average-defect-supplier.component';
import { VendorSummaryComponent } from './vendor-summary/vendor-summary.component';
import { ClauseWiseScoreComponent } from './clause-wise-score/clause-wise-score.component';
import { VendorWiseScoreComponent } from './vendor-wise-score/vendor-wise-score.component';
import { TradeRepeatComponent } from './trade-repeat/trade-repeat.component';


@NgModule({
  declarations: [
    AnualAuditComponent,
    DistStatusComponent,
    VendorDistStatusComponent,
    VsaStatusComponent,
    VsaTrendComponent,
    ActionPlanVendorComponent,
    ActionPlanObservationComponent,
    AverageDefectComponent,
    PendingStatusComponent,
    AverageDefectSupplierComponent,
    VendorSummaryComponent,
    ClauseWiseScoreComponent,
    VendorWiseScoreComponent,
    TradeRepeatComponent
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
