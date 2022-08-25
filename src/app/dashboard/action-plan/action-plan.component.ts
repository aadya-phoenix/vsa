import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-action-plan',
  templateUrl: './action-plan.component.html',
  styleUrls: ['./action-plan.component.css']
})
export class ActionPlanComponent implements OnInit {

  screenOne = true;
  gridFour = false;
  gridOne =true;
  gridTwo = false;
  gridThree= false;

  constructor() { }

  ngOnInit(): void {
  }

  showgrid(){
   this.gridOne  = false;
   this.gridFour = true;
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

  close(){}
  
  Closeobser(){}

  Closeogrid2(){}

}
