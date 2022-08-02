import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-categories-edit',
  templateUrl: './categories-edit.component.html',
  styleUrls: ['./categories-edit.component.css']
})
export class CategoriesEditComponent implements OnInit {

  categoryForm:FormGroup;

  constructor(
    private fb:FormBuilder,
    private router:Router
  ) {
    this.categoryForm = this.fb.group({
      name: new FormControl('', [Validators.required]),
      code: new FormControl('', [Validators.required])
    });
   }

  ngOnInit(): void {
  }

  save(){}

  close(){
    this.router.navigateByUrl('dashboard/categories');
  }

}
