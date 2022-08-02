import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { dataConstants } from 'src/app/shared/constants/dataConstants';
import { AuthenticationService } from 'src/app/shared/services/auth/authentication.service';

@Component({
  selector: 'app-view-plan-edit',
  templateUrl: './view-plan-edit.component.html',
  styleUrls: ['./view-plan-edit.component.css']
})
export class ViewPlanEditComponent implements OnInit {
  public viewPlanForm: FormGroup;
  getUserrole: any;
  isSuperAdmin = false;
  isPlanner = false;
  isVendor = false;
  SuperAdmin = dataConstants.SuperAdmin;
  Planner = dataConstants.Planner;
  Vendor = dataConstants.Vendor;


  constructor(
    private authService: AuthenticationService,
    private formBuilder: FormBuilder,
    private router:Router
  ) { 
    this.getUserrole = this.authService.getRolefromlocal();
    this.isSuperAdmin = this.getUserrole.RoleId === this.SuperAdmin.RoleId && this.getUserrole.role === this.SuperAdmin.role;
    this. isPlanner = this.getUserrole.RoleId === this.Planner.RoleId && this.getUserrole.role === this.Planner.role;
    this.isVendor = this.getUserrole.RoleId === this.Vendor.RoleId && this.getUserrole.role === this.Vendor.role;
    
    this.viewPlanForm = this.formBuilder.group({
      vendor_code: new FormControl('', [Validators.required]),
      vendor_name: new FormControl('', [Validators.required]),
      location: new FormControl('', [Validators.required]),
      other_location: new FormControl('', [Validators.required]),
      other_code: new FormControl('', [Validators.required]),
      code: new FormControl('', [Validators.required]),
      name: new FormControl('', [Validators.required]),
      new_location: new FormControl('', [Validators.required]),
      start_date: new FormControl('', [Validators.required]),
      end_date: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required]),
      auditee_email: new FormControl('', [Validators.required]),
      attachment: new FormControl('', [Validators.required]),
   });
  }

  ngOnInit(): void {
  }

  submit(){}

  close(){
    this.router.navigateByUrl('dashboard/view-plan');
  }

}
