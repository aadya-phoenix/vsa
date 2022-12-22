import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';

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
import { ExecutiveSummaryComponent } from './executive-summary/executive-summary.component';
import { ReportFilterComponent } from 'src/app/shared/component/report-filter/report-filter.component';
import { AnualAuditYearlyComponent } from './anual-audit-yearly/anual-audit-yearly.component';
import { NgSelectModule } from '@ng-select/ng-select';
import { ClauseAuditWiseScoreComponent } from './clause-audit-wise-score/clause-audit-wise-score.component';
import { VendorAuditWiseScoreComponent } from './vendor-audit-wise-score/vendor-audit-wise-score.component';
import { RepeatTrendAuditWiseComponent } from './repeat-trend-audit-wise/repeat-trend-audit-wise.component';
import { VendorSummaryYearWiseComponent } from './vendor-summary-year-wise/vendor-summary-year-wise.component';


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
    VendorSummaryYearWiseComponent,
    ClauseWiseScoreComponent,
    VendorWiseScoreComponent,
    TradeRepeatComponent,
    ExecutiveSummaryComponent,
    ReportFilterComponent,
    AnualAuditYearlyComponent,
    ClauseAuditWiseScoreComponent,
    VendorAuditWiseScoreComponent,
    RepeatTrendAuditWiseComponent,
  ],
  providers:[DatePipe],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    ReportsRoutingModule,
    NgChartsModule,
    NgSelectModule,
  ]
})
export class ReportsModule { }
