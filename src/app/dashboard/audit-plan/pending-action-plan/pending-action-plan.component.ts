import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-pending-action-plan',
  templateUrl: './pending-action-plan.component.html',
  styleUrls: ['./pending-action-plan.component.css']
})
export class PendingActionPlanComponent implements OnInit {

  constructor(
    private router:Router
  ) { }

  ngOnInit(): void {
  }
  closeobser(){
    this.router.navigateByUrl(`dashboard/view-plan`); 
   }

}
