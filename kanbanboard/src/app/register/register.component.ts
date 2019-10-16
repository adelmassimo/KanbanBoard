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

  avatars: any = [
    "../../assets/img/avatar1.png",
    "../../assets/img/avatar2.png",
    "../../assets/img/avatar3.jpg",
    "../../assets/img/avatar4.png"
  ];

  avatar: string = "../../assets/img/avatarNone.jpeg";
  nome: string = "";
  cognome: string = "";
  email: string = "";
  username: string = "";
  password: string = "";
  myMessage: string = "";
  error: boolean = false;
  sign: boolean = false;
  scegliAvatarVisibile = false;

  ngOnInit() {
  }

  onClickShowAvatars() {
    this.scegliAvatarVisibile = !this.scegliAvatarVisibile;
  }

  onClickScegliAvatar(avatarImg) {
    this.avatar = avatarImg;
  }

  onRegisterSubmit() {

    const utente: any = {
      avatar: this.avatar,
      nome: this.nome,
      email: this.email,
      cognome: this.cognome,
      username: this.username,
      password: this.password
    }

    console.log(utente);

    //controllo che i campi non siano vuoti
    if (this.username != undefined && this.username != ""
      && this.password != undefined && this.password != ""
      && this.email != undefined && this.email != ""
      && this.nome != undefined && this.nome != ""
      && this.cognome != undefined && this.cognome != "") {
      if (this.registerService.registrazione(utente)) {
        console.log("reindirizzamento all homepage");
        this.myMessage = "utente registrato correttamente";
        this.error = false;
        this.sign = true;
      } else {
        console.log("errore, prego riprovare");
        this.myMessage = "errore, riprovare";
        this.error = true;
        this.sign = false;
      }
    } else {
      console.log("riempi i campi correttamente!");
      this.myMessage = "riempi i campi correttamente!";
      this.error = true;
      this.sign = false;
    }
  }

}
