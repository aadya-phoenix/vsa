import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RegulationRoutingModule } from './regulation-routing.module';
import { RegulationListComponent } from './regulation-list/regulation-list.component';
import { RegulationEditComponent } from './regulation-edit/regulation-edit.component';
import { ReactiveFormsModule } from '@angular/forms';
import { NgxPaginationModule } from 'ngx-pagination';


@NgModule({
  declarations: [
    RegulationListComponent,
    RegulationEditComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RegulationRoutingModule,
    NgxPaginationModule
  ]
})
export class RegulationModule { }
