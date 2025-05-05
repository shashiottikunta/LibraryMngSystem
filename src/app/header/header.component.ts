import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpService } from '../services/http-service/http.service';
import { Router } from '@angular/router';
import { NotificationService } from '../services/notification-service/notification.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  submitted = false;
  userName:any;

  @ViewChild('changePassowrdData') changePasswordModal:any;
  changePasswordForm:FormGroup;

  constructor( private fb:FormBuilder,  private httpservice:HttpService,private readonly router: Router, private notification:NotificationService) {
    this.changePasswordForm = this.fb.group({
      currentPassword:['', Validators.required],
      newPassword:['', Validators.required]
    })
  }

  ngOnInit(): void {
    this.userName = localStorage.getItem('name')
  }

  logout(){
    this.router.navigate(['/login']);
    localStorage.clear();
  }

  showModal(){
    this.changePasswordModal.show();
   }
   hideModal(){
    this.changePasswordModal.hide();
   }

 
   submit(){
    let payload={
      current_password:this.changePasswordForm.get('currentPassword')?.value,
      new_password:this.changePasswordForm.get('newPassword')?.value,
      user_id:localStorage.getItem('userId')
    }
    this.httpservice.doPost('change-password', payload).subscribe((result)=>{
      if(result?.errorMessage){
        this.notification.showErrorNotification('', result.errorMessage)
      }else{
        this.notification.showSucessNotification('', result.message)
        this.hideModal();
        this.changePasswordForm.reset();
        

      }
    })

  }

}
