import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';

import { Router } from '@angular/router';

@Component({
  selector: 'app-header-pagina',
  templateUrl: './header-pagina.component.html',
  styleUrls: ['./header-pagina.component.css']
})
export class HeaderPaginaComponent implements OnInit {

  constructor(private userService: UserService, private router: Router) { }

  isUtenteLoggedin: boolean = false;

  objlist: any[] = [];

  id: string;
  nome: string;
  cognome: string;
  avatar: string;

  ngOnInit() {
    console.log(this.isUtenteLoggedin);
  }

  ngDoCheck() {
    if (this.userService.isLogged()) {
      this.isUtenteLoggedin = true;
      this.nome = this.userService.user.nome;
      this.cognome = this.userService.user.cognome;
      this.avatar = this.userService.user.avatar;
    } else {
      this.nome = "Kanbanboard";
      this.cognome = "";
      this.isUtenteLoggedin = false;
    }
  }

  onClickExit() {
    this.nome = "";
    this.cognome = "";
    this.userService.logOutUser();
  }

  openConfig(){
    this.router.navigate(['/setting']);
  }
}
