import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-manage-audit-view',
  templateUrl: './manage-audit-view.component.html',
  styleUrls: ['./manage-audit-view.component.css']
})
export class ManageAuditViewComponent implements OnInit {

  constructor(private router:Router) { }

  ngOnInit(): void {
  }

  manageScreenView(){
    this.router.navigateByUrl('dashboard/manage-audit');
  }

}
