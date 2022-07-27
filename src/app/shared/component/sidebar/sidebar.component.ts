import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../../services/auth/authentication.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {

  getUserrole: any;

  constructor(
    private authService: AuthenticationService,
  ) { 
    this.getUserrole = this.authService.getRolefromlocal();
  }

  ngOnInit(): void {
    console.log("user role",this.getUserrole)
  }

}
