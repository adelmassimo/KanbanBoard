import { Component, OnInit } from '@angular/core';
import { ProjectService } from '../services/project.service';
import { PuService } from '../services/pu.service';
import { Inject } from '@angular/core';
import { Router } from '@angular/router';

import { LocalStorageService } from '../services/local-storage.service';
import { LOCAL_STORAGE, StorageService } from 'ngx-webstorage-service';
@Component({
  selector: 'app-pu',
  templateUrl: './pu.component.html',
  styleUrls: ['./pu.component.css']
})
export class PUComponent implements OnInit {

  //apertura menu superiore
  isMenuVisibile: boolean = false;
  isNoProgetto: boolean = false;

  //prova per la ricerca progetti dell'utente
  nameProject: string = "prova";

  //variabile per la ricerca del progetto all'intenro del DB
  nome_progetto: string = "";

  //variabile per visualizzare la barra (rossa se non c'è il progetto, verde se il progetto esiste)
  isVisible: boolean = false;
  isSuccess: boolean;

  // Listaprogetti
  lista_progetti: any[];

  constructor(private projectService: ProjectService,
              private puService: PuService, private localstorageservice: LocalStorageService,
              @Inject(LOCAL_STORAGE) private storage: StorageService, private router: Router) { }


  key: string = "object_list";
  ngOnInit() {
    //this.lista_progetti = this.puService.getProgettiUtente();
  }

  ngDoCheck(){

    //questo if controlla se l'utente è loggato altrimenti si viene reindrizzati alla homepage
    if(this.localstorageservice.isEmpty()){
      //se non è loggato nessuno si viene reindirizzati alla homepage
      this.router.navigate(['']);
    }
  }


  onClickSearchMenu() {
    if (this.isMenuVisibile == false) {
      this.isMenuVisibile = true;
    }
    else {
      this.isMenuVisibile = false;
    }
  }

  onClickSearchProject() {

    this.isVisible = true;
    this.isSuccess = false;
/*
    if (this.projectService.getProgetti(this.nome_progetto)) {
      console.log("Progetto Trovato!");
      this.isSuccess = true;
    }
    else {
      console.log("Progetto non Trovato");
      this.isSuccess = false;
    }*/
  }

  onClickCanc() {
    this.isVisible = false;
  }

  onClickNewProject() {
  }

}
