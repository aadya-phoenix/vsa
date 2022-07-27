import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-regulation-list',
  templateUrl: './regulation-list.component.html',
  styleUrls: ['./regulation-list.component.css']
})
export class RegulationListComponent implements OnInit {

  constructor(
    private router:Router
  ) { }

  ngOnInit(): void {
  }

  addRegulation(){
    this.router.navigateByUrl('dashboard/regulation/edit');
  }

}
