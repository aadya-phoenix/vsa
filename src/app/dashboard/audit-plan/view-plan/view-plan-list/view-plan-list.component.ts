import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-view-plan-list',
  templateUrl: './view-plan-list.component.html',
  styleUrls: ['./view-plan-list.component.css']
})
export class ViewPlanListComponent implements OnInit {

  constructor(
    private router:Router
  ) { }

  ngOnInit(): void {
  }

  viewPlan(){
   this.router.navigateByUrl('dashboard/view-plan/edit');
  }

  assign(){
    this.router.navigateByUrl('dashboard/view-plan/assign');
  }

}
