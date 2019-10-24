import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { LoginService } from './login.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  base_url = 'http://localhost:3000';

  user = {
    'id': '',
    'nome': '',
    'cognome': '',
    'avatar': ''
  }

  logged: boolean = false;

  setUser(user: any) {
    console.log('UserService', user)
    this.user.id = user.id_utente;
    this.user.nome = user.nome_utente;
    this.user.cognome = user.cognome_utente;
    this.user.avatar = user.img_avatar;
    this.logged = true;
  }

  getUser(): any {
    return this.user;
  }

  isLogged(): boolean {
    return this.logged;
  }

  logOutUser() {
    this.user.id = '';
    this.user.nome = '';
    this.user.cognome = '';
    this.user.avatar = '';
    this.logged = false;
  }
}
