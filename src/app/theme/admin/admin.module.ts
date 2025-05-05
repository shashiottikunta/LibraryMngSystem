import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {ReactiveFormsModule, FormsModule} from '@angular/forms'
import { ModalModule } from 'ngx-bootstrap/modal';

import { AdminRoutingModule } from './admin-routing.module';
import { UsersListComponent } from './users-list/users-list.component';
import { BooksListComponent } from './books-list/books-list.component';

import { AvatarModule } from 'ngx-avatar';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { CategoryBooklistComponent } from './category-booklist/category-booklist.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { CategoryListComponent } from './category-list/category-list.component';

@NgModule({
  declarations: [
    UsersListComponent,
    BooksListComponent,
    CategoryBooklistComponent,
    DashboardComponent,
    CategoryListComponent,
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    ReactiveFormsModule, FormsModule,
    ModalModule.forRoot(),
    AvatarModule,
    BsDatepickerModule.forRoot(),


  ]
})
export class AdminModule { }
