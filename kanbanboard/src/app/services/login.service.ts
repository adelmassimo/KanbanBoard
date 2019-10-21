import { Injectable } from '@angular/core';
import { Utenti_registrati } from '../models/mock.login';
import { HttpClient } from '@angular/common/http';

import { LocalStorageService  } from '../services/local-storage.service';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private http: HttpClient,private localstorageservice: LocalStorageService) { }

  base_url = 'localhost:1337';
  wsUtenti: string = '/users';

  isMocked = true;

  isUtenteLoggedin = false;
  nome: string = "";
  cognome: string = "";

  /*getUtente():Observable<any>{
      this.http.get( this.base_url+this.wsUtenti );
      return this.http.post(this.base_url + this.wsUtenti);
  }*/

  autenticazione(utente):Boolean{
    if(!this.isMocked){

      //collegamento al database con backend
      console.log(utente);
      //this.getUtente(utente);

    }else{

      //test con mock
      for (let utenteregistrato of Utenti_registrati){
        //console.log(utenteregistrato.username);
        if(utenteregistrato.username == utente.username && utenteregistrato.password == utente.password){
          console.log("utente trovato " + utenteregistrato.username);
          this.nome = utenteregistrato.nome;
          this.cognome = utenteregistrato.cognome;
          this.isUtenteLoggedin = true;

          console.log(utenteregistrato);
          this.localstorageservice.storeOnLocalStorage(utenteregistrato);

          return true;  
        }
      }
    }
    console.log("utente non trovato");
    return false;
  }
}
