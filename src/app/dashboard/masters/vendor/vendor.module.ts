import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';

import { VendorRoutingModule } from './vendor-routing.module';
import { VendorListComponent } from './vendor-list/vendor-list.component';
import { VendorEditComponent } from './vendor-edit/vendor-edit.component';
import {  ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    VendorListComponent,
    VendorEditComponent
  ],
  providers:[DatePipe],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    VendorRoutingModule
  ]
})
export class VendorModule { }
