import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl } from '@angular/forms';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { AuditPlanService } from 'src/app/shared/services/audit-plan/audit-plan.service';
import { AuthenticationService } from 'src/app/shared/services/auth/authentication.service';
import { CommonService } from 'src/app/shared/services/common/common.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-set-password',
  templateUrl: './set-password.component.html',
  styleUrls: ['./set-password.component.css']
})
export class SetPasswordComponent implements OnInit {

  public setPasswordForm: FormGroup;
  public status: any;
  data:any;

  constructor(
    public bsModalRef: BsModalRef,
    private formBuilder: FormBuilder,
    private authService:AuthenticationService,
    private commonService: CommonService
  ) {
    this.setPasswordForm = this.formBuilder.group({
      password: new FormControl('', []),
      newPassword: new FormControl('', []),
    });
   }

  ngOnInit(): void {
  }

  submit(){
    this.commonService.showLoading();
    const body  = this.setPasswordForm.value;
     this.authService.setPassword(body).subscribe({
     next:(res: any) => {
      Swal.fire({
        title: res.message,
        icon: 'success',
      })
      this.bsModalRef.hide();
      this.commonService.hideLoading();
      },
      error:(err:any) =>{
        this.commonService.hideLoading();

      } 
    });  
  }
}
