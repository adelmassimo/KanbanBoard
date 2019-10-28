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
  ricercaProgetto: string;
  idCard: any[] = [];
  progetto: any[] = [];
  descrizione: any[] = [];
  listaProgetti: any[] = [];

  //variabile per fare toggle sul sort button
  sortDown: boolean = true;
  // listaProgetti: any[] = [{ 'idCard': "", 'progetto': "", 'descrizione': "" }];
  idProgettoTrovato: any;

  constructor(private projectService: ProjectService,
    private userService: UserService, private router: Router) { }

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
      success=>{
        console.log('ricerca')
        console.log(this.listaProgetti);
        for (let i = 0; i < success.length; i++){
          if (this.progetto == this.listaProgetti[i].progetto) {
            console.log("Progetto Trovato!");
            /*
            for (var i = 0; i < success.length; i++) {
              if (this.ricercaProgetto == this.listaProgetti[i].progetto) {
                this.idProgettoTrovato = this.listaProgetti[i].idCard;
                this.progetto.push(success[i].nome_progetto);
                this.isSuccess = true;
              }
            }
            */
            if (this.isSuccess = true) {
              console.log('trovato');
              this.projectService.getCercaProgetti(this.ricercaProgetto).subscribe(
                success => {


                },
                error => {

                }
              )
              console.log(this.listaProgetti);
              console.log(this.idProgettoTrovato);
            }
          }
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

  onClickRefresh() {

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
