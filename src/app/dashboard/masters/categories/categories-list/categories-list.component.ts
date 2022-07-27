import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-categories-list',
  templateUrl: './categories-list.component.html',
  styleUrls: ['./categories-list.component.css']
})
export class CategoriesListComponent implements OnInit {

  Category = true;
  CategoryDetails = false;
  constructor() { }

  ngOnInit(): void {
  }

  Save(){
    
  };

  AddCategory(){
    this.Category = false;
    this.CategoryDetails = true;
  };
  Close(){
    this.Category = true;
    this.CategoryDetails = false;
  }

}
