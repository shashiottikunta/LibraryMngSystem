import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UsersListComponent } from './users-list/users-list.component';
import { BooksListComponent } from './books-list/books-list.component';
import { CategoryBooklistComponent } from './category-booklist/category-booklist.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { CategoryListComponent } from './category-list/category-list.component';

const routes: Routes = [
{path:'users-list',component:UsersListComponent},{path:'books-list',component:BooksListComponent},
{path:'category-books',component:CategoryBooklistComponent},
{path:'admin-dashbaord',component:DashboardComponent},{path:'category-list',component:CategoryListComponent}

]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
