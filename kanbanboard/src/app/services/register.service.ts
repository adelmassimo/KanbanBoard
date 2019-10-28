import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RegisterService {

  constructor(private http: HttpClient) { }

  //3000 è la porta sulla quale resta in ascolto il serve
  base_url = 'http://localhost:3000';

  registrazione(utente):Observable<any>{
    return this.http.post(this.base_url + "/api/registrazione/", {
      'username': utente.username,
      'nome': utente.nome,
      'cognome': utente.cognome,
      'email': utente.email,
      'password': utente.password,
      'avatar': utente.avatar
    });
  }
}
