import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.css']
})
export class EmployeeListComponent implements OnInit {
  EmpMaster = true;
  EmpMasterDetail = false;
  constructor() { }


  ngOnInit(): void {
  }

  AddEmployee(){
    this.EmpMaster = false;
    this.EmpMasterDetail = true;
  }
  Close () {
    this.EmpMaster = true;
    this.EmpMasterDetail = false;
  }
  Save(){}

}
