import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AnualAuditComponent } from './anual-audit/anual-audit.component';

const routes: Routes = [
  {
    path: 'anual-audit', component: AnualAuditComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ReportsRoutingModule { }
