import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  constructor() { }

  avatars: any = [
    "../../assets/img/avatar1.png",
    "../../assets/img/avatar2.png",
    "../../assets/img/avatar3.jpg",
    "../../assets/img/avatar4.png"
  ];

  avatar: string = "../../assets/img/avatarNone.jpeg";
  nome: string = "";
  cognome: string = "";
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
      cognome: this.cognome,
      username: this.username,
      password: this.password
    }

    console.log(utente);
  }
}
