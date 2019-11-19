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

  inserimentoPostit(postIt): Observable<any> {
    return this.http.post(this.base_url + "/api/post-it/", {
      'nome_postIt': postIt.nome_postIt,
      'descrizione_postIt': postIt.descrizione_postIt,
      'colore_postIt': postIt.colore_postIt,
      'tipologia' : postIt.tipologia,
      'difficolta' : postIt.difficolta,
      'id_progetto': postIt.id_progetto
    });
  } // fine inserimentoPostit(postIt):Observable<any>

  /**start Elimina postit */
  eliminaPostit(postIt): Observable<any> {
    return this.http.post(this.base_url + "/api/deletePostIt/", {
      'id_postIt': postIt.id_postIt,
    });
  }
  /**end Elimina postit */

  /**start Update postit */
  updatePostit(updatePostIt, id_autore): Observable<any> {
    return this.http.post(this.base_url + "/api/updatePostIt/", {
      'id_postIt': updatePostIt.id_postIt,
      'nome_postIt': updatePostIt.nome_postIt,
      'descrizione_postIt': updatePostIt.descrizione_postIt,
      'colore_postIt': updatePostIt.colore_postIt,
      'tipologia': updatePostIt.tipologia,
      'id_autore': id_autore
    });
  }
  /**end Update postit */

  /**start GetModifichePostIt postit */
  getModifichePostIt(id_postIt): Observable<any> {
    //console.log("postiti",id_postIt);
    return this.http.post(this.base_url + "/api/visualizzaModifichePostIt/", {
      'id_postIt' : id_postIt
    });
  }
  /**end GetModifichePostIt postit */

  inserimentoEpica(epica, arrayPostIt):Observable<any>{
    return this.http.post(this.base_url + "/api/inserisciEpica", {
      'epica': epica,
      'arrayPostIt': arrayPostIt
    });
  }

  /*
    inserimentoProgettiPerPostIt(progettiPerPostIt):Observable<any>{
      return this.http.post(this.base_url + "/api/post-it/progettiXPostIt", {
        'nome_postIt': progettiPerPostIt.nome_postIt,
        'descrizione_postIt': progettiPerPostIt.descrizione_postIt,
        'id_progetto': progettiPerPostIt.id_progetto
      });
    } // fine inserimentoPostit(postIt):Observable<any>{
  */
}
