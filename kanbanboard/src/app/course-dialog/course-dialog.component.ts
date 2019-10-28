import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material";
import { FormGroup, FormBuilder, FormControl } from '@angular/forms';

import { PostItService } from '../services/post-it.service';

@Component({
  selector: 'app-course-dialog',
  templateUrl: './course-dialog.component.html',
  styleUrls: ['./course-dialog.component.css']
})
export class CourseDialogComponent implements OnInit {

  form: FormGroup;
  panelColor = new FormControl();
  typePost = new FormControl();


  post: any = {
    id_postIt: 57, 
     nome_postIt: "efewf", 
     descrizione_postIt: "efwefwefwef", 
     colore_postIt: "blue",
     tipologia: "to do",
     nome_progetto: "progetto", 
     descrizione_progetto: "prrrrrrrrogetto" 
    }
  
  coloreSfondo: string = "";

  modifica: boolean = false;
  titolo: string;
  descrizione: string;
  //panelColor: string;


  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<CourseDialogComponent>,
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
    this.coloreSfondo = "bg-" + data.colore_postIt;
    this.titolo = data.nome_postIt;
    this.descrizione = data.descrizione_postIt;
    this.panelColor.setValue(data.colore_postIt);
    this.typePost.setValue(data.tipologia);
  }

  delete() {
    this.close('delete');
  }

  openModifica() {
    this.modifica = true;
    console.log(this.modifica, this.post);
  }

  onChangeColor(){
    this.coloreSfondo = "bg-"+this.panelColor.value;
  }

  ngOnInit() {
    this.form = this.fb.group({
      titolo: this.titolo,
      descrizione: this.descrizione
     // panelColor: this.panelColor
    });
  }
  save() {
    this.post.nome_postIt = this.titolo;
    this.post.descrizione_postIt = this.descrizione;
    this.post.colore_postIt = this.panelColor.value;
    this.post.tipologia = this.typePost.value;
    this.close('update');
  }

  close(action) {
    this.dialogRef.close({
      'action': action,
      'postIt': this.post
    });
  }

}
