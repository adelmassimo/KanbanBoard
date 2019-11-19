import { Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { Router } from '@angular/router';
import { NguCarouselConfig } from '../carousel';

import { ProjectService } from '../services/project.service';
import { UserService } from '../services/user.service';
import { PostItService } from '../services/post-it.service';

import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';

import { MatDialog, MatDialogConfig } from "@angular/material";
import { PostItDialogComponent } from '../postIt-dialog/postIt-dialog.component';
import { ImpostazioniProgettoDialogComponent } from '../impostazioni-progetto-dialog/impostazioni-progetto-dialog.component';

@Component({
  selector: 'app-lavagna',
  templateUrl: './lavagna.component.html',
  styleUrls: ['./lavagna.component.css', './lavagna.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LavagnaComponent implements OnInit {

  constructor(private router: Router, private projectService: ProjectService,
    private userService: UserService,
    private postitservice: PostItService,
    private dialog: MatDialog,
    private cdr: ChangeDetectorRef
  ) { 
    //funzione che serve per chiamare lo script "loadScript()"
    this.loadAPI = new Promise((resolve) => {
      this.loadScript();
      resolve(true);
    });
  }


  nomeProgetto: string = "nome progetto";
  postIt: Array<any> = [];

  arrayColonne: any[] = [];

  /* inizio variabili ngu-carousel */
  loadAPI: Promise<any>;

  //quesa variabile serve per configurare il carosello
  public carouselTile: NguCarouselConfig = {
    grid: { xs: 2, sm: 2, md: 4, lg: 4, all: 0 },
    slide: 1,
    speed: 250,
    point: {
      visible: false, hideOnSingleSlide: true
    },
    load: 2,
    velocity: 0,
    touch: false,
    easing: 'cubic-bezier(0, 0, 0.2, 1)'
  };

  /* fine variabili ngu-carousel */

  ngOnInit() {
    //imposto il titolo del progetto
    this.nomeProgetto = this.projectService.progetto.nomeProgetto;

    this.visualizzaPostIt();
    this.visualizzaTabella();

    this.loadScript();
    this.ngDoCheck();
  }

  ngDoCheck() {
    //se l'utente non è loggato viene reindirizzato alla homepage
    if (this.userService.user.id == "") {
      this.router.navigate(['/']);
    }
    this.cdr.detectChanges();

    //richiamo script javascript
    this.loadScript();
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
          console.log(succ);
          //riempio il vettore postIt[] con tutti i post-it dell'progetto selezionato
          for (let post of succ) {
            post.inBreve = post.descrizione_postIt.length < 25
              ? post.descrizione_postIt
              : post.descrizione_postIt.substr(0, 24) + '...';
            post.nomeInBreve = post.nome_postIt.length < 15
              ? post.nome_postIt
              : (post.nome_postIt.substr(0, 14) + '...');
            this.postIt.push(post);
          }
        }
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
        this.postitservice.updatePostit(data.postIt,this.userService.user.id).subscribe(
          success => {
            this.visualizzaPostIt();
          }
        )
      }
    )
  }

  onClickRefresh(){
    this.ngOnInit();
  }

  // INIZIO MOVIMENTO POST-IT
 
  drop(event: CdkDragDrop<string[]>, colonna:string) {
    //IF SPOSTAMENTO NELLA STESSA COLONNA
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      //SPOSTAMENTO DEL POST-IT IN UN'ALTRA COLONNA
      transferArrayItem(event.previousContainer.data,
                        event.container.data,
                        event.previousIndex,
                        event.currentIndex);
      console.log("ricevuto click");
      console.log(colonna,event.container.data ,event.currentIndex);
      
      const postit: any = event.container.data[event.currentIndex];
      postit.tipologia = colonna;

      this.postitservice.updatePostit(postit,this.userService.user.id).subscribe(
        success => {
          this.visualizzaPostIt();
        }
      )
  
    } // fine if
  }
  
  // FINE MOVIMENTO POST-IT

  //script per levare la classe tile alle colonne
  loadScript(){
    var element = document.getElementsByClassName("tile");
    for(let i = 0; i < element.length; i++){
      element[i].classList.remove("tile");
    }   
  }
}
