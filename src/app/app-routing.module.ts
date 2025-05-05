import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutComponent } from './layout/layout.component';
import { LoginComponent } from './login/login.component';
import {SignUpComponent} from '../app/sign-up/sign-up.component'
import {ProfileComponent} from '../app/profile/profile/profile.component'

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  {path:'login',component:LoginComponent},
  {path:'signUp',component:SignUpComponent},



  {
    path: '',
    component: LayoutComponent,
    children: [
      {path:'profile',component:ProfileComponent},


      {
        path: '',
        loadChildren: () => import('../app/theme/admin/admin.module').then(m => m.AdminModule)
         
      },
      {
        path: '',
        loadChildren: () => import('../app/theme/users/users.module').then(m => m.UsersModule)
         
      }
    
    ],

  




  },
  
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
