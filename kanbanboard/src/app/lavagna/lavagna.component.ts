import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-lavagna',
  templateUrl: './lavagna.component.html',
  styleUrls: ['./lavagna.component.css']
})
export class LavagnaComponent implements OnInit {

  constructor(private router: Router) { }

  
  ngOnInit() {
    this.visualizzaPostIt();
  }

  nomeProgetto: string = "nome progetto";

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
    //riempio il vettore postIt[] con tutti i post-it dell'utente selezionato
  }

}
