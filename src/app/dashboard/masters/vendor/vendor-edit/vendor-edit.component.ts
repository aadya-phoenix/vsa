import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-vendor-edit',
  templateUrl: './vendor-edit.component.html',
  styleUrls: ['./vendor-edit.component.css']
})
export class VendorEditComponent implements OnInit {

  influencerObj:any;
  Vender = true;
  VenderDetail = false;
  constructor() { }

  ngOnInit(): void {
  }

  Save(){}
  Close(){
    this.Vender = true;
    this.VenderDetail = false;
  }
  addVendor(){
    this.Vender = false;
    this.VenderDetail = true;
  }
}