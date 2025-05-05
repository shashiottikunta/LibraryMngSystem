import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { HttpService } from 'src/app/services/http-service/http.service';
import { NotificationService } from 'src/app/services/notification-service/notification.service';

@Component({
  selector: 'app-category-booklist',
  templateUrl: './category-booklist.component.html',
  styleUrls: ['./category-booklist.component.scss']
})
export class CategoryBooklistComponent implements OnInit {
  categorybyBookList:any;
  categoryList:any;
  selectedCategoryId: string = '1';

  constructor(private httpService: HttpService, private fb: FormBuilder, private notificationService: NotificationService) {
    this.httpService.doGet('categories').subscribe((res) => {
      this.categoryList = res.categories;
    });
  }

  ngOnInit(): void {
    this.getCategoryByBooks();
  }

  getCategoryByBooks() {
    this.httpService.doGet('categories/1/books').subscribe((res) => {
      this.categorybyBookList = res.books;
    });
  }

  getBooksByCategory(event: any) {
    this.selectedCategoryId = event.target.value;
    if (this.selectedCategoryId) {
      this.httpService.doGet(`categories/${this.selectedCategoryId}/books`).subscribe((res) => {
        this.categorybyBookList = res.books;
      });
    }
  }

}
