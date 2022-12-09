import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LoginRoutingModule } from './login-routing.module';
import { LoginComponent } from './login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';
import { SetPasswordComponent } from './set-password/set-password.component';
import { ModalModule } from 'ngx-bootstrap/modal';

@NgModule({
  declarations: [
    LoginComponent,
    SetPasswordComponent
  ],
  entryComponents:[SetPasswordComponent],
  imports: [
    CommonModule,
    FormsModule,
    SharedModule,
    ReactiveFormsModule,
    LoginRoutingModule,
    ModalModule.forRoot(),
  ]
})
export class LoginModule { }
