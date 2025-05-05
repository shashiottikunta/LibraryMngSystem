import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { HttpService } from 'src/app/services/http-service/http.service';
import { NotificationService } from 'src/app/services/notification-service/notification.service';

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.scss']
})
export class UsersListComponent implements OnInit {
  usersList!: any[];
  userForm: FormGroup;
  statusList = ['Active', 'Inactive'];
  @ViewChild('updateData') updateModal: any;
  isEditMode = false;
  selectedUserId: number | null = null;

  constructor(private httpService: HttpService, private fb: FormBuilder, private notificationService: NotificationService) {
    this.userForm = this.fb.group({
      name: [''],
      email: [''],
      password: [''],
      status: ['']
    });
  }

  ngOnInit(): void {
    this.getUsers();
  }

  getUsers() {
    this.httpService.doGet('users').subscribe((res) => {
      this.usersList = res.users;
    });
  }

  getUserDetails(userId: number) {
    this.httpService.doGet(`users/${userId}`).subscribe((res) => {
      this.userForm.patchValue({
        name: res.user.name,
        email: res.user.email,
        status: res.user.status
      });
    });
  }

  showModal(type: string, data: any = null) {
    this.isEditMode = type === 'edit';
    this.selectedUserId = data ? data.id : null;
    this.userForm.reset();
    
    if (this.isEditMode && this.selectedUserId) {
      this.getUserDetails(this.selectedUserId);
    }
    
    this.updateModal.show();
  }

  hideModal() {
    this.updateModal.hide();
  }

  submit() {
    const payload = this.userForm.value;
    payload.is_admin = false;

    if (this.isEditMode && this.selectedUserId) {
      this.httpService.doUpdate(`users/${this.selectedUserId}`, payload).subscribe((res) => {
        if (res) {
          this.notificationService.showSucessNotification('', res.message);
          this.getUsers();
          this.hideModal();
        }
      });
    } else {
      this.httpService.doPost('users/register', payload).subscribe((res) => {
        if (res) {
          this.notificationService.showSucessNotification('', res.message);
          this.getUsers();
          this.hideModal();
        }
      });
    }
  }

  getSaveButtonText(): string {
    return this.isEditMode ? 'Update' : 'Save';
  }
}
