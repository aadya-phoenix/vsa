import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ActionPlanObservationComponent } from './action-plan-observation/action-plan-observation.component';
import { ActionPlanVendorComponent } from './action-plan-vendor/action-plan-vendor.component';
import { AnualAuditYearlyComponent } from './anual-audit-yearly/anual-audit-yearly.component';
import { AnualAuditComponent } from './anual-audit/anual-audit.component';
import { AverageDefectSupplierComponent } from './average-defect-supplier/average-defect-supplier.component';
import { AverageDefectComponent } from './average-defect/average-defect.component';
import { ClauseAuditWiseScoreComponent } from './clause-audit-wise-score/clause-audit-wise-score.component';
import { ClauseWiseScoreComponent } from './clause-wise-score/clause-wise-score.component';
import { DistStatusComponent } from './dist-status/dist-status.component';
import { ExecutiveSummaryComponent } from './executive-summary/executive-summary.component';
import { PendingStatusComponent } from './pending-status/pending-status.component';
import { TradeRepeatComponent } from './trade-repeat/trade-repeat.component';
import { VendorDistStatusComponent } from './vendor-dist-status/vendor-dist-status.component';
import { VendorSummaryComponent } from './vendor-summary/vendor-summary.component';
import { VendorWiseScoreComponent } from './vendor-wise-score/vendor-wise-score.component';
import { VsaStatusComponent } from './vsa-status/vsa-status.component';
import { VsaTrendComponent } from './vsa-trend/vsa-trend.component';

const routes: Routes = [
  {
    path: 'anual-audit', component: AnualAuditComponent
  },
  {
    path: 'anual-audit-yearly', component: AnualAuditYearlyComponent
  },
  {
    path: 'dist-status', component: DistStatusComponent
  },
  {
    path: 'vendor-dist-status', component: VendorDistStatusComponent
  },
  {
    path: 'vsa-status', component: VsaStatusComponent
  },
  {
    path: 'vsa-trend', component: VsaTrendComponent
  },
  {
    path: 'action-plan-vendor', component: ActionPlanVendorComponent
  },
  {
    path: 'action-plan-observation', component: ActionPlanObservationComponent
  },
  {
    path: 'average-defect', component: AverageDefectComponent
  },
  {
    path: 'pending-status', component: PendingStatusComponent
  },
  {
    path: 'average-defect-supplier', component: AverageDefectSupplierComponent
  },
  {
    path: 'vendor-summary', component: VendorSummaryComponent
  },
  {
    path: 'clause-wise-score', component: ClauseWiseScoreComponent
  },
  {
    path: 'clause-audit-wise-score', component: ClauseAuditWiseScoreComponent
  },
  {
    path: 'vendor-wise-score', component: VendorWiseScoreComponent
  },
  {
    path: 'trade-repeat', component: TradeRepeatComponent
  },
  {
    path: 'executive-summary', component: ExecutiveSummaryComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ReportsRoutingModule { }
