import { Component, OnInit } from '@angular/core';
import { LoginService } from '../services/login.service';

@Component({
  selector: 'app-header-pagina',
  templateUrl: './header-pagina.component.html',
  styleUrls: ['./header-pagina.component.css']
})
export class HeaderPaginaComponent implements OnInit {

  constructor(private loginService: LoginService) { }

  nome: string = this.loginService.nome;
  cognome: string = this.loginService.cognome;


  ngOnInit() {
  }

}
