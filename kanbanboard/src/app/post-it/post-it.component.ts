import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormControl } from '@angular/forms';

import { UserService } from '../services/user.service';
import { PostItService } from '../services/post-it.service';
import { ProjectService } from '../services/project.service';
//import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';

@Component({
  selector: 'app-post-it',
  templateUrl: './post-it.component.html',
  styleUrls: ['./post-it.component.css']
})
export class PostItComponent implements OnInit {

  panelColor = new FormControl('#FF6347');
  typePost = new FormControl('');
  difficoltaPost = new FormControl('0');

  constructor(private router: Router, private route: ActivatedRoute, private postItService: PostItService,
    private userService: UserService, private projectService: ProjectService) { }

  nome_postIt: string = "";
  descrizione_postIt: string = "";
  colore_postIt: string = "";
  tipologia: string = "";
  difficolta: string = "";
  myMessage: string = "";
  error: boolean = false;
  aggiunto: boolean = false;

  colonne: Array<any> = [];

  //variabili epica
  nome_epica: string = "";
  descrizione_epica: string = "";
  panelColorEpic = new FormControl('#FF6347');
  colore_epica: string = "";
  difficoltaEpicaControl = new FormControl('0');
  difficoltaEpica: string = "";
  colore_dipendenti = [];

  //variabile per mostrare o nascondere l'anteprima della epica
  antEpica: boolean = true;

  isGo: boolean = false;
  numero_dipendenti: number = 0;
  arrayPostIt = [];

  onSaveSubmit() {
    const postIt: any = {
      nome_postIt: this.nome_postIt,
      descrizione_postIt: this.descrizione_postIt,
      colore_postIt: this.panelColor.value,
      tipologia: this.typePost.value,
      difficolta: this.difficoltaPost.value,
      id_progetto: this.projectService.progetto.id
    }
    console.log(postIt);

    //controllo che i campi non siano vuoti
    if (this.nome_postIt != undefined && this.nome_postIt != ""
      && this.descrizione_postIt != undefined && this.descrizione_postIt != ""
      && this.panelColor.value != undefined && this.panelColor.value != ""
      && this.typePost.value != undefined && this.typePost.value != ""
      && this.difficoltaPost.value != undefined && this.difficoltaPost.value != "") {

      this.postItService.inserimentoPostit(postIt).subscribe(
        successo => {

          if (successo.aggiunto != 1) {
            console.log("POST-IT NON INSERITO");
            this.myMessage = "POST-IT NON INSERITO";
            this.error = true;
            this.aggiunto = false;
          } else {
            console.log("POST-IT INSERITO!");
            this.myMessage = "POST-IT INSERITO!";
            this.error = false;
            this.aggiunto = true;
            //window.location.reload();
            this.router.navigate(['/lavagna']);
          }
        },
        err => {
          console.log("errore collegamento database");
        }
      )
    } else {
      console.log("riempi i campi correttamente!");
      this.myMessage = "Riempi i campi correttamente!";
      this.error = true;
      this.aggiunto = false;
    }
  }

  onSaveEpicSubmit(){
    const epic: any = {
      nome_epica: this.nome_epica,
      descrizione_epica: this.descrizione_epica,
      colore_epica: this.panelColorEpic.value,
      tipologia: this.typePost.value,
      difficolta: this.difficoltaPost.value,
      id_progetto: this.projectService.progetto.id
    }
    console.log(epic);
    console.log(this.arrayPostIt);

    this.postItService.inserimentoEpica(epic, this.arrayPostIt).subscribe(
      succ=>{
        this.router.navigate(['/lavagna']);
      },
      err=>{
        console.log("errore collegamento database!");
      }
    );
  }

  onCancelSubmit() {
    this.router.navigate(['/lavagna']);
  }

  ngOnInit() {
    this.colonne.splice(0);
    this.projectService.getColonneProgetto().subscribe(
      succ => {
        for (let riga of succ) {
          this.colonne.push(riga.nome_colonna);
        }
      },
      err => {
        console.log("errore connessione database!");
      }
    )
  }

  ngDoCheck() {
    this.colore_postIt = this.panelColor.value;
    this.colore_epica = this.panelColorEpic.value;
    
    //se l'utente non è loggato viene reindirizzato alla homepage
    if(this.userService.user.id == ""){
      this.router.navigate(['/']);
    }
  }

  onGoSubmit() {
    if (this.nome_epica != "" && this.descrizione_epica != "" && this.typePost.value != "") {
      this.arrayPostIt.splice(0);
      if(this.numero_dipendenti == 0){
        this.onSaveEpicSubmit();
      }else{
        for(let i = 0; i < this.numero_dipendenti; i++){
          this.arrayPostIt.push({'id': i, 'nome_postIt': "", 'descrizione_postIt': "", 'colore_postIt': "#FF6347", "tipologia": "",
        'difficolta': 0});
        }
        this.error = false;
        this.antEpica = false;
        this.isGo = true;
      }
    } else {
      console.log("riempi i campi correttamente!");
      this.myMessage = "Riempi i campi correttamente!";
      this.error = true;
      this.aggiunto = false;
    }
  }

  onReturnSubmit() {
    this.antEpica = true;
    this.isGo = false;
  }
}
