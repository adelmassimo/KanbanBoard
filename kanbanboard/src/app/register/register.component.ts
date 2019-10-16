import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RegisterService } from '../services/register.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  constructor(private router: Router, private registerService: RegisterService) { }

  username: string = "pipphhuhuho";
  password: string = "4848nubhuUHU";
  email: string = "ffhue@gmail.com";
  nome: string = "marco";
  cognome: string = "rossi";

  ngOnInit() {
    this.onRegisterSubmit();
  }

  onRegisterSubmit(){
    const utente: any = {
      nome: this.nome,
      cognome: this.cognome,
      username : this.username,
      password : this.password,
      email: this.email
      
    }

    //controllo che i campi non siano vuoti
    if (this.username != undefined && this.username != "" && this.password != undefined && this.password != ""
    && this.email != undefined && this.email != "" && this.nome != undefined && this.nome != ""
    && this.cognome != undefined && this.cognome != ""){
      if(this.registerService.registrazione(utente)){
        console.log("reindirizzamento all homepage");
      }else{
        console.log("errore, prego riprovare");
      }
    }else{
      console.log("riempi i campi correttamente!");
    }
  }

}
