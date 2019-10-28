import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';

@Component({
  selector: 'app-impostazioni-progetto-dialog',
  templateUrl: './impostazioni-progetto-dialog.component.html',
  styleUrls: ['./impostazioni-progetto-dialog.component.css']
})
export class ImpostazioniProgettoDialogComponent {

  project: any = {
    id_progetto: 10,
    nome_progetto: "",
    descrizione_progetto: ""
  }
  nome_progetto: string;
  descrizione_progetto: string;
  constructor(
    public dialogRef: MatDialogRef<ImpostazioniProgettoDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data) {
    this.project = {
      id_progetto: data.id,
      nome_progetto: data.nomeProgetto,
      descrizione_progetto: data.descrizione
    }
    this.nome_progetto = this.project.nome_progetto;
    this.descrizione_progetto = this.project.descrizione_progetto;
  }

  salva() {
    this.project.nome_progetto = this.nome_progetto;
    this.project.descrizione_progetto = this.descrizione_progetto;
    this.close("modifica");
  }
  close(action) {
    this.dialogRef.close({
      'action': action,
      'progetto': this.project
    });
  }
}
