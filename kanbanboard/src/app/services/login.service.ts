import { Injectable } from '@angular/core';
//import { Utenti_registrati } from '../models/mock.login';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { UserService } from '../services/user.service'
import { LocalStorageService  } from '../services/local-storage.service';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(
    private http: HttpClient,
    private localstorageservice: LocalStorageService,
    private userservice: UserService) { }

  //3000 è la porta sulla quale resta in ascolto il serve
  base_url = 'http://localhost:3000';

  isUtenteLoggedin = false;
  nome: string = "";
  cognome: string = "";

  //login con database
  login(utente):Observable<any>{
      return this.http.post(this.base_url + "/api/login/", {
        'username': utente.username,
        'password': utente.password
      });
  }

  getUtente(utente):Observable<any> {
    return this.http.post(this.base_url + "/api/login/getUtente/", {'username': utente});
  }

  //login con mock
  caricaLocalStorage(utente){
    this.getUtente(utente).subscribe(
      ok=>{
        if(ok.success==1){
        console.log('Utente trovato ' + ok.utente.id_utente + ok.utente.nome_utente + ok.utente.cognome_utente + ok.utente.img_avatar);
        const user = {
          'id':ok.utente.id_utente,
          'nome_utente': ok.utente.nome_utente,
          'cognome_utente': ok.utente.cognome_utente,
          'avatar': ok.utente.img_avatar
        } 
        this.localstorageservice.storeOnLocalStorage(user);
        }
        else{
          console.log('Utente non trovato');
        }
      },
      error=>{
        console.log('Collegamento Fallito' + error);
      }
    );
  }
}















/*

    //test con mock
    for (let utenteregistrato of Utenti_registrati){
      //console.log(utenteregistrato.username);
      if(utenteregistrato.username == utente.username && utenteregistrato.password == utente.password){
        console.log("utente trovato " + utenteregistrato.username);
        this.nome = utenteregistrato.nome;
        this.cognome = utenteregistrato.cognome;
        this.isUtenteLoggedin = true;

        console.log(utenteregistrato);
        

        return true;  
      }
    }
    console.log("utente non trovato");
    return false;
*/


