import { Injectable } from '@angular/core';
import { Utenti_registrati } from '../models/mock.login';

@Injectable({
  providedIn: 'root'
})
export class RegisterService {

  constructor() { }

  registrazione(utente):Boolean{
    //test con mock
    //controllo username
    if(utente.username != "" && utente.username != undefined){
      //controllo password che sia più di 8 caratteri con maisucole, minuscole e numeri
      let patternPassword = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}$/; 
      /*
          /^
            (?=.*\d)          // should contain at least one digit
            (?=.*[a-z])       // should contain at least one lower case
            (?=.*[A-Z])       // should contain at least one upper case
            [a-zA-Z0-9]{8,}   // should contain at least 8 from the mentioned characters
          $/

          con la funzione javascript .test
      */
      if(utente.password != "" && utente.password != undefined && patternPassword.test(String(utente.password))){
        //controllo email
        //pattern per validazione email
        let patternEmail = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        
        if(utente.email != "" && utente.email != undefined && patternEmail.test(String(utente.email))){
          Utenti_registrati.push(utente);

          //ciclo per visualizzare mock in console
          for(let utenteVisualizzato of Utenti_registrati){
            console.log(utenteVisualizzato);
          }
          
          console.log("utente registrato correttamente!");
          return true;
        }
      }
    }
    console.log("errore durante la registrazione");
    return false;
  }
}
