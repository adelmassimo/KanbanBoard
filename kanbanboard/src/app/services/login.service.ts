import { Injectable } from '@angular/core';
import { Utenti_registrati } from '../models/mock.login';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { LocalStorageService  } from '../services/local-storage.service';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private http: HttpClient,private localstorageservice: LocalStorageService) { }

  base_url = 'localhost:3000';

  isMocked = true;

  isUtenteLoggedin = false;
  nome: string = "";
  cognome: string = "";

  getUtente(utente):Observable<any>{
      return this.http.get(this.base_url + "/api/login/" + utente.username + "/" + utente.password);
  }

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
