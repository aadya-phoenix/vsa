import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-audit-area-list',
  templateUrl: './audit-area-list.component.html',
  styleUrls: ['./audit-area-list.component.css']
})
export class AuditAreaListComponent implements OnInit {

  constructor(private router:Router) { }

  ngOnInit(): void {
  }

  addAuditArea(){
    this.router.navigateByUrl('dashboard/audit/edit');
  }

}
