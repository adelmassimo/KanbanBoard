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

  modifica: boolean = false;

  modifichePrecedenti: boolean = false;

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

  openStoricoModifiche(){
    this.modifichePrecedenti = true;
    this.modifica = false;
    console.log(this.modifichePrecedenti);
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
