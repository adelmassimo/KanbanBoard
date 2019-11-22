import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material";
import { FormGroup, FormBuilder, FormControl } from '@angular/forms';

import { PostItService } from '../services/post-it.service';
import { ProjectService } from '../services/project.service';

@Component({
  selector: 'app-postIt-dialog',
  templateUrl: './postIt-dialog.component.html',
  styleUrls: ['./postIt-dialog.component.css']
})
export class PostItDialogComponent implements OnInit {

  form: FormGroup;
  panelColor = new FormControl();
  typePost = new FormControl();
  difficoltaPost = new FormControl();

  post: any = {
    id_postIt: -1,
    nome_postIt: "",
    descrizione_postIt: "",
    colore_postIt: "",
    tipologia: "",
    nome_progetto: "",
    descrizione_progetto: "",
    difficolta: ""
  }
  postItModifica: any = {
    id_postIt: -1,
    nome_postIt: "",
    descrizione_postIt: "",
    colore_postIt: "",
    tipologia: "",
    data: "",
    nome_utente: "",
    cognome_utent: ""
  }
  postNuovo: any = {
    nome_postIt: "",
    descrizione_postIt: "",
    colore_postIt: "",
    tipologia: "",
    difficolta: 0
  }

  modifica: boolean = false;
  aggiungi: boolean = false;

  modifichePrecedenti: boolean = false;
  storicoModifiche: Array<any> = [];
  modificaSelezionata: boolean = false;

  titolo: string;
  descrizione: string;
  coloreSfondo: string = "";

  action: string = "";

  colonne: Array<any> = [];

  error: boolean = false;
  message: string = "messaggio di prova";

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<PostItDialogComponent>,
    private postitservice: PostItService,
    @Inject(MAT_DIALOG_DATA) data,
    private projectService: ProjectService) {
    this.post = {
      id_postIt: data.id_postIt,
      nome_postIt: data.nome_postIt,
      descrizione_postIt: data.descrizione_postIt,
      colore_postIt: data.colore_postIt,
      tipologia: data.tipologia,
      nome_progetto: data.nome_progetto,
      descrizione_progetto: data.descrizione_progetto,
      difficolta: data.difficolta
    }
    this.coloreSfondo = data.colore_postIt;
    this.titolo = data.nome_postIt;
    this.descrizione = data.descrizione_postIt;
    this.panelColor.setValue(data.colore_postIt);
    this.typePost.setValue(data.tipologia);
  }
  ngOnInit() {
    this.form = this.fb.group({
      titolo: this.titolo,
      descrizione: this.descrizione
    });

    //INIZIO inizializzazione variabile colonne
    this.colonne.splice(0);
    this.projectService.getColonneProgetto().subscribe(
      succ => {
        for (let riga of succ) {
          this.colonne.push(riga.nome_colonna);
        }
        console.log(this.colonne);
      },
      err => {
        console.log("errore connessione database!");
      }
    )
    //FINE 
  }
  delete() {
    this.action = "delete";
    this.close();
  }
  aggiungiDipendenti() {
    this.aggiungi = true;
    this.postNuovo.colore_postIt = this.panelColor.value;
    this.postNuovo.tipologia = this.typePost.value;
  }
  openModifica() {
    this.modifica = true;
  }
  annulla() {
    this.modifica = false;
    this.aggiungi = false;
    this.coloreSfondo = this.post.colore_postIt;
    this.titolo = this.post.nome_postIt;
    this.descrizione = this.post.descrizione_postIt;
    this.panelColor.setValue(this.post.colore_postIt);
    this.typePost.setValue(this.post.tipologia);
  }

  openStoricoModifiche() {
    this.modifichePrecedenti = true;
    this.modifica = false;
    this.getModifichePostIt();
  }
  closeStoricoModifiche() {
    this.modifichePrecedenti = false;
    this.modifica = false;
  }
  showModifica(modifica) {
    this.modificaSelezionata = true;
    /** `id_postItOld`, `nome_PostItNew`, `descrizione_postItNew`, `colore_postItNew`, `tipologiaNew` */
    this.postItModifica = {
      id_postIt: modifica.id_postItOld,
      nome_postIt: modifica.nome_PostItNew,
      descrizione_postIt: modifica.descrizione_postItNew,
      colore_postIt: modifica.colore_postItNew,
      tipologia: modifica.tipologiaNew,
      data: modifica.data,
      nome_utente: modifica.nome_utente,
      cognome_utente: modifica.cognome_utente
    }
    this.coloreSfondo = this.postItModifica.colore_postIt;
  }
  colseModificaSelezionata() {
    this.modificaSelezionata = false;
    this.coloreSfondo = this.post.colore_postIt;
  }

  getModifichePostIt() {
    this.postitservice.getModifichePostIt(this.post.id_postIt).subscribe(
      succ => {
        //controllo se mi arriva almeno una entry dal database
        console.log('prima:', this.storicoModifiche, succ);
        if (succ[0] != null) {
          //svuoto il vettore contenente lo storico delle modifiche
          this.storicoModifiche.splice(0);
          //riempio il vettore storicoModifiche[] con tutte  le modifiche del post-it 
          for (let modifica of succ) {
            this.storicoModifiche.push(modifica);
          }
          console.log('dopo', this.storicoModifiche);
        }
      },
      err => {
        console.log("errore connessione database!");
      }
    );
  }

  save() {
    this.post.nome_postIt = this.titolo;
    this.post.descrizione_postIt = this.descrizione;
    this.post.colore_postIt = this.panelColor.value;
    this.post.tipologia = this.typePost.value;
    this.action = "update";
    this.close();
  }

  saveDipendenti() {
    this.postNuovo.difficolta = this.difficoltaPost.value;
    this.postNuovo.tipologia = this.typePost.value;
    this.postNuovo.colore_postIt = this.panelColor.value;
    this.postNuovo.difficolta = this.difficoltaPost.value;
    console.log(this.postNuovo.difficolta);
    if (this.postNuovo.nome_postIt != "" && this.postNuovo.descrizione_postIt != "" &&
      this.postNuovo.colore_postIt != "" && this.postNuovo.tipologia != "" &&
      this.postNuovo.difficolta != null) {

      this.error = false;
      console.log("dati corretti");

      this.postitservice.inserimentoPostitDipendente(this.postNuovo, this.post.id_postIt, this.projectService.progetto.id).subscribe(
        succ => {
          if (succ.successo == 1) {
            console.log("post-it dipendente inserito correttamente");
            this.error = false;
            this.action = "insert";
            this.close();
          } else {
            console.log("post-it non inserito");
            this.message = "errore creazione post-it, prego riprovare";
            this.error = true;
          }
        },
        err => {
          console.log("errore collegamento database!");
        }
      );

    } else {
      console.log("dati errati o incompleti");
      console.log(this.postNuovo.nome_postIt + this.postNuovo.descrizione_postIt + this.postNuovo.colore_postIt + this.postNuovo.tipologia);
      this.message = "Dati errati o incompleti, prego ricontrollare";
      this.error = true;
    }
  }

  close() {
    this.dialogRef.close({
      'action': this.action,
      'postIt': this.post
    });
  }
}
