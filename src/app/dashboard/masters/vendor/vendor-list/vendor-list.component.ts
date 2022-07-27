import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-vendor-list',
  templateUrl: './vendor-list.component.html',
  styleUrls: ['./vendor-list.component.css']
})
export class VendorListComponent implements OnInit {
 
  constructor(
    private router:Router
  ) { }

  ngOnInit(): void {
  }

  save(){}
  close(){
 
  }
  addVendor(){
    this.router.navigateByUrl('dashboard/vendor/edit');
  }

}
