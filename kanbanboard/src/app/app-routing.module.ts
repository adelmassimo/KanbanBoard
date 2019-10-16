import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import{LoginComponent} from './login/login.component';
import { LoginRegisterComponent } from './login-register/login-register.component';

const routes: Routes = [
  {path: '', component: LoginRegisterComponent},
  {path: 'login', component: LoginComponent}, 
  
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
