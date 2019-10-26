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
  listaProgetti: any[] = [{ 'id_progetto': "", 'progetto': "", 'descrizione': "" }];

  constructor(private projectService: ProjectService,
    private userService: UserService, private localstorageservice: LocalStorageService,
    @Inject(LOCAL_STORAGE) private storage: StorageService, private router: Router) { }


  key = 'object_list';

  ngOnInit() {
    this.createCard();
  }

  createCard(){
    this.projectService.getProgettiUtente().subscribe(
      success => {
        for (let i = 0; i < success.length; i++) {
          console.log(success[i]);
          this.id_progetto.push(success[i].id_progetto);
          this.progetto.push(success[i].nome_progetto);
          this.descrizione.push(success[i].descrizione_progetto);
        }
        console.log(this.progetto);
        console.log(this.descrizione);
        for (let t = 0; t < this.progetto.length; t++) {
          this.listaProgetti.push({ id_progetto: this.id_progetto[t], progetto: this.progetto[t], descrizione: this.descrizione[t] });
        }
        this.listaProgetti.splice(0, 1);
        console.log(this.listaProgetti);
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
        for (var i = 0; i < success.length; i++){
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

}
