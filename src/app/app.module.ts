import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { LayoutComponent } from './layout/layout.component';
import {ReactiveFormsModule, FormsModule} from '@angular/forms'
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpInterceptorService } from './core/interceptors/http.interceptor';
import { LoginComponent } from './login/login.component';
import {SignUpComponent} from '../app/sign-up/sign-up.component'
import { ModalModule } from 'ngx-bootstrap/modal';
import {ProfileComponent} from '../app/profile/profile/profile.component';
import { DatePipe } from '@angular/common';
import { AvatarModule } from 'ngx-avatar';
import { NospaceDirective } from './directives/nospace.directive';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    SidebarComponent,
    LayoutComponent,
    LoginComponent,
    SignUpComponent,
    ProfileComponent,
    NospaceDirective,
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule, 
    FormsModule,
    NgbModule,
    HttpClientModule,
    ToastrModule.forRoot({
      timeOut: 2000,
    	preventDuplicates: true,
      maxOpened: 1
    }),    BrowserAnimationsModule,
    ModalModule.forRoot(),



  ],
  providers: [
    DatePipe
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
