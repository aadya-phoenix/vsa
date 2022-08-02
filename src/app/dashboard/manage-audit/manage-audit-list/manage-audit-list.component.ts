import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-manage-audit-list',
  templateUrl: './manage-audit-list.component.html',
  styleUrls: ['./manage-audit-list.component.css']
})
export class ManageAuditListComponent implements OnInit {

  constructor(
    private router:Router
  ) { }

  ngOnInit(): void {
  }

  viewManageAudit(){
    this.router.navigateByUrl('dashboard/manage-audit/view');
  }

  addAuditArea(){}

  initiateAudit(){
    this.router.navigateByUrl('dashboard/manage-audit/initiate');  
  }
}
