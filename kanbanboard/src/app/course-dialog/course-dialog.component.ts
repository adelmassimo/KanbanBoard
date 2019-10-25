import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material";
import { FormGroup, FormBuilder } from '@angular/forms';

import { PostItService } from '../services/post-it.service';

@Component({
  selector: 'app-course-dialog',
  templateUrl: './course-dialog.component.html',
  styleUrls: ['./course-dialog.component.css']
})
export class CourseDialogComponent implements OnInit {

  form: FormGroup;
  
  post: object;
  coloreSfondo :string = "";

  modifica:boolean = false;
  titolo:string;
  descrizione:string;

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<CourseDialogComponent>,
    private postitservice: PostItService,

    @Inject(MAT_DIALOG_DATA) data) {

    this.post = data;
    this.coloreSfondo = "bg-" + data.colore_postIt;
    
  }

  delete(){
    this.close('delete');
  }

  openModifica(){
    this.modifica = true;
  }

  ngOnInit() {
    this.form = this.fb.group({
      titolo: this.titolo,
      descrizione: this.descrizione
  });
  }
  save() {
    //this.dialogRef.close(this.form.value);
  }

  close(action) {
    this.dialogRef.close({
      'action': action,
      'postIt': this.post
    });
  }

}
