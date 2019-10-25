import { Component, OnInit } from '@angular/core';
import { ProjectService } from '../services/project.service';
import { UserService } from '../services/user.service';
import { LocalStorageService } from '../services/local-storage.service';
import { LOCAL_STORAGE, StorageService } from 'ngx-webstorage-service';
import { Inject } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-pu',
  templateUrl: './pu.component.html',
  styleUrls: ['./pu.component.css']
})
export class PUComponent implements OnInit {

  // apertura menu superiore
  isMenuVisibile = false;
  isNoProgetto = false;

  // variabile per visualizzare la barra (rossa se non c'è il progetto, verde se il progetto esiste)
  isVisible = false;
  isSuccess: boolean;

  //variabile per la creazione e visualizzazione delle card
  ricercaProgetto: string;
  idCard: any[] = [];
  progetto: any[] = [];
  descrizione: any[] = [];
  listaProgetti: any[] = [{ 'idCard': "", 'progetto': "", 'descrizione': "" }];
  idProgettoTrovato: any;

  constructor(private projectService: ProjectService,
    private userService: UserService, private localstorageservice: LocalStorageService,
    @Inject(LOCAL_STORAGE) private storage: StorageService, private router: Router) { }


  key = 'object_list';

  ngOnInit() {
    this.createCard();
  }

  createCard() {
    this.projectService.getProgettiUtente().subscribe(
      success => {
        /*
        for (let i = 0; i < success.length; i++) {
          this.idCard.push(success[i].id_progetto);
          this.progetto.push(success[i].nome_progetto);
          this.descrizione.push(success[i].descrizione_progetto);
          this.listaProgetti.push({ idCard: this.idCard[i], progetto: this.progetto[i], descrizione: this.descrizione[i] });
        }
        this.listaProgetti.splice(0, 1);
          console.log(this.listaProgetti);
      },*/
      for (let i = 0; i < success.length; i++) {
          this.idCard.push(success[i].id_progetto);
          this.progetto.push(success[i].nome_progetto);
          this.descrizione.push(success[i].descrizione_progetto);
          this.listaProgetti.push({ idCard: this.idCard[i], progetto: this.progetto[i], descrizione: this.descrizione[i] });
        }
        this.listaProgetti.splice(0, 1);
          console.log(this.listaProgetti);
      },
      error => {
        console.log("ERRORE");
      });

  }

  onClickSearchMenu() {
    if (this.isMenuVisibile == false) {
      this.isMenuVisibile = true;
    } else {
      this.isMenuVisibile = false;
    }
  }

  onClickSearchProject(nome_progetto: string) {
    this.ricercaProgetto = nome_progetto;
    this.isVisible = true;
    this.isSuccess = false;

    this.projectService.getProgettiUtente().subscribe(
      success => {
        /*
        for (var i = 0; i < success.length; i++) {
          if (this.ricercaProgetto == this.listaProgetti[i].progetto) {
            this.idProgettoTrovato = this.listaProgetti[i].idCard;
            this.progetto.push(success[i].nome_progetto);
            this.isSuccess = true;
          }
        }7
        */
        if (this.isSuccess = true) {
          console.log('trovato');
          this.projectService.getCercaProgetti(this.ricercaProgetto).subscribe(
            success=>{
              

            },
            error=>{

            }
          )
          console.log(this.listaProgetti);
          console.log(this.idProgettoTrovato);
        }
      },
      error => {
        this.isSuccess = false;
      }
    );

  }

  onClickCanc() {
    this.isVisible = false;
  }

  openProject() {
    // carico sul local storage il progetto dell'utente
    // ...

    this.router.navigate(['/lavagna']);
  }

}
