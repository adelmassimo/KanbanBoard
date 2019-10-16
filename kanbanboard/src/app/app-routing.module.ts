import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PUComponent } from './pu/pu.component';
import { LoginComponent } from './login/login.component';
import { LoginRegisterComponent } from './login-register/login-register.component';
import { RegisterComponent } from './register/register.component';

const routes: Routes = [
  { path: '', component: LoginRegisterComponent },
  { path: 'pu', component: PUComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent } 
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
