import { Component, OnInit } from '@angular/core';
import { ChartOptions } from 'chart.js';
import { HttpService } from 'src/app/services/http-service/http.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  usersCount: number = 0;
  booksCount: number = 0;



  constructor(private httpService: HttpService) {}

  ngOnInit(): void {
    this.getUsers();
    this.getBooks();
  }

  getUsers() {
    this.httpService.doGet('users').subscribe((res) => {
      this.usersCount = res.users.length;
    });
  }

  getBooks() {
    this.httpService.doGet('books').subscribe((res) => {
      this.booksCount = res.books.length;
    });
  }

 
}