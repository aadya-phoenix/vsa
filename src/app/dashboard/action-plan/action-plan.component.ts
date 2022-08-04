import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-action-plan',
  templateUrl: './action-plan.component.html',
  styleUrls: ['./action-plan.component.css']
})
export class ActionPlanComponent implements OnInit {

  gridOne =true;
  gridTwo = false;
  gridThree= false;

  constructor() { }

  ngOnInit(): void {
  }

  gridView1(){
   this.gridOne = false;
   this.gridTwo = true;
  }

  gridView2(){
  this.gridOne = false;
  this.gridTwo = false;
  this.gridThree = true;
  }

}
