import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-manage-audit-initiate',
  templateUrl: './manage-audit-initiate.component.html',
  styleUrls: ['./manage-audit-initiate.component.css']
})
export class ManageAuditInitiateComponent implements OnInit {

  constructor(
    private router:Router
  ) { }

  ngOnInit(): void {
  }

  next(){
    
  }

  back(){
    this.router.navigateByUrl('dashboard/manage-audit');
  }

}
