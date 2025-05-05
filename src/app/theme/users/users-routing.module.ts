import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserBooksComponent } from './user-books/user-books.component';
import { TransctionsByUserComponent } from './transctions-by-user/transctions-by-user.component';


const routes: Routes = [
  {path:'user-books',component:UserBooksComponent}, {path:'transctions-by-user',component:TransctionsByUserComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UsersRoutingModule { }
