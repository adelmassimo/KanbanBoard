import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormControl } from '@angular/forms';
import { UserService } from '../services/user.service';

import { PostItService } from '../services/post-it.service';
//import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';

@Component({
  selector: 'app-post-it',
  templateUrl: './post-it.component.html',
  styleUrls: ['./post-it.component.css']
})
export class PostItComponent implements OnInit {

  panelColor = new FormControl('yellow');

  constructor(private router: Router, private route: ActivatedRoute,  private postItService: PostItService,
              private userService: UserService) { }

  nome_postIt: string = "";
  descrizione_postIt: string = "";
  colore_postIt: string = "";
  myMessage: string = "";
  error: boolean = false;
  aggiunto: boolean = false;

  onSaveSubmit(){
    const postIt: any = {
      nome_postIt: this.nome_postIt,
      descrizione_postIt: this.descrizione_postIt,
      colore_postIt: this.panelColor.value,
      tipologia: "TODO",
      id_progetto: this.userService.progettoAttivo
    }
    console.log(postIt);

    //controllo che i campi non siano vuoti
    if (this.nome_postIt != undefined && this.nome_postIt != ""
      && this.descrizione_postIt != undefined && this.descrizione_postIt != ""
      && this.panelColor.value != undefined && this.panelColor.value != "") {

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
    console.log(this.panelColor.value);
  }

  ngDoCheck(){

    //questo if controlla se l'utente è loggato altrimenti si viene reindrizzati alla homepage
    //if(this.localstorageservice.isEmpty()){
      //se non è loggato nessuno si viene reindirizzati alla homepage
      //this.router.navigate(['']);
    //}
  }

}
