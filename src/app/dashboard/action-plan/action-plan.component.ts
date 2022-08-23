import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-action-plan',
  templateUrl: './action-plan.component.html',
  styleUrls: ['./action-plan.component.css']
})
export class ActionPlanComponent implements OnInit {

  gridOne =true;
  gridTwo = false;
  gridThree= false;

  constructor(
    private router:Router,
  ) { }

  ngOnInit(): void {
  }

  gridView1(){
   this.gridOne = false;
   this.gridTwo = true;
  }

  gridView2(){
    this.router.navigateByUrl(`dashboard/action-plan/observe`);
 /*  this.gridOne = false;
  this.gridTwo = false;
  this.gridThree = true; */
  }

}
