import { Inject, SimpleChanges } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { LoginService } from '../services/login.service';
import { LocalStorageService } from '../services/local-storage.service';
import { LOCAL_STORAGE, StorageService } from 'ngx-webstorage-service';

@Component({
  selector: 'app-header-pagina',
  templateUrl: './header-pagina.component.html',
  styleUrls: ['./header-pagina.component.css']
})
export class HeaderPaginaComponent implements OnInit {

  constructor(
    private loginService: LoginService,
    private localstorageservice: LocalStorageService,
    @Inject(LOCAL_STORAGE) private storage: StorageService) { }

  /*isUtenteLoggedin: boolean = !this.localstorageservice.isEmpty();

  objlist: any[] = this.storage.get('object_list');

  nome: string = this.objlist[0].nome;
  cognome: string = this.objlist[0].cognome;*/

  isUtenteLoggedin: boolean = false;

  objlist: any[];

  nome: string;
  cognome: string;

  ngOnInit() {
    console.log(this.isUtenteLoggedin);
  }

  ngDoCheck() {
    console.log("ngDoCheck");
    if (!this.localstorageservice.isEmpty()) {
      this.isUtenteLoggedin = !this.localstorageservice.isEmpty();
      this.objlist = this.storage.get('object_list');
      this.nome = this.objlist[0].nome;
      this.cognome = this.objlist[0].cognome;
    }else {
      this.nome = "Kanbanboard";
      this.isUtenteLoggedin = false;
    }
  }

  onClickExit() {
    this.nome = "";
    this.cognome = "";
    this.localstorageservice.removeFromStorage();
  }

}
