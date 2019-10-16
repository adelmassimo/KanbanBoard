import { Injectable } from '@angular/core';
import { Utenti_registrati } from '../models/mock.login';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private http: HttpClient) { }

  base_url = 'localhost:1337';
  wsUtenti: string = '/users';

  isMocked = true;

  getUtentiRegistrati():Observable<any>{
      return this.http.get( this.base_url+this.wsUtenti );
  }

  autenticazione(utente):Boolean{
    //collegamento al database con backend
    console.log(utente);
    
    
    //test con mock
    for (let utenteregistrato of Utenti_registrati){
      //console.log(utenteregistrato.username);
      if(utenteregistrato.username == utente.username && utenteregistrato.password == utente.password){
        console.log("utente trovato " + utenteregistrato.username);
        return true;  
      }
    }
    console.log("utente non trovato");
    return false;
  }
}
