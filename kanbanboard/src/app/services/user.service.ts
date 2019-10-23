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

  progettiUtente = {

  }

  logged: boolean = false;

  setUser(user: any) {
    console.log('UserService', user)
    this.user.id = user.id;
    this.user.nome = user.nome;
    this.user.cognome = user.cognome;
    this.user.avatar = user.avatar;
    this.logged = true;
  }

  getUser(): any {
    return this.user;
  }

  getProgettiUtente(): Observable<any>{
    console.log("id: "+this.user.id);
    return this.http.post(this.base_url + "/api/visualizzaProgettiUtenti/", { 'idUser': this.user.id });
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
