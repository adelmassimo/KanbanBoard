import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material";
import { FormGroup, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-course-dialog',
  templateUrl: './course-dialog.component.html',
  styleUrls: ['./course-dialog.component.css']
})
export class CourseDialogComponent implements OnInit {

  
  post: object;
  coloreSfondo :string = "";

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<CourseDialogComponent>,
    @Inject(MAT_DIALOG_DATA) data) {

    this.post = data;
    this.coloreSfondo = "bg-" + data.colore_postIt;
  }

  ngOnInit() {
    
  }
  save() {
    //this.dialogRef.close(this.form.value);
  }

  close() {
    this.dialogRef.close(this.post);
  }

}
