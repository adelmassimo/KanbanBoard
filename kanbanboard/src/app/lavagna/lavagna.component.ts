import { Component, OnInit } from '@angular/core';
import { Inject } from '@angular/core';
import { Router } from '@angular/router';

import { LocalStorageService } from '../services/local-storage.service';
import { LOCAL_STORAGE, StorageService } from 'ngx-webstorage-service';

@Component({
  selector: 'app-lavagna',
  templateUrl: './lavagna.component.html',
  styleUrls: ['./lavagna.component.css']
})
export class LavagnaComponent implements OnInit {

  constructor(private localstorageservice: LocalStorageService,
    @Inject(LOCAL_STORAGE) private storage: StorageService, private router: Router) { }

  ngOnInit() {
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

}
