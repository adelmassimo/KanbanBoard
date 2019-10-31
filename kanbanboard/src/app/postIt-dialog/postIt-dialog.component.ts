import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material";
import { FormGroup, FormBuilder, FormControl } from '@angular/forms';

import { PostItService } from '../services/post-it.service';

@Component({
  selector: 'app-postIt-dialog',
  templateUrl: './postIt-dialog.component.html',
  styleUrls: ['./postIt-dialog.component.css']
})
export class PostItDialogComponent implements OnInit {

  form: FormGroup;
  panelColor = new FormControl();
  typePost = new FormControl();

  post: any = {
    id_postIt: -1,
    nome_postIt: "",
    descrizione_postIt: "",
    colore_postIt: "",
    tipologia: "",
    nome_progetto: "",
    descrizione_progetto: ""
  }
  poatItModifica: any = {
    id_postIt: -1,
    nome_postIt: "",
    descrizione_postIt: "",
    colore_postIt: "",
    tipologia: "",
    data: ""
  }

  modifica: boolean = false;

  modifichePrecedenti: boolean = false;
  storicoModifiche: Array<any> = [];
  modificaSelezionata: boolean = false;

  titolo: string;
  descrizione: string;
  coloreSfondo: string = "";

  action: string = "";


  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<PostItDialogComponent>,
    private postitservice: PostItService,
    @Inject(MAT_DIALOG_DATA) data) {
    this.post = {
      id_postIt: data.id_postIt,
      nome_postIt: data.nome_postIt,
      descrizione_postIt: data.descrizione_postIt,
      colore_postIt: data.colore_postIt,
      tipologia: data.tipologia,
      nome_progetto: data.nome_progetto,
      descrizione_progetto: data.descrizione_progetto
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
  }
  delete() {
    this.action = "delete";
    this.close();
  }

  openModifica() {
    this.modifica = true;
  }
  annulla() {
    this.modifica = false;
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
  showModifica(modifica){
    this.modificaSelezionata = true;
    /** `id_postItOld`, `nome_PostItNew`, `descrizione_postItNew`, `colore_postItNew`, `tipologiaNew` */
    this.poatItModifica = {
      id_postIt: modifica.id_postItOld,
      nome_postIt: modifica.nome_PostItNew,
      descrizione_postIt: modifica.descrizione_postItNew,
      colore_postIt: modifica.colore_postItNew,
      tipologia: modifica.tipologiaNew,
      data: modifica.data
    }
    this.coloreSfondo = this.poatItModifica.colore_postIt;
  }
  colseModificaSelezionata(){
    this.modificaSelezionata = false;
    this.coloreSfondo = this.post.colore_postIt;
  }

  getModifichePostIt(){
    this.postitservice.getModifichePostIt(this.post.id_postIt).subscribe(
      succ => {
        //controllo se mi arriva almeno una entry dal database
        console.log('prima:',this.storicoModifiche);
        if (succ[0] != null) {
          //svuoto il vettore contenente lo storico delle modifiche
          this.storicoModifiche.splice(0);
          //riempio il vettore storicoModifiche[] con tutte  le modifiche del post-it 
          for (let modifica of succ) {
            this.storicoModifiche.push(modifica);
          }
          console.log('dopo',this.storicoModifiche);
        }
      },
      err => {
        console.log("errore connessione database!");
      }
    );
  }

  onChangeColor() {
    this.coloreSfondo = this.panelColor.value;
  }


  save() {
    this.post.nome_postIt = this.titolo;
    this.post.descrizione_postIt = this.descrizione;
    this.post.colore_postIt = this.panelColor.value;
    this.post.tipologia = this.typePost.value;
    this.action = "update";
    this.close();
  }

  close() {
    this.dialogRef.close({
      'action': this.action,
      'postIt': this.post
    });
  }




}
