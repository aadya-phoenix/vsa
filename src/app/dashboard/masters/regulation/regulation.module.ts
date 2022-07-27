import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RegulationRoutingModule } from './regulation-routing.module';
import { RegulationListComponent } from './regulation-list/regulation-list.component';
import { RegulationEditComponent } from './regulation-edit/regulation-edit.component';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    RegulationListComponent,
    RegulationEditComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RegulationRoutingModule
  ]
})
export class RegulationModule { }
