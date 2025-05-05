import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpService } from '../services/http-service/http.service';
import { NotificationService } from '../services/notification-service/notification.service';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {
  registerForm:FormGroup;
roleList:any;
genderList =['Female','Male']

  constructor( private fb:FormBuilder, private httpservice:HttpService, private piper:DatePipe, 
    private notification:NotificationService, private readonly router: Router) {
      this.registerForm = this.fb.group({
        name: ['',],
        email: ['',],
        password: ['', ],
        is_admin: [false] // Hidden field, always false
      });
   }

  ngOnInit(): void {
    this.getRolesList()

  }
  getRolesList(){
    this.httpservice.doGet('roles').subscribe((res)=>{
      this.roleList = res?.roles;

    })
  }
  submit() {
    if (this.registerForm.valid) {
      this.httpservice.doPost("users/register", this.registerForm.value)
        .subscribe(res => {
          alert('Registration Successful');
          this.router.navigate(['/login']);
        }, error => {
          alert('Registration Failed');
        });
    } 
  }

}
