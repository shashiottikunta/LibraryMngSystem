import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { HttpService } from '../services/http-service/http.service';
import { Router } from '@angular/router';
import { NotificationService } from '../services/notification-service/notification.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm: any;
  constructor( private fb:FormBuilder, private httpservice:HttpService,private readonly router: Router, private notification:NotificationService) { 
    this.loginForm = this.fb.group({
      email:[''],
      password:['']
    })
  }

  ngOnInit(): void {
  }

  submit(){
    let payload ={
      'email': this.loginForm.get('email')?.value,
      'password':  this.loginForm.get('password')?.value,
    }
    this.httpservice.doPost('login', payload).subscribe((res:any) => {
      if(res.errorMessage){
        this.notification.showErrorNotification('',res.errorMessage)
      }else{
       
        if(res.is_admin){
          console.log(res.is_admin)
          this.router.navigate(['/admin-dashbaord']);
        }else{
          this.router.navigate(['/user-books']);
        }
        localStorage.setItem('name', res.name);
        localStorage.setItem('userId', res.id);
        localStorage.setItem('email', res.email);
        localStorage.setItem('isAdmin', res.is_admin);

       
        this.notification.showSucessNotification('','Login Success')

     
        
      }
    })
  }

}
