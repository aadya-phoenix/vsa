import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../../services/auth/authentication.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  userName: any;
  firstName: any;
  lastName: any;
  constructor(
    private authService:AuthenticationService
  ) {
    if (localStorage.getItem('userName')) {
      this.userName = JSON.parse(localStorage.getItem('userName') as any);
    }
    if (this.userName) {
      this.firstName = this.userName.Name      ;
     
    }
    this.userName =  this.authService.getLoginDetails();
    this.firstName = this.userName.Name;
   }

  ngOnInit(): void {
  }



}
