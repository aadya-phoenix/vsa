import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { VendorEditComponent } from './vendor-edit/vendor-edit.component';
import { VendorListComponent } from './vendor-list/vendor-list.component';

const routes: Routes = [
  {path:'',component:VendorListComponent},
  {path:'edit',component:VendorEditComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class VendorRoutingModule { }
