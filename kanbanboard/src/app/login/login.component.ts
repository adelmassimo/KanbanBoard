import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { LoginService } from '../services/login.service';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private router: Router, private loginService: LoginService, private route: ActivatedRoute,
    private userService: UserService) { }

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

    if (this.username != undefined && this.username != "" && this.password != undefined && this.password != "") {
      this.loginService.login(utente).subscribe(
        utente => {
          if (utente === null ) {
            // oia
            console.log("utente non trovato!");
            this.myMessage = "utente non trovato!";
            this.error = true;
            this.sign = false;
          } else {
            //carico l'utente nel servizio utente
            this.userService.setUser(utente);
            this.myMessage = "Login effettuato con successo";
            this.error = false;
            this.sign = true;
            
            this.router.navigate(['/pu']);
          }
        },
        err => {
          console.log("errore collegamento database");
        }
      )
    } else {
      console.log("riempi i campi correttamente!");
      this.myMessage = "username o password errati";
      this.error = true;
      this.sign = false;
    }
  }

}
