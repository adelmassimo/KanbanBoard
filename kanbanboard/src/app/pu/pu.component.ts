import { Component, OnInit } from '@angular/core';
import { ProgettiDisponibili } from '../models/mock.project';
import { ProjectService } from '../services/project.service';

@Component({
  selector: 'app-pu',
  templateUrl: './pu.component.html',
  styleUrls: ['./pu.component.css']
})
export class PUComponent implements OnInit {

  constructor(private projectService: ProjectService) { }

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

  onClickSearchMenu() {
    if (this.isMenuVisibile == false) {
      this.isMenuVisibile = true;
    }
    else {
      this.isMenuVisibile = false;
    }
  }

  onClickCercaProgettoUtente(){

  }

  onClickSearchProject() {
    
    this.isVisible=true;
    this.isSuccess=false;
    
    if (this.projectService.getProgetti(this.nome_progetto)){
      console.log("Progetto Trovato!");
      this.isSuccess=true;
    }
    else{
      console.log("Progetto non Trovato");
      this.isSuccess=false;
    }
  }

  onClickCanc(){
    this.isVisible=false;
  }

  onClickNewProject(){

  }

  ngOnInit() {
  }

}
