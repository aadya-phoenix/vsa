import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CategoriesEditComponent } from './categories-edit/categories-edit.component';
import { CategoriesListComponent } from './categories-list/categories-list.component';

const routes: Routes = [
  {path:'',component:CategoriesListComponent},
  {path:'add',component:CategoriesEditComponent},
  {path:'edit/:id',component:CategoriesEditComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CategoriesRoutingModule { }
