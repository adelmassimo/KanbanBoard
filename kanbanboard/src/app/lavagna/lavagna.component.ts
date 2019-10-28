import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { ProjectService } from '../services/project.service';
import { UserService } from '../services/user.service';
import { PostItService } from '../services/post-it.service';


import { MatDialog, MatDialogConfig } from "@angular/material";
import { CourseDialogComponent } from '../course-dialog/course-dialog.component';

@Component({
  selector: 'app-lavagna',
  templateUrl: './lavagna.component.html',
  styleUrls: ['./lavagna.component.css']
})
export class LavagnaComponent implements OnInit {

  constructor(private router: Router, private projectService: ProjectService,
    private userService: UserService,
    private postitservice: PostItService,
    private projectservice: ProjectService,
    private dialog: MatDialog
    ){ }


  ngOnInit() {
    this.visualizzaPostIt();
  }

  nomeProgetto: string = "nome progetto";
  postIt: Array<any> = [];

  toDo: Array<any> = [];
  doing: Array<any> = [];
  done: Array<any> = [];
  accepted: Array<any> = [];

  colore: string = "orange";

  creaPostIt() {
    this.router.navigate(['/post-it']);
  }

  esciProgetto() {
    this.router.navigate(['/pu']);
  }

  visualizzaPostIt(){
    this.projectService.getPostItProgetto().subscribe(
      succ =>{
        //controllo se mi arriva almeno una entry dal database
        if (succ[0] != null) {
          //svuoto tutti i vettori per ricaricare i post-it presenti nel DB
          this.postIt.splice(0);
          this.toDo.splice(0);
          this.doing.splice(0);
          this.done.splice(0);
          this.accepted.splice(0);

          //riempio il vettore postIt[] con tutti i post-it dell'progetto selezionato
          for (let post of succ) {
            this.postIt.push(post);
          }
          console.log(this.postIt);
          //mostrare i postIt sull'html
          for(let post of this.postIt){
            if(post.tipologia == "to do"){
              this.toDo.push(post);
            } else if (post.tipologia == "doing") {
              this.doing.push(post);
            } else if (post.tipologia == "done") {
              this.done.push(post);
            } else if (post.tipologia == "accepted") {
              this.accepted.push(post);
            }
          }

          //imposto il titolo del progetto
          this.nomeProgetto = this.projectService.progetto.nomeProgetto;
        }
      },
      err => {
        console.log("errore connessione database!");
      }
    );
  }


  //dialog visualizza postit
  openDialog(post) {

    console.log("post selezionato:",post);

    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = false;
    dialogConfig.autoFocus = false;

    dialogConfig.width = '500px';
    //dialogConfig.maxHeight= '500px';

    dialogConfig.data = post;

    //this.dialog.open(CourseDialogComponent, dialogConfig);

    const dialogRef = this.dialog.open(CourseDialogComponent, dialogConfig);

    dialogRef.afterClosed().subscribe(
      data => {
        if(data.action === 'delete'){
          this.postitservice.eliminaPostit(data.postIt).subscribe(
            success => {
              this.visualizzaPostIt();
            }
          )
        }else if(data.action === 'update'){
          this.postitservice.updatePostit(data.postIt).subscribe(
            success => {
              this.visualizzaPostIt();
            }
          )
        }
      });

  }

  onClickUpdate() {
    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = false;
    //dialogConfig.autoFocus = true;

    dialogConfig.width = '500px';
    //dialogConfig.maxHeight= '500px';
    dialogConfig.data = this.projectservice.progetto;
    console.log(this.projectservice.progetto)
    const dialogRef = this.dialog.open(ImpostazioniProgettoDialogComponent, dialogConfig);


    dialogRef.afterClosed().subscribe(
      data => {
            console.log(data)
      }
    )


  }

}
