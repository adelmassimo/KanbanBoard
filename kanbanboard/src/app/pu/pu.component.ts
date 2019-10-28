import { Component, OnInit } from '@angular/core';
import { ProjectService } from '../services/project.service';
import { UserService } from '../services/user.service';
import { LocalStorageService } from '../services/local-storage.service';
import { LOCAL_STORAGE, StorageService } from 'ngx-webstorage-service';
import { Inject } from '@angular/core';
import { Router } from '@angular/router';
//import { ProjectComponent } from '../project/project.component';

@Component({
  selector: 'app-pu',
  templateUrl: './pu.component.html',
  styleUrls: ['./pu.component.css']
})
export class PUComponent implements OnInit {

  // apertura menu superiore
  isMenuVisibile = false;
  isNoProgetto = false;

  // prova per la ricerca progetti dell'utente
  nameProject = 'prova';

  // variabile per visualizzare la barra (rossa se non c'è il progetto, verde se il progetto esiste)
  isVisible = false;
  isSuccess: boolean;

  //variabile per la creazione e visualizzazione delle card
  id_progetto: any[] = [];
  progetto: any[] = [];
  descrizione: any[] = [];
  listaProgetti: any[] = [];

  //variabile per fare toggle sul sort button
  sortDown: boolean = true;

  constructor(private projectService: ProjectService,
    private userService: UserService, private localstorageservice: LocalStorageService,
    @Inject(LOCAL_STORAGE) private storage: StorageService, private router: Router) { }


  key = 'object_list';

  ngOnInit() {
    this.createCard('asc');
  }

  createCard(ordinamento:string){
    this.listaProgetti.splice(0);

    //nella query viene fatto l'ordinamento dalla a alla z del nome_progettos
    this.projectService.getProgettiUtente().subscribe(
      success => {
        if(ordinamento == 'asc'){
          for (let i = 0; i < success.length; i++) {
            this.listaProgetti.push({ 
              id_progetto: success[i].id_progetto, 
              nome_progetto: success[i].nome_progetto, 
              descrizione: success[i].descrizione_progetto 
            });
          }
        }else{
          for (let i = success.length-1; i >= 0; i--) {
            this.listaProgetti.push({ 
              id_progetto: success[i].id_progetto, 
              nome_progetto: success[i].nome_progetto, 
              descrizione: success[i].descrizione_progetto 
            });
          }
        }
      },
      error => {
        console.log('errore');
      }
    );
  }

  onClickSearchMenu() {
    if (this.isMenuVisibile == false) {
      this.isMenuVisibile = true;
    } else {
      this.isMenuVisibile = false;
    }
  }

  onClickSearchProject(nome_progetto: string) {
    this.nameProject=nome_progetto;
    this.isVisible = true;
    this.isSuccess = false;

    console.log(this.nameProject);
    this.projectService.getProgettiUtente().subscribe(
      success=>{
        console.log('ricerca')
        console.log(this.listaProgetti);
        for (let i = 0; i < success.length; i++){
          if (this.nameProject == this.listaProgetti[i].progetto) {
            console.log("Progetto Trovato!");
            this.isSuccess = true;
          }
        }
      },
      error=>{
          console.log("Progetto non Trovato");
          this.isSuccess = false;
      }
    );
  }

  onClickCanc() {
    this.isVisible = false;
  }

  onClickNewProject() {
    //this.projectComponent.onProjectSubmit();
  }

  openProject(id) {
    // carico sul local storage il progetto dell'utente
    // ...
    
    this.router.navigate(['/lavagna']);
  }

  toggleSort(){
    //funzione per creare toggle dell'ordinamento alfabetico
    if(this.sortDown){
      this.sortDown = false;
      this.createCard('desc');
    }else{
      this.sortDown = true;
      //ordinamento dalla a alla z
      this.createCard('asc');
    }
  }
}
