import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UserService } from './user.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {

  constructor(private http: HttpClient,
    private userService: UserService) { }

  base_url = 'http://localhost:3000';

  progetto = {
    'id': '',
    'nomeProgetto': '',
    'descrizione': ''
  };

  arrayColonne = [];

  setProgetto(progetto: any) {
    this.progetto.id = progetto.id_progetto;
    this.progetto.nomeProgetto = progetto.nome_progetto;
    this.progetto.descrizione = progetto.descrizione;

    this.getColonneProgetto().subscribe(
      succ => {
        this.arrayColonne.splice(0);
        for (let i = 0; i < succ.length; i++) {
          this.arrayColonne.push(succ[i]);
        }
      },
      err => {
        console.log("errore collegamento database!");
      }
    )
  }

  getColonneProgetto(): Observable<any> {
    return this.http.post(this.base_url + "/api/getColonneProgetto/", { 'idProgetto': this.progetto.id })
  }

  getProgettiUtente(): Observable<any> {
    return this.http.post(this.base_url + "/api/visualizzaProgettiUtenti/", { 'id': this.userService.user.id });
  }

  getCercaProgetti(ricerca): Observable<any> {
    return this.http.post(this.base_url + "/api/cercaProgettiUtente/", { 'nome_progetto': ricerca, 'id': this.userService.user.id });
  }

  getCercaProgettiGlobali(): Observable<any> {
    return this.http.post(this.base_url + "/api/cercaProgettiGlobali/", { 'id': this.userService.user.id });
  }

/*
  getcercaProgettiNoUtente(): Observable<any> {
    return this.http.post(this.base_url + "/api/cercaProgettiNoUtente/", { 'id': this.userService.user.id });
  }
  */

  getProgettoById(id): Observable<any> {
    return this.http.post(this.base_url + "/api/visualizzaProgettoById/", { 'id': id });
  }

  getPostItProgetto(): Observable<any> {
    return this.http.post(this.base_url + "/api/visualizzaPostItProgetto/", { 'idProgetto': this.progetto.id });
  }
}