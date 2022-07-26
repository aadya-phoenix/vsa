import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { dataConstants } from '../shared/constants/dataConstants';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public loginForm: FormGroup;
  users = dataConstants.Users;
  roleObj:any;
  constructor(
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
     if (this.loginForm.valid) {
      let loginDetails = this.loginForm.value;
      localStorage.setItem('loginDetails', JSON.stringify(loginDetails));
      this.users.find((role: any) => {
        if (role.username == loginDetails.username) {
          this.roleObj = role.roleId;
        }
      });
      localStorage.setItem('role', JSON.stringify(this.roleObj));
      this.router.navigate(['/dashboard']);
    } 
  }

}
