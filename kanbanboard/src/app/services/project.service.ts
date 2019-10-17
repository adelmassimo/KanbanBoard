import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ProgettiDisponibili } from '../models/mock.project';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {

  constructor(private http: HttpClient) { }
/*
  base_url = 'localhost:1337';
  wsProgetto: string = "";

  getProgettiEsistenti(progettoselezionato): Observable<any> {
    return this.http.get(this.base_url + this.wsProgetto);
  }
*/
  getProgetti(ricerca):boolean {
    for (let progetto of ProgettiDisponibili) {
      if (progetto.nome_progetto == ricerca) {
        return true;
      }
    }
    return false;
  }
}