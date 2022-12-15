import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { AuthenticationService } from '../../shared/services/auth/authentication.service';
import { CommonService } from '../../shared/services/common/common.service';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css']
})
export class ChangePasswordComponent implements OnInit {
  public setPasswordForm: FormGroup;
  constructor(
    private formBuilder: FormBuilder,
    private router:Router,
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
      });
      this.router.navigateByUrl(`login`);
      this.commonService.hideLoading();
      },
      error:(err:any) =>{
        this.commonService.hideLoading();
      } 
    });  
  }

}
