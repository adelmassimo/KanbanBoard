import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { ProjectService } from '../services/project.service';
import { UserService } from '../services/user.service';
import { NewProjectService } from '../services/new-project.service';

import { Router } from '@angular/router';

@Component({
  selector: 'app-pu',
  templateUrl: './pu.component.html',
  styleUrls: ['./pu.component.css']
})
export class PUComponent implements OnInit {

  // apertura menu superiore
  isNoProgetto = false;
  isMenuVisibile = false;

  //variabile per la visualizzazione dell'caricamento della pagina
  inCaricamento = false;

  // variabile per visualizzare la barra (rossa se non c'è il progetto, verde se il progetto esiste)
  isVisible = false;
  isSuccess: boolean;

  //variabile per la visualizzazione delle card Globali
  isGlobal = false;
  flag: boolean;

  //variabile per la creazione e visualizzazione delle card
  ricercaProgetto: string = "";
  idCard: any[] = [];
  descrizione: any[] = [];

  //lista progetti Utenti / Globale
  listaProgetti: any[] = [];
  supporto: any[] = [];
  risultato: any[] = [];

  //variabile per fare toggle sul sort button. sortDown = true --> ordinamento dalla A alla Z
  sortDown: boolean = true;

  constructor(private projectService: ProjectService,
    private userService: UserService, private router: Router, private newProjectService: NewProjectService,
    private cdr: ChangeDetectorRef) { }

  ngOnInit() {
    this.createCard();
  }//fine ngOnInit


  ngDoCheck() {
    //se l'utente non è loggato viene reindirizzato alla homepage
    if (this.userService.user.id == "") {
      this.router.navigate(['/']);
    }
  } //fine ngDoCheck


  createCard() {
    this.listaProgetti.splice(0);
    this.inCaricamento = true;
    this.isGlobal = false;

    //nella query viene fatto l'ordinamento dalla a alla z del nome_progetto
    this.projectService.getProgettiUtente().subscribe(
      success => {
        if (success.length != 0) {
          if (this.sortDown) {
            for (let i = 0; i < success.length; i++) {
              this.inCaricamento = false;
              this.listaProgetti.push({
                id_progetto: success[i].id_progetto,
                nome_progetto: success[i].nome_progetto,
                descrizione: success[i].descrizione_progetto
              });
            }
          } else {
            for (let i = success.length - 1; i >= 0; i--) {
              this.inCaricamento = false;
              this.listaProgetti.push({
                id_progetto: success[i].id_progetto,
                nome_progetto: success[i].nome_progetto,
                descrizione: success[i].descrizione_progetto
              });
            }
          }
        } else {
          this.isVisible = true;
          this.isSuccess = false;
        }
      },
      error => {
        console.log("errore connessione database!" + error);
      });
  }//fine createCard


  onClickSearchMenu() {
    if (this.isMenuVisibile == false) {
      this.isMenuVisibile = true;
    } else {
      this.isMenuVisibile = false;
    }
  }//fine onClickSearchMenu


  onClickSearchProject() {
    this.inCaricamento = true;
    if (this.ricercaProgetto == "") {
      // this.listaProgetti.splice(0);
      this.isVisible = false;
      this.createCard();
    }
    else {
      this.isVisible = true;
      this.inCaricamento = true;
      this.projectService.getCercaProgetti(this.ricercaProgetto).subscribe(
        success => {
          console.log(success);
          if (success.length != 0) {
            this.listaProgetti.splice(0);
            this.inCaricamento = false;
            for (var i = 0; i < success.length; i++) {
              this.listaProgetti.push({
                'id_progetto': success[i].id_progetto,
                'nome_progetto': success[i].nome_progetto,
                'descrizione': success[i].descrizione_progetto
              });
              this.isSuccess = true;
            }
          }
          else {
            this.inCaricamento = false;
            this.isSuccess = false;
          }
        },
        error => {
          console.log("errore connessione database!" + error);
        });
    }
  }//fine onClickSearchProject


  //Stampa Card Progetti Globali
  onClickSearchGlobal() {
    this.inCaricamento = true;
    this.projectService.getCercaProgettiGlobali().subscribe(
      success => {
        console.log(success);
        let progetto = success.filter(item => this.listaProgetti.indexOf(item));
        let oggetto = this.listaProgetti.filter(item => success.indexOf(item));
        this.risultato = progetto;

        oggetto.forEach(element => {
          this.risultato.splice(progetto.indexOf(element), 1);
        });

        if (this.risultato.length == 0) {
          this.isGlobal = false;
        } else {
          this.isGlobal = true;
        }
      },
      error => {
        console.log("errore connessione database!" + error);
      });
  }//fine onClickSearchGlobal


  onClickCanc() {
    this.isVisible = false;
  }//fine onCLickCanc


  openProject(id) {
    // carico sullo user service il progetto selezionato dell'utente
    this.projectService.getProgettoById(id).subscribe(
      succ => {
        if (succ != []) {
          var progetto = {
            'id_progetto': succ[0].id_progetto,
            'nome_progetto': succ[0].nome_progetto,
            'descrizione': succ[0].descrizione_progetto
          };
          this.projectService.setProgetto(progetto);
          //il router.navigate lo faccio nel service per evitare problemi con la funzione asincrona
        } else {
          //id progetto non presente nel database
          this.router.navigate(['/']);
        }
      },
      err => {
        console.log("errore connessione database!" + err);
      }
    )
    //this.router.navigate(['/lavagna']);
  }//fine OpenProject


  toggleSort() {
    this.inCaricamento = true;
    //funzione per creare toggle dell'ordinamento alfabetico
    if (this.sortDown) {
      //ordinamento dalla z alla a
      this.sortDown = false;
    } else {
      //ordinamento dalla a alla z
      this.sortDown = true;
    }
    this.createCard();
  }//fine toogleSort

  delete(progetto) {
    this.newProjectService.deleteProject(progetto).subscribe(
      success => {
        this.createCard();
      }
    )
  }//fine Delete


  add(progetto) {
    this.newProjectService.addProject(progetto).subscribe(
      success => {
        this.createCard();
      }
    )
  }//fine Add


}
