import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormControl } from '@angular/forms';

import { UserService } from '../services/user.service';
import { PostItService } from '../services/post-it.service';
import { ProjectService } from '../services/project.service';
//import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';

@Component({
  selector: 'app-post-it',
  templateUrl: './post-it.component.html',
  styleUrls: ['./post-it.component.css']
})
export class PostItComponent implements OnInit {

  panelColor = new FormControl('#FF6347');
  typePost = new FormControl('to do');
  difficoltaPost = new FormControl('0');
  
  constructor(private router: Router, private route: ActivatedRoute,  private postItService: PostItService,
              private userService: UserService, private projectService: ProjectService) { }

  nome_postIt: string = "";
  descrizione_postIt: string = "";
  colore_postIt: string = "";
  tipologia: string = "";
  difficolta: string = "";
  myMessage: string = "";
  error: boolean = false;
  aggiunto: boolean = false;

  onSaveSubmit(){
    const postIt: any = {
      nome_postIt: this.nome_postIt,
      descrizione_postIt: this.descrizione_postIt,
      colore_postIt: this.panelColor.value,
      tipologia: this.typePost.value,
      difficolta: this.difficoltaPost.value,
      id_progetto: this.projectService.progetto.id
    }
    console.log(postIt);

    //controllo che i campi non siano vuoti
    if (this.nome_postIt != undefined && this.nome_postIt != ""
      && this.descrizione_postIt != undefined && this.descrizione_postIt != ""
      && this.panelColor.value != undefined && this.panelColor.value != ""
      && this.typePost.value != undefined && this.typePost.value != ""
      && this.difficoltaPost.value != undefined && this.difficoltaPost.value != "") {

        this.postItService.inserimentoPostit(postIt).subscribe(
          successo => {

            if(successo.aggiunto != 1){
              console.log("POST-IT NON INSERITO");
              this.myMessage = "POST-IT NON INSERITO";
              this.error = true;
              this.aggiunto = false;
            }else{
              console.log("POST-IT INSERITO!");
              this.myMessage = "POST-IT INSERITO!";
              this.error = false;
              this.aggiunto = true;
              //window.location.reload();
              this.router.navigate(['/lavagna']);
            }
          },
          err => {
            console.log("errore collegamento database");
          }
        )
      } else {
        console.log("riempi i campi correttamente!");
        this.myMessage = "Riempi i campi correttamente!";
        this.error = true;
        this.aggiunto = false;
    }

  }

  onCancelSubmit(){
    this.router.navigate(['/lavagna']);
  }

  ngOnInit() {
    
  }

  ngDoCheck(){
    this.colore_postIt = this.panelColor.value;

    //se l'utente non è loggato viene reindirizzato alla homepage
    if(this.userService.user.id == ""){
      this.router.navigate(['/']);
    }
  }
}
