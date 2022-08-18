import { Component, OnInit } from '@angular/core';

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

  close(){
    this.gridOne  = true;
    this.gridFour = false;
  }
  Closeobser(){
    this.gridOne = false;
    this.gridTwo = true;
    this.gridThree = false;
    }

    Closeogrid2(){
      this.gridOne = true;
      this.gridTwo = false;
      this.gridThree = false;
      }

}
