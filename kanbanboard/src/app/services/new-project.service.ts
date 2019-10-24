import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NewProjectService {

  constructor(private http: HttpClient) { }

  //3000 è la porta sulla quale resta in ascolto il serve
  base_url = 'http://localhost:3000';

  inserimentoProject(project):Observable<any>{
    return this.http.post(this.base_url + "/api/project/", {
      'nome_progetto': project.nome_progetto,
      'descrizione_progetto': project.descrizione_progetto
    });
  }

  updateProject(project):Observable<any>{
    return this.http.post(this.base_url + "/api/project/:id", {
      'nome_progetto': project.nome_progetto,
      'descrizione_progetto': project.descrizione_progetto
    });
  }

}
