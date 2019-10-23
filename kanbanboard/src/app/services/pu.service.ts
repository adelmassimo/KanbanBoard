import { Injectable, Inject } from '@angular/core';
//import { ProgettiUtente } from '../models/mock.pu';
import { HttpClient } from '@angular/common/http';
import { LOCAL_STORAGE, StorageService } from 'ngx-webstorage-service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PuService {

  constructor(private http: HttpClient,
              @Inject(LOCAL_STORAGE) private storage: StorageService ) { }

//objlist: any[];
//idutente: string;
base_url = 'http://localhost:3000';

/*
getProgettiUtente(): string[]{
  // recupero lo username che è loggato 
  this.objlist = this.storage.get('object_list'); 
  this.username = this.objlist[0].username;
  //filtro i progetti a seconda dello username
  return ProgettiUtente.filter( item => item.username === this.username)[0].lista_progetti;   
}
*/

getNomeProgetto(utente):Observable <any>{
  return this.http.post(this.base_url +"/api/progetti/visualizzaProgettiUtenti",{'idUser': utente});
}

}
