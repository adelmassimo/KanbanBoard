import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';

@Component({
  selector: 'app-impostazioni-progetto-dialog',
  templateUrl: './impostazioni-progetto-dialog.component.html',
  styleUrls: ['./impostazioni-progetto-dialog.component.css']
})
export class ImpostazioniProgettoDialogComponent{
  
  constructor(
    public dialogRef: MatDialogRef<ImpostazioniProgettoDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data) {}

  onNoClick(): void {
    this.dialogRef.close();
  }
}
