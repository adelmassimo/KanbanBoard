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
 // listaProgetti: any[] = [{ 'idCard': "", 'progetto': "", 'descrizione': "" }];
  idProgettoTrovato: any;
  listaProgetti: any[] = [];

  constructor(private projectService: ProjectService,
    private userService: UserService, private router: Router) { }

  ngOnInit() {
    this.createCard();
  }

  createCard() {
    this.projectService.getProgettiUtente().subscribe(
      success => {
        
        for (let i = 0; i < success.length; i++) {
          this.listaProgetti.push({ 
            id_progetto: success[i].id_progetto, 
            nome_progetto: success[i].nome_progetto, 
            descrizione: success[i].descrizione_progetto 
          });
        }
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


  openProject(id) {
    // carico sullo user service il progetto selezionato dell'utente
    console.log(id);
    this.projectService.getProgettoById(id).subscribe(
      succ =>{
        if(succ != []){
          var progetto = {
            'id_progetto': succ[0].id_progetto,
            'nome_progetto': succ[0].nome_progetto,
            'descrizione': succ[0].descrizione_progetto
          }
          this.projectService.setProgetto(progetto)

          this.router.navigate(['/lavagna']);
        }else{
          //id progetto non presente nel database
          this.router.navigate(['/']);
        }
      },
      err =>{
        console.log("errore connessione database!");
      }
    )
    //this.router.navigate(['/lavagna']);
  }

  onClickRefresh(){
    
  }

  onClickSort(){
    
  }

}
