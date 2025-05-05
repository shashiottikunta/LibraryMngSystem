import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { HttpService } from 'src/app/services/http-service/http.service';
import { NotificationService } from 'src/app/services/notification-service/notification.service';

@Component({
  selector: 'app-user-books',
  templateUrl: './user-books.component.html',
  styleUrls: ['./user-books.component.scss']
})
export class UserBooksComponent implements OnInit {
  booksList:any;
  constructor(private httpService: HttpService, private fb: FormBuilder, private notificationService: NotificationService) {
   
  }

  ngOnInit(): void {
    this.getBooks();
  }

  getBooks(){
    this.httpService.doGet('books').subscribe((res) => {
      this.booksList = res.books;
    });
  }


  borrowBook(bookId: number) {
    const due_date = new Date(new Date().setDate(new Date().getDate() + 7))
  .toISOString()
  .replace("T", " ") 
  .slice(0, 19); 

    const borrowPayload = {
      user_id: Number(localStorage.getItem('userId')),
      book_id: bookId,
      due_date: due_date, 
    };

    this.httpService.doPost('transactions/borrow', borrowPayload).subscribe(
      (res) => {
        this.notificationService.showSucessNotification('','Book borrowed successfully');
        this.getBooks(); // Refresh book list
      },
      (err) => {
        this.notificationService.showErrorNotification('','Failed to borrow book');
      }
    );
  }

  returnBook(bookId: number) {
    const returnPayload = {
      user_id: Number(localStorage.getItem('userId')),
      book_id: bookId
    };

    this.httpService.doPost('transactions/return', returnPayload).subscribe(
      (res) => {
        this.notificationService.showSucessNotification('','Book returned successfully');
        this.getBooks(); // Refresh book list
      },
      (err) => {
        this.notificationService.showErrorNotification('','Failed to return book');
      }
    );
  }
}





