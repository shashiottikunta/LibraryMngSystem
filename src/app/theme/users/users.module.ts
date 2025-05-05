import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UsersRoutingModule } from './users-routing.module';
import {ReactiveFormsModule, FormsModule} from '@angular/forms'
import { ModalModule } from 'ngx-bootstrap/modal';
import { UserBooksComponent } from './user-books/user-books.component';
import { TransctionsByUserComponent } from './transctions-by-user/transctions-by-user.component';

@NgModule({
  declarations: [
    // UserBooksComponent,
    // TransctionsByUserComponent,
 
  ],
  imports: [
    CommonModule,
    //UsersRoutingModule,
    ReactiveFormsModule, FormsModule,
    ModalModule,

  ]
})
export class UsersModule { }
