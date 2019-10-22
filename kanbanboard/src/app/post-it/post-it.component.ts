import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
//import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';

@Component({
  selector: 'app-post-it',
  templateUrl: './post-it.component.html',
  styleUrls: ['./post-it.component.css']
})
export class PostItComponent implements OnInit {

  constructor(private router: Router) { }

  nome_post_it: string = "";
  descrizione_postIt: string = "";

  onSaveSubmit(){
    const postIT = {
      nome_post_it: this.nome_post_it,
      descrizione_postIt: this.descrizione_postIt,
    }
  console.log(postIT);
  }
  
  ngOnInit() {
  }


}
