import { Injectable, Inject } from '@angular/core';
import { ProgettiUtente } from '../models/mock.pu';
import { HttpClient } from '@angular/common/http';
import { LOCAL_STORAGE, StorageService } from 'ngx-webstorage-service';

@Injectable({
  providedIn: 'root'
})
export class PuService {

  constructor(private http: HttpClient,
              @Inject(LOCAL_STORAGE) private storage: StorageService ) { }

objlist: any[];
username: string;

getProgettiUtente(): string[]{
  // recupero lo username che è loggato 
  this.objlist = this.storage.get('object_list'); 
  this.username = this.objlist[0].username;
  //filtro i progetti a seconda dello username
  return ProgettiUtente.filter( item => item.username === this.username)[0].lista_progetti;
    
}

}
