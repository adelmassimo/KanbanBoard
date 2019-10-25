import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root'
})
export class NewProjectService {

  constructor(private http: HttpClient, private userService: UserService) { }


  //3000 è la porta sulla quale resta in ascolto il serve
  base_url = 'http://localhost:3000';

  inserimentoProject(project):Observable<any>{
    return this.http.post(this.base_url + "/api/project/", {
      'nome_progetto': project.nome_progetto,
      'descrizione_progetto': project.descrizione_progetto,
      'id_utente': this.userService.user.id
    });
  }

  

  /*updateProject(project):Observable<any>{
    return this.http.post(this.base_url + "/api/project/:id", {
      'nome_progetto': project.nome_progetto,
      'descrizione_progetto': project.descrizione_progetto
    });
  } */

}
