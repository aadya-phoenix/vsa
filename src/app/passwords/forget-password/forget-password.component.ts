import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/shared/services/auth/authentication.service';
import { CommonService } from 'src/app/shared/services/common/common.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-forget-password',
  templateUrl: './forget-password.component.html',
  styleUrls: ['./forget-password.component.css']
})
export class ForgetPasswordComponent implements OnInit {
  public setPasswordForm: FormGroup;
  constructor(
    private formBuilder: FormBuilder,
    private router:Router,
    private authService:AuthenticationService,
    private commonService: CommonService
  ) { 
    this.setPasswordForm = this.formBuilder.group({
      email: new FormControl('', [Validators.required]),
     });
  }

  ngOnInit(): void {
  }

  
  submit(){
    this.commonService.showLoading();
    const body  = this.setPasswordForm.value;
     this.authService.forgetPassword(body.email).subscribe({
     next:(res: any) => {
      console.log("res")
      Swal.fire({
        title: res.message,
        icon: 'success',
      });
      this.router.navigateByUrl(`login`);
      this.commonService.hideLoading();
      },
      error:(err:any) =>{
        console.log("err",err)
        this.commonService.hideLoading();
      } 
    });  
  }

}
