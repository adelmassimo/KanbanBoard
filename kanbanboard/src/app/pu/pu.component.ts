import { Component, OnInit } from '@angular/core';
import { ProjectService } from '../services/project.service';
import { PuService } from '../services/pu.service';

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
              private puService: PuService) { }


  ngOnInit() {
    //this.lista_progetti = this.puService.getProgettiUtente();
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
