import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-vendor-list',
  templateUrl: './vendor-list.component.html',
  styleUrls: ['./vendor-list.component.css']
})
export class VendorListComponent implements OnInit {
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
