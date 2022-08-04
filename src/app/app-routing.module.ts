import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DefaultLayoutComponent } from './default-layout/default-layout.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full',
  },
  {
    path: 'login',
    loadChildren: () =>
      import('./login/login.module').then(
        (m) => m.LoginModule
      ),
  },
  {
    path: '',
    component: DefaultLayoutComponent,
    data: {
      title: 'Home'
    },
    children: [
      {
        path: 'dashboard',
        loadChildren: () =>
          import('./dashboard/dashboard.module').then((m) => m.DashboardModule),
      },
      {
        path: 'dashboard/create',
        loadChildren: () =>
          import('./dashboard/audit-plan/create-plan/create-plan.module').then((m) => m.CreatePlanModule),
      },
      {
        path: 'dashboard/view-plan',
        loadChildren: () =>
          import('./dashboard/audit-plan/view-plan/view-plan.module').then((m) => m.ViewPlanModule),
      },
      {
        path: 'dashboard/pending-plan',
        loadChildren: () =>
          import('./dashboard/audit-plan/pending-plan/pending-plan.module').then((m) => m.PendingPlanModule),
      },
      {
        path: 'dashboard/manage-audit',
        loadChildren: () =>
          import('./dashboard/manage-audit/manage-audit.module').then((m) => m.ManageAuditModule),
      },
      {
        path: 'dashboard/vendor',
        loadChildren: () =>
          import('./dashboard/masters/vendor/vendor.module').then((m) => m.VendorModule),
      },
      {
        path: 'dashboard/employee',
        loadChildren: () =>
          import('./dashboard/masters/employee/employee.module').then((m) => m.EmployeeModule),
      },
      {
        path: 'dashboard/category',
        loadChildren: () =>
          import('./dashboard/masters/categories/categories.module').then((m) => m.CategoriesModule),
      },
      {
        path: 'dashboard/audit-area',
        loadChildren: () =>
          import('./dashboard/masters/audit-area/audit-area.module').then((m) => m.AuditAreaModule),
      },
      {
        path: 'dashboard/regulation',
        loadChildren: () =>
          import('./dashboard/masters/regulation/regulation.module').then((m) => m.RegulationModule),
      },
      {
        path: 'dashboard/action-plan',
        loadChildren: () =>
          import('./dashboard/action-plan/action-plan.module').then((m) => m.ActionPlanModule),
      },
      {
        path: 'dashboard/action-pending-plan',
        loadChildren: () =>
          import('./dashboard/audit-plan/pending-action-plan/pending-action-plan.module').then((m) => m.PendingActionPlanModule),
      },
      {
        path: 'report',
        loadChildren: () =>
          import('./dashboard/reports/reports.module').then((m) => m.ReportsModule),
      },
    ]
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
