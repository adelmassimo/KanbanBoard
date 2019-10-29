import { Component, OnInit } from '@angular/core';
import { ProjectService } from '../services/project.service';
import { UserService } from '../services/user.service';
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
  ricercaProgetto: string = "";
  idCard: any[] = [];
  descrizione: any[] = [];
  listaProgetti: any[] = [];

  //variabile per fare toggle sul sort button. sortDown = true --> ordinamento dalla A alla Z
  sortDown: boolean = true;
  // listaProgetti: any[] = [{ 'idCard': "", 'progetto': "", 'descrizione': "" }];
  idProgettoTrovato: any;

  constructor(private projectService: ProjectService,
    private userService: UserService, private router: Router) { }

  ngOnInit() {
    this.createCard();
  }

  ngDoCheck(){
    //se l'utente non è loggato viene reindirizzato alla homepage
    if(this.userService.user.id == ""){
      this.router.navigate(['/']);
    }
  }

  createCard(){
    this.listaProgetti.splice(0);

    //nella query viene fatto l'ordinamento dalla a alla z del nome_progetto
    this.projectService.getProgettiUtente().subscribe(
      success => {
        if(this.sortDown){
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

  onClickSearchProject() {

    if (this.ricercaProgetto == "") {
      this.listaProgetti.splice(0);
      this.isVisible = false;
      this.createCard();
    }
    else {
      this.isVisible = true;
      this.projectService.getCercaProgetti(this.ricercaProgetto).subscribe(
        success => {
          console.log(success);
          this.listaProgetti.splice(0);
          if (success.length != 0) {
            for (var i = 0; i < success.length; i++) {
              //this.indiceLista = i;
              this.listaProgetti.push({
                'id': success[i].id_progetto,
                'nome_progetto': success[i].nome_progetto,
                'descrizione': success[i].descrizione_progetto
              });
              //this.isVisible = true;
              this.isSuccess = true;
            }
          }
          else {
            console.log('nessun risultato');
            //this.isVisible = true;
            this.isSuccess = false;
            console.log(this.listaProgetti);
          }
        },
        error => {
          console.log('errore');
        });
    }
  }

  onClickCanc() {
    this.isVisible = false;
  }


  openProject(id) {
    // carico sullo user service il progetto selezionato dell'utente
    this.projectService.getProgettoById(id).subscribe(
      succ => {
        if (succ != []) {
          var progetto = {
            'id_progetto': succ[0].id_progetto,
            'nome_progetto': succ[0].nome_progetto,
            'descrizione': succ[0].descrizione_progetto
          }
          console.log(progetto);
          this.projectService.setProgetto(progetto)

          this.router.navigate(['/lavagna']);
        } else {
          //id progetto non presente nel database
          this.router.navigate(['/']);
        }
      },
      err => {
        console.log("errore connessione database!");
      }
    )
    //this.router.navigate(['/lavagna']);
  }

  toggleSort(){
    //funzione per creare toggle dell'ordinamento alfabetico
    if(this.sortDown){
      //ordinamento dalla z alla a 
      this.sortDown = false;
    }else{
      //ordinamento dalla a alla z
      this.sortDown = true;
    }
    this.createCard();
  }
}
