import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { LoginRegisterComponent } from './login-register/login-register.component';
import { RegisterComponent } from './register/register.component';
import { HeaderPaginaComponent } from './header-pagina/header-pagina.component';

import { LoginService } from './services/login.service';
import { RegisterService } from './services/register.service';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    LoginRegisterComponent,
    RegisterComponent,
    HeaderPaginaComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
