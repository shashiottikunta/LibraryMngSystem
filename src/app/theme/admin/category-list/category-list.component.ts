import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { HttpService } from 'src/app/services/http-service/http.service';
import { NotificationService } from 'src/app/services/notification-service/notification.service';

@Component({
  selector: 'app-category-list',
  templateUrl: './category-list.component.html',
  styleUrls: ['./category-list.component.scss']
})
export class CategoryListComponent implements OnInit {
  categoryList: any;
  statusList = ['Active', 'Inactive'];
  @ViewChild('updateData') updateModal: any;
  isEditMode = false;
  selectedCategoryId: number | null = null;
  categoryForm: FormGroup;

  constructor(private httpService: HttpService, private fb: FormBuilder, private notificationService: NotificationService) {
    this.categoryForm = this.fb.group({
      name: [''],
      status: ['']
    })
  }
  ngOnInit(): void {
    this.getCategoryList();
  }

  getCategoryList() {
    this.httpService.doGet('categories').subscribe((res) => {
      this.categoryList = res.categories;
    });
  }

  showModal(type: string, data: any = null) {
    this.isEditMode = type === 'edit';
    this.selectedCategoryId = data ? data.id : null;
    this.categoryForm.reset();

    if (this.isEditMode && this.selectedCategoryId) {
      this.getBookDetails(this.selectedCategoryId);
    }
    this.updateModal.show();
  }

  getBookDetails(categoryId: number) {
    this.httpService.doGet(`categories/${categoryId}`).subscribe((res) => {
      this.categoryForm.patchValue({
        name: res.categories.name,
        status: res.categories.status,
      })
    });
  }

  getSaveButtonText(): string {
    return this.isEditMode ? 'Update' : 'Save';
  }

  hideModal() {
    this.updateModal.hide();
  }

  submit() {
    const formData = {
      ...this.categoryForm.value,
    };

    if (this.isEditMode && this.selectedCategoryId) {
      this.httpService.doUpdate(`categories/${this.selectedCategoryId}`, formData).subscribe((res) => {
        if (res) {
          this.notificationService.showSucessNotification('', res.message);
          this.getCategoryList();
          this.hideModal();
        }
      });
    } else {
      this.httpService.doPost('categories', formData).subscribe((res) => {
        if (res) {
          this.notificationService.showSucessNotification('', res.message);
          this.getCategoryList();
          this.hideModal();
        }
      });
    }
  }

}
