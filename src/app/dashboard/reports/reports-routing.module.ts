import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ActionPlanObservationComponent } from './action-plan-observation/action-plan-observation.component';
import { ActionPlanVendorComponent } from './action-plan-vendor/action-plan-vendor.component';
import { AnualAuditComponent } from './anual-audit/anual-audit.component';
import { AverageDefectComponent } from './average-defect/average-defect.component';
import { DistStatusComponent } from './dist-status/dist-status.component';
import { VendorDistStatusComponent } from './vendor-dist-status/vendor-dist-status.component';
import { VsaStatusComponent } from './vsa-status/vsa-status.component';
import { VsaTrendComponent } from './vsa-trend/vsa-trend.component';

const routes: Routes = [
  {
    path: 'anual-audit', component: AnualAuditComponent
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
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ReportsRoutingModule { }
