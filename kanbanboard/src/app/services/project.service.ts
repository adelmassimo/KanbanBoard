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
    private userService: UserService) { }

  base_url = 'http://localhost:3000';

  progetto={
    'id':'',
    'nomeProgetto':'',
    'descrizione':''
  };

  setProgetto(progetto:any){
    console.log('Progetto',progetto);
    this.progetto.id=progetto.id_progetto;
    this.progetto.nomeProgetto = progetto.nome_progetto;
    this.progetto.descrizione = progetto.descrizione;
  }

  getProgettiUtente(): Observable<any> {
    return this.http.post(this.base_url + "/api/visualizzaProgettiUtenti/", { 'id': this.userService.user.id });
  }
  
  getCercaProgetti(ricerca): Observable<any> {
    console.log('nomeProgetto');
    console.log(ricerca);
    console.log('id Utente');
    console.log(this.userService.user.id);
    return this.http.post(this.base_url + "/api/cercaProgetti/", { 'nome_progetto': ricerca, 'id': this.userService.user.id });
  }

  getProgettoById(id): Observable<any>{
    return this.http.post(this.base_url + "/api/visualizzaProgettoById/", {'id': id});
  }

  getPostItProgetto():Observable<any>{
    return this.http.post(this.base_url + "/api/visualizzaPostItProgetto/", {'idProgetto': this.progetto.id});
  }
}