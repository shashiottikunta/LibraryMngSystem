import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { HttpService } from 'src/app/services/http-service/http.service';
import { NotificationService } from 'src/app/services/notification-service/notification.service';

@Component({
  selector: 'app-books-list',
  templateUrl: './books-list.component.html',
  styleUrls: ['./books-list.component.scss']
})
export class BooksListComponent implements OnInit {
  booksList!: any[];
  bookForm: FormGroup;
  statusList = ['Active', 'Inactive'];
  @ViewChild('updateData') updateModal: any;
  @ViewChild('transcationsData') transcationsData:any;
  isEditMode = false;
  selectedBookId: number | null = null;
  categoryList:any;
  transcationsList:any;
  constructor(private httpService: HttpService, private fb: FormBuilder, private notificationService: NotificationService) {
    this.bookForm = this.fb.group({
      title: [''],
      author: [''],
      genre: [''],
      language: [''],
      publication_year: [''],
      status: [''],
      category_id:[null,],  
      availability:['']
    });

    this.httpService.doGet('categories').subscribe((res) => {
      this.categoryList = res.categories;
    });
  }

  ngOnInit(): void {
    this.getBooks();
  }

  getBooks() {
    this.httpService.doGet('books').subscribe((res) => {
      this.booksList = res.books;
    });
  }

  getBookDetails(bookId: number) {
    this.httpService.doGet(`books/${bookId}`).subscribe((res) => {
      this.bookForm.patchValue({
        title: res.book.title,
        author: res.book.author,
        genre: res.book.genre,
        language: res.book.language,
        publication_year: res.book.publication_year,
        status: res.book.status,
        category_id: res.book.category_id,
        availability: res.book.availability.toString() // Convert boolean to string
      });
    });
  }

  showModal(type: string, data: any = null) {
    this.isEditMode = type === 'edit';
    this.selectedBookId = data ? data.id : null;
    this.bookForm.reset();
    
    if (this.isEditMode && this.selectedBookId) {
      this.getBookDetails(this.selectedBookId);
    }
    
    this.updateModal.show();
  }

  hideModal() {
    this.updateModal.hide();
  }

  submit() {
    const formData = {
      ...this.bookForm.value,
      category_id: Number(this.bookForm.value.category_id) // Convert to number
    };

    if (this.isEditMode && this.selectedBookId) {
      this.httpService.doUpdate(`books/${this.selectedBookId}`, formData).subscribe((res) => {
        if (res) {
          this.notificationService.showSucessNotification('', res.message);
          this.getBooks();
          this.hideModal();
        }
      });
    } else {
      this.httpService.doPost('books', formData).subscribe((res) => {
        if (res) {
          this.notificationService.showSucessNotification('', res.message);
          this.getBooks();
          this.hideModal();
        }
      });
    }
  }

  getSaveButtonText(): string {
    return this.isEditMode ? 'Update' : 'Save';
  }

  showtransctions(bookId:any){
    this.transcationsData.show();
    this. getTranscations(bookId)
  }


  hidetransctions(){
    this.transcationsData.hide();
  }

  getTranscations(bookId){
    this.httpService.doGet(`transactions/user/${bookId}`).subscribe((res)=>{
      this.transcationsList = res.transactions
    })
  }
}
