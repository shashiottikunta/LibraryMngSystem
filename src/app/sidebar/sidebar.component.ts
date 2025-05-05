import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
  isAdmin:Boolean = false;
  menuList = [{
    name: 'Dashboard',
    path: 'admin-dashbaord'
  },
  {
    name: 'Users',
    path: 'users-list'
  },
  {
    name: 'Books',
    path: 'books-list'
  },
  {
    name: 'Category',
    path: 'category-list'
  },
  {
    name: 'Books By Category',
    path: 'category-books'
  },
  ]
  menuList1 = [
  {
    name: 'Books',
    path: 'user-books'
  },
  {
    name: 'My Subscriptions',
    path: 'transctions-by-user'
  },
  {
    name: 'Books By Category',
    path: 'category-books'
  },
  ]
  constructor() { }
  ngOnInit(): void {
    this.isAdmin = localStorage.getItem('isAdmin') === 'true';
    console.log(this.isAdmin)
  }

}
