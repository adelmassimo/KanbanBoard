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
    if(patternPassword.test(String(utente.password))){
      //controllo email
      //pattern per validazione email
      let patternEmail = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      
      if(patternEmail.test(String(utente.email))){
        
        //DATABASE
        return this.http.post(this.base_url + "/api/register/", {
        'username': utente.username,
        'nome': utente.nome,
        'cognome': utente.cognome,
        'email': utente.email,
        'password': utente.password,
        'avatar': utente.avatar
      });


       /* MOCK 
        Utenti_registrati.push(utente);

        //ciclo per visualizzare mock in console
        for(let utenteVisualizzato of Utenti_registrati){
          console.log(utenteVisualizzato);
        }

        console.log("utente registrato correttamente!");
        return true;*/
      }
    } 
    /*console.log("errore durante la registrazione");
    return false;*/
    return undefined;
  }
}
