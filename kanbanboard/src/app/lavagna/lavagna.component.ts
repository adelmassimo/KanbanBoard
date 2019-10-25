import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProjectService } from '../services/project.service';

@Component({
  selector: 'app-lavagna',
  templateUrl: './lavagna.component.html',
  styleUrls: ['./lavagna.component.css']
})
export class LavagnaComponent implements OnInit {

  constructor(private router: Router, private projectService: ProjectService) { }

  
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

  ngDoCheck(){

    //questo if controlla se l'utente è loggato altrimenti si viene reindrizzati alla homepage
    //if(this.localstorageservice.isEmpty()){
      //se non è loggato nessuno si viene reindirizzati alla homepage
      //this.router.navigate(['']);
    //}
  }

  creaPostIt(){
    this.router.navigate(['/post-it']);
  }

  esciProgetto(){
    this.router.navigate(['/pu']);
  }

  visualizzaPostIt(){
    this.projectService.getPostItProgetto().subscribe(
      succ =>{
        //controllo se mi arriva almeno una entry dal database
        if(succ[0] != null){
          //svuoto tutti i vettori per ricaricare i post-it presenti nel DB
          this.postIt.splice(0);
          this.toDo.splice(0);
          this.doing.splice(0);
          this.done.splice(0);
          this.accepted.splice(0);

          //riempio il vettore postIt[] con tutti i post-it dell'progetto selezionato
          for(let post of succ){
            this.postIt.push(post);
          }
          console.log(this.postIt);
          //mostrare i postIt sull'html
          for(let post of this.postIt){
            if(post.tipologia == "to do"){
              this.toDo.push(post);
            } else if(post.tipologia == "doing"){
              this.doing.push(post);
            } else if(post.tipologia == "done"){
              this.done.push(post);
            } else if(post.tipologia == "accepted"){
              this.accepted.push(post);
            }
          }
        }
      },
      err =>{
        console.log("errore connessione database!");
      }
    );
  }

}
