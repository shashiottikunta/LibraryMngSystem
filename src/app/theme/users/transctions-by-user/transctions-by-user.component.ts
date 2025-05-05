import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { HttpService } from 'src/app/services/http-service/http.service';
import { NotificationService } from 'src/app/services/notification-service/notification.service';

@Component({
  selector: 'app-transctions-by-user',
  templateUrl: './transctions-by-user.component.html',
  styleUrls: ['./transctions-by-user.component.scss']
})
export class TransctionsByUserComponent implements OnInit {
  transactionsList:any;
  constructor(private httpService: HttpService, private fb: FormBuilder, private notificationService: NotificationService) {
    this.httpService.doGet(`transactions/user/${localStorage.getItem('userId')}` ).subscribe((res) => {
      this.transactionsList = res.transactions;
    });
  }
  ngOnInit(): void {
  }

}
