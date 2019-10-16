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
  myMessage: string = "";
  error: boolean = false;
  sign: boolean = false;

  ngOnInit() {
    //this.onLoginSubmit();
  }

  onLoginSubmit() {
    const utente: any = {
      username : this.username,
      password : this.password
    }
    console.log(utente);

    if (this.username != undefined && this.username != "" && this.password != undefined && this.password != "") {
      if (this.loginService.autenticazione(utente)) {

        console.log("successo");
        this.myMessage = "Login effettuato con successo";
        this.error = false;
        this.sign = true;

        this.router.navigate(['/pu']);
      } else {
        console.log("utente non trovato!");
        this.myMessage = "utente non trovato!";
        this.error = true;
        this.sign = false;
      }
    } else {
      console.log("riempi i campi correttamente!");
      this.myMessage = "username o password errati";
      this.error = true;
      this.sign = false;
    }
  }

}
