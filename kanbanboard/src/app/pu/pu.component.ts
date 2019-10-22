import { Component, OnInit } from '@angular/core';
import { ProjectService } from '../services/project.service';
import { PuService } from '../services/pu.service';
import { LocalStorageService } from '../services/local-storage.service';
import { LOCAL_STORAGE, StorageService } from 'ngx-webstorage-service';

@Component({
  selector: 'app-pu',
  templateUrl: './pu.component.html',
  styleUrls: ['./pu.component.css']
})
export class PUComponent implements OnInit {

  constructor(private projectService: ProjectService,
    private puService: PuService,
    private localstorageservice: LocalStorageService) { }

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

  objlist: any[];
  idUser: string;//= this.objlist[0].id_utente;
  idProgetto: string;// = this.objlist[0].id_progeto;
  

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

  ngDoCheck() {
    //Called every time that the input properties of a component or a directive are checked. Use it to extend change detection by performing a custom check.
    //Add 'implements DoCheck' to the class.
    this.puService.getNomeProgetto(this.idUser).subscribe(
      success=>{
        console.log(success);
        //this.lista_progetti
      },
      error=>{
        console.log(error);
      }
    );

  }

}
