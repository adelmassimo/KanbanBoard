import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';

@Component({
  selector: 'app-impostazioni-progetto-dialog',
  templateUrl: './impostazioni-progetto-dialog.component.html',
  styleUrls: ['./impostazioni-progetto-dialog.component.css']
})
export class ImpostazioniProgettoDialogComponent{

  project: any = {
    id_progetto: 10,
    nome_progetto: "",
    descrizione_progetto: ""
  }
  
  constructor(
    public dialogRef: MatDialogRef<ImpostazioniProgettoDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data) {
      console.log(data)
      this.project = {
        id_progetto: data.id_progetto,
        nome_progetto: data.nome_progetto,
        descrizione_progetto: data.descrizione_progetto
      }
    }

  onClickAnnulla(): void {
    this.dialogRef.close(this.project);
    
  }
}
