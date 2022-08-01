import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { dataConstants } from '../shared/constants/dataConstants';
import jwt_decode from "jwt-decode";
import { AuthenticationService } from '../shared/services/auth/authentication.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public loginForm: FormGroup;
  roles = dataConstants.Roles;
  roleObj:any;

  constructor(
    private authService:AuthenticationService,
    private formBuilder: FormBuilder,
    private router: Router,
  ) {
    this.loginForm = this.formBuilder.group({
      username: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required]),
   });
  }
  ngOnInit(): void {
  }

  login(){
    if(this.loginForm.valid){
     let loginDetails = this.loginForm.value;
     this.authService.login(loginDetails).subscribe((res:any)=>{
      if(res){
       const token = this.getDecodedAccessToken(res.token);
       localStorage.setItem('loginDetails', JSON.stringify(token));
        this.roles.find((currentrole: any) => {
          if (currentrole.RoleId === token.RoleId && currentrole.role == token.role){
           let roleObj = currentrole;
           localStorage.setItem('role', JSON.stringify(roleObj));
          }
          else{
            localStorage.setItem('role',''); 
          }
        });
        this.router.navigateByUrl('dashboard');
      }
     });
   } 
  }
  getDecodedAccessToken(token: string): any {
    try {
      return jwt_decode(token);
    } catch(Error) {
      return null;
    }
  }

}
