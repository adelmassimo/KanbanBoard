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
    return this.http.post(this.base_url + "/api/insertProject/", {
      'nome_progetto': project.nome_progetto,
      'descrizione_progetto': project.descrizione_progetto,
      'id_utente': this.userService.user.id
    });
  }


  updateProject(updateProject):Observable<any>{
    return this.http.post(this.base_url + "/api/updateProject/", {
      'nome_progetto': updateProject.nome_progetto,
      'descrizione_progetto': updateProject.descrizione_progetto,
      'id_progetto': updateProject.id_progetto
    });
  }


  deleteProject(project): Observable<any> {
    return this.http.post(this.base_url + "/api/deleteProject", {
      'id_progetto': project.id_progetto
    });
  }


  addProject(project): Observable<any>{
    console.log(this.userService.user.id);
    console.log(project.id_progetto);
    return this.http.post(this.base_url + "/api/addProject", {
      'id_progetto': project.id_progetto,
      'id': this.userService.user.id
    });
  }

  columnProject(col, id_progetto):Observable<any>{
    return this.http.post(this.base_url + "/api/insertColumnProject", {
      'arrayColonne': col,
      'id_progetto': id_progetto
    })
  }

}
