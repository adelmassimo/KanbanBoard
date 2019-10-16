import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-login-register',
  templateUrl: './login-register.component.html',
  styleUrls: ['./login-register.component.css']
})
export class LoginRegisterComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }
  isLogin: boolean = true;
  isRegister: boolean = false;
  LoginActive: string = 'active';
  RegisterActive: string = '';

  onChangeTab(tab){
    console.log(tab);
    if(tab === 'login'){
      this.LoginActive = 'avtive';
      this.isLogin = true;
      this.RegisterActive = '';
      this.isRegister = false;
    }else{
      this.LoginActive = '';
      this.isLogin = false;
      this.RegisterActive = 'active';
      this.isRegister = true;
    }    
  }

}
