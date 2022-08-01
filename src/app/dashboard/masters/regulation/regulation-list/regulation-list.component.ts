import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { dataConstants } from 'src/app/shared/constants/dataConstants';
import { AuthenticationService } from 'src/app/shared/services/auth/authentication.service';

@Component({
  selector: 'app-regulation-list',
  templateUrl: './regulation-list.component.html',
  styleUrls: ['./regulation-list.component.css']
})
export class RegulationListComponent implements OnInit {

  getUserrole: any;
  isSuperAdmin = false;
  isPlanner = false;
  SuperAdmin = dataConstants.SuperAdmin;
  Planner = dataConstants.SuperAdmin;

  constructor(
    private router:Router,
    private authService: AuthenticationService,) { 
    this.getUserrole = this.authService.getRolefromlocal();
    this.isSuperAdmin = this.getUserrole.RoleId === this.SuperAdmin.RoleId && this.getUserrole.role === this.SuperAdmin.role;
    this. isPlanner = this.getUserrole.RoleId === this.Planner.RoleId && this.getUserrole.role === this.Planner.role;
  }

  ngOnInit(): void {
  }

  addRegulation(){
    this.router.navigateByUrl('dashboard/regulation/edit');
  }

}
