import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor() { }

  user = {
    'id': '',
    'nome': '',
    'cognome': '',
    'avatar': ''
  }
  logged:boolean = false; 

  setUser(user: any){
    console.log('UserService', user)
    this.user.id = user.id;
    this.user.nome = user.nome;
    this.user.cognome = user.cognome;
    this.user.avatar = user.avatar;
    this.logged = true;
  }

  getUser():any{
    return this.user;
  }

  isLogged():boolean{
    return this.logged;
  }

  logOutUser(){
    this.user.id = '';
    this.user.nome = '';
    this.user.cognome = '';
    this.user.avatar = '';
    this.logged = false;
  }
}
  