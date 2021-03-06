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
  postItEpiche: Array<any> = [];

  arrayColonne: any[] = [];

  error: boolean = false;
  success: boolean = false;
  warning: boolean = false;
  message: string = "progetto modificato correttamente";

  clickButton: boolean = false;
  lastIdClick: number = 0;
  id: number = 0;

  //questo array conterà tutte le relazioni tra post-it attive
  arrayRelazioni: any[] = [];

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
    touch: true,
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

  visualizzaTabella() {
    this.arrayColonne.splice(0);
    for (let i = 0; i < this.projectService.arrayColonne.length; i++) {
      this.arrayColonne.push(this.projectService.arrayColonne[i]);
    }
  }

  visualizzaPostIt() {
    this.postIt.splice(0);
    this.postItEpiche.splice(0);
    this.projectService.getPostItProgetto().subscribe(
      succ => {
        if (succ[0] != null) {
          console.log(succ);
          //riempio il vettore postIt[] con tutti i post-it dell'progetto selezionato
          for (let post of succ) {
            post.inBreve = post.descrizione_postIt.length < 25
              ? post.descrizione_postIt
              : post.descrizione_postIt.substr(0, 24) + '...';
            if(post.epica == 0){
              post.nomeInBreve = post.nome_postIt.length < 15
              ? post.nome_postIt
              : (post.nome_postIt.substr(0, 14) + '...');
            } else{
              post.nomeInBreve = post.nome_postIt.length < 24
              ? post.nome_postIt
              : (post.nome_postIt.substr(0, 23) + '...');
            }
            
            this.postIt.push(post);
            if (post.epica == 1) {
              this.postItEpiche.push(post);
            }
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
    if (!this.clickButton) {
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
          } else if (data.action === 'insert') {
            this.visualizzaPostIt();
          }
        },
        undefined => {
          this.visualizzaPostIt();
        });
    }
    this.clickButton = false;
  }

  onClickUpdate() {
    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = false;
    //dialogConfig.autoFocus = true;

    dialogConfig.width = '500px';
    dialogConfig.height = '500px';
    dialogConfig.data = this.projectService.progetto;
    console.log("rubio", this.projectService.progetto)
    const dialogRef = this.dialog.open(ImpostazioniProgettoDialogComponent, dialogConfig);


    dialogRef.afterClosed().subscribe(
      data => {
        console.log(data);

        this.projectService.updateProgetto(data.progetto).subscribe(
          success => {
            console.log(success);
            if (success != null) {
              console.log("nome progetto modificato correttamente");
              this.visualizzaPostIt();
              this.success = true;
              this.message = "Nome progetto modificato correttamente";
              this.projectService.updateTitoloProgetto(success.nome_progetto);
              this.nomeProgetto = this.projectService.progetto.nomeProgetto;
            } else {
              console.log("errore aggiornamento del nome progetto");
              this.error = true;
              this.message = "Errore, prego riprovare!";
            }
            setTimeout(() => {
              this.success = false;
              this.error = false;
            }, 2000);
          },
          err => {
            console.log("errore collegamento database!");
          }
        )
      }
    )
  }

  onClickRefresh() {
    this.ngOnInit();
  }

  // INIZIO MOVIMENTO POST-IT

  drop(event: CdkDragDrop<string[]>, colonna: string) {
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
      console.log(colonna, event.container.data, event.currentIndex);

      const postit: any = event.container.data[event.currentIndex];
      postit.tipologia = colonna;

      this.postitservice.updatePostit(postit, this.userService.user.id).subscribe(
        success => {
          this.visualizzaPostIt();
        }
      )

    } // fine if
  }

  mouseIn(id) {
    this.id = id;
  }

  mouseOut() {
    this.id = 0;
  }

  //Evidenzia le relazioni tra post-it dipendenti
  share(post) {
    console.log("bottone cliccato")
    this.clickButton = true;

    if (this.lastIdClick == 0 || this.lastIdClick != post.id_postIt) {
      this.removeShare();
      if (post.epica == 0 && post.id_epica_riferimento == 0) {
        console.log("post-it indipendente");
        this.message = "Post-it indipendente";
        this.warning = true;
      } else {
        var element = document.getElementById(post.id_postIt);
        this.arrayRelazioni.push(element);

        if (post.epica == 1) {
          for (let postIt of this.postIt) {
            if (post.id_postIt == postIt.id_epica_riferimento) {
              var element = document.getElementById(postIt.id_postIt);
              this.arrayRelazioni.push(element);
            }
          }
        } else {
          for (let epica of this.postItEpiche) {
            if (epica.id_postIt == post.id_epica_riferimento) {
              var dip = document.getElementById(epica.id_postIt);
              this.arrayRelazioni.push(dip);
              break;
            }
          }
        }
        for (let postIt of this.arrayRelazioni) {
          postIt.classList.add("boxShadow");
        }
        this.lastIdClick = post.id_postIt;
      }
    } else {
      console.log("box shadow presente")
      this.removeShare();
    }
    setTimeout(() => {
      this.warning = false;
    }, 1500);
  }

  removeShare() {
    for (let postIt of this.arrayRelazioni) {
      postIt.classList.remove("boxShadow");
    }
    this.lastIdClick = 0;
    this.arrayRelazioni.splice(0);
  }

  // FINE MOVIMENTO POST-IT

  //SCRIPT
  //script per levare la classe tile alle colonne
  loadScript() {
    var element = document.getElementsByClassName("tile");
    for (let i = 0; i < element.length; i++) {
      element[i].classList.remove("tile");
    }
  }

  boxShadowEpicScriptAdd(id_epica) {
    for (let post of this.postIt) {
      if (post.id_epica_riferimento == id_epica) {
        var dip = document.getElementById(post.id_postIt);
        dip.classList.add("boxShadow");
      }
    }
  }

  boxShadowEpicScriptRemove(id_epica) {
    for (let post of this.postIt) {
      if (post.id_epica_riferimento == id_epica) {
        var dip = document.getElementById(post.id_postIt);
        dip.classList.remove("boxShadow");
      }
    }
  }
  boxShadowScriptAdd(id_epica_riferimento) {
    for (let epic of this.postItEpiche) {
      if (id_epica_riferimento == epic.id_postIt) {
        var dip = document.getElementById(epic.id_postIt);
        dip.classList.add("boxShadow");
        return;
      }
    }
  }

  boxShadowScriptRemove(id_epica_riferimento) {
    for (let epic of this.postIt) {
      if (id_epica_riferimento == epic.id_postIt) {
        var dip = document.getElementById(epic.id_postIt);
        dip.classList.remove("boxShadow");
        return;
      }
    }
  }
}
