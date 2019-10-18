import { Component, OnInit } from '@angular/core';
import { Inject } from '@angular/core';

import { LocalStorageService } from '../services/local-storage.service';
import { LOCAL_STORAGE, StorageService } from 'ngx-webstorage-service';

@Component({
  selector: 'app-login-register',
  templateUrl: './login-register.component.html',
  styleUrls: ['./login-register.component.css']
})
export class LoginRegisterComponent implements OnInit {

  constructor (private localstorageservice: LocalStorageService,
  @Inject(LOCAL_STORAGE) private storage: StorageService) { }

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

  ngDoCheck() {
    if (!this.localstorageservice.isEmpty()) {
     this.localstorageservice.removeFromStorage();
    }
  }
}
