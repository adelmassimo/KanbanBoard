import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { ProjectService } from '../services/project.service';
import { NewProjectService } from '../services/new-project.service';
import { UserService } from '../services/user.service';
import { PostItService } from '../services/post-it.service';


import { MatDialog, MatDialogConfig } from "@angular/material";
import { PostItDialogComponent } from '../postIt-dialog/postIt-dialog.component';
import { ImpostazioniProgettoDialogComponent } from '../impostazioni-progetto-dialog/impostazioni-progetto-dialog.component';

@Component({
  selector: 'app-lavagna',
  templateUrl: './lavagna.component.html',
  styleUrls: ['./lavagna.component.css']
})
export class LavagnaComponent implements OnInit {

  constructor(private router: Router, private projectService: ProjectService,
    private userService: UserService,
    private postitservice: PostItService,
    private newprojectservice: NewProjectService,
    private dialog: MatDialog
  ) { }


  nomeProgetto: string = "nome progetto";
  postIt: Array<any> = [];

  arrayColonne: any[] = [];
  arrayPostIt: any[] = [];

  toDo: Array<any> = [];
  doing: Array<any> = [];
  done: Array<any> = [];
  accepted: Array<any> = [];

  colore: string = "orange";

  ngOnInit() {
    this.visualizzaPostIt();
  }

  ngDoCheck(){
    //se l'utente non è loggato viene reindirizzato alla homepage
    if(this.userService.user.id == ""){
      this.router.navigate(['/']);
    }

    this.visualizzaTabella();
  }

  creaPostIt() {
    this.router.navigate(['/post-it']);
  }

  esciProgetto() {
    this.router.navigate(['/pu']);
  }

  visualizzaTabella(){
    this.arrayColonne.splice(0);
    for(let i = 0; i < this.projectService.arrayColonne.length; i++){
      this.arrayColonne.push(this.projectService.arrayColonne[i]);
    }
  }

  visualizzaPostIt() {
    this.postIt.splice(0);
    this.projectService.getPostItProgetto().subscribe(
      succ => {
        if(succ[0] != null){
          //riempio il vettore postIt[] con tutti i post-it dell'progetto selezionato
          for (let post of succ) {
            this.postIt.push(post);
          }
        }
        //imposto il titolo del progetto
        this.nomeProgetto = this.projectService.progetto.nomeProgetto;
      },
      err => {
        console.log("errore connessione database!");
      }
    );
  }


  //dialog visualizza postit
  openDialog(post) {
    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = false;
    dialogConfig.autoFocus = false;

    dialogConfig.width = '500px';
    //dialogConfig.maxHeight= '500px';

    dialogConfig.data = post;

    const dialogRef = this.dialog.open(PostItDialogComponent, dialogConfig);

    dialogRef.afterClosed().subscribe(
      data => {
        if (data.action === 'delete') {
          this.postitservice.eliminaPostit(data.postIt).subscribe(
            success => {
              this.visualizzaPostIt();
            }
          )
        } else if (data.action === 'update') {
          this.postitservice.updatePostit(data.postIt, this.userService.user.id).subscribe(
            success => {
              this.visualizzaPostIt();
            }
          )
        }
      },
      undefined => {
        this.visualizzaPostIt();
      });

  }

  onClickUpdate() {
    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = false;
    //dialogConfig.autoFocus = true;

    dialogConfig.width = '500px';
    dialogConfig.height= '500px';
    dialogConfig.data = this.projectService.progetto;
    console.log("rubio", this.projectService.progetto)
    const dialogRef = this.dialog.open(ImpostazioniProgettoDialogComponent, dialogConfig);


    dialogRef.afterClosed().subscribe(
      data => {

        if (data.action === 'modifica') {

          this.newprojectservice.updateProject(data.progetto).subscribe(
            success => {
              this.visualizzaPostIt();
              this.projectService.setProgetto(data.progetto);
              this.nomeProgetto = this.projectService.progetto.nomeProgetto;
            }

          );
        }
      }
    )
  }

  onClickRefresh(){
    this.visualizzaPostIt();
  }

}
