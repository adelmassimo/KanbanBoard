import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ProgettiDisponibili } from '../models/mock.project';
import { UserService } from './user.service';
import { Observable } from 'rxjs';
import { LoginService } from './login.service';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {

  constructor(private http: HttpClient,
              private userService: UserService,
              private login: LoginService) { }

  base_url = 'http://localhost:3000';

  progetto = {
    'id': '',
    "nomeProgetto": '',
    "descrizione": ''
  }

  setProgetto(progetto) {
    this.progetto.id = progetto.id_progetto;
    this.progetto.nomeProgetto = progetto.nome_progetto;
    this.progetto.descrizione = progetto.descrizione;
  }

  getProgetti(ricerca): boolean {
    for (let progetto of ProgettiDisponibili) {
      if (progetto.nome_progetto == ricerca) {
        return true;
      }
    }
    return false;
  }
 

  getProgettiUtente(): Observable<any> {
    var id = this.userService.user.id;

    return this.http.post(this.base_url + "/api/visualizzaProgettiUtenti/", { 'id': id });

  }

  getProgettoById(id): Observable<any>{
    return this.http.post(this.base_url + "/api/visualizzaProgettoById/", {'id': id});
  }

  getPostItProgetto():Observable<any>{
    return this.http.post(this.base_url + "/api/visualizzaPostItProgetto/", {'idProgetto': this.progetto.id})
  }
}