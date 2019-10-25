import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PostItService {

  constructor(private http: HttpClient) { }

  //3000 è la porta sulla quale resta in ascolto il serve
  base_url = 'http://localhost:3000';

  inserimentoPostit(postIt):Observable<any>{
    return this.http.post(this.base_url + "/api/post-it/", {
      'nome_postIt': postIt.nome_postIt,
      'descrizione_postIt': postIt.descrizione_postIt,
      'colore_postIt': postIt.colore_postIt,
      'tipologia' : postIt.tipologia,
      'id_progetto': postIt.id_progetto
    });
  } // fine inserimentoPostit(postIt):Observable<any>{
/*
  updatePostit(updatePostIt):Observable<any>{
    return this.http.post(this.base_url + "/api/post-it/update/:id", {
      'nome_postIt': updatePostIt.nome_postIt,
      'descrizione_postIt': updatePostIt.descrizione_postIt,
      'colore_postIt': updatePostIt.colore_postIt,
      'tipologia' : updatePostIt.tipologia
    });
  } // fine updatePostit(updatePostIt):Observable<any>{

*/
}
