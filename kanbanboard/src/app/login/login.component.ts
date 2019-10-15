import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { LoginService } from '../services/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private router: Router, private loginService: LoginService, private route: ActivatedRoute) { }

  username: string = "";
  password: string = "";

  ngOnInit() {
  }

  checkUtente(){
    const utente = {
      username: this.username,
      password: this.password
    };

    if(this.username != undefined && this.username != "" && this.password != undefined && this.password != ""){
      if(this.loginService.autenticazione(utente)){
        console.log("successo");
        this.router.navigate(['/pu']);
      }else{
        console.log("utente non trovato!");
      }
    }else{
      console.log("riempi i campi correttamente!");
    }
  }

}
