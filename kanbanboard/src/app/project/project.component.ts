import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { NewProjectService } from '../services/new-project.service';


@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.css']
})
export class ProjectComponent implements OnInit {

  constructor(private router: Router, private route: ActivatedRoute, private newProjectService: NewProjectService) { }

  nome_progetto: string = "";
  descrizione_progetto: string = "";
  myMessage: string = "";
  error: boolean = false;
  creato: boolean = false;


  ngOnInit() {
  }


  onProjectSubmit() {
    const project: any = {
      nome_progetto: this.nome_progetto,
      descrizione_progetto: this.descrizione_progetto
    }
    console.log(project);

    if (this.nome_progetto != undefined && this.nome_progetto != "" &&
      this.descrizione_progetto != undefined && this.descrizione_progetto != "") {

      this.newProjectService.inserimentoProject(project).subscribe(
        successo => {

          if (successo.creato != "1") {
            console.log("PROGETTO NON INSERITO");
            this.myMessage = "PROGETTO NON INSERITO";
            this.error = true;
            this.creato = false;
          } else {
            console.log("PROGETTO INSERITO");
            this.myMessage = "PROGETTO INSERITO";
            this.error = false;
            this.creato = true;
          }
        },
        err => {
          console.log("errore collegamento database");
        }
      )
    } else {
      console.log("riempi i campi correttamente!");
      this.myMessage = "Riempi i campi correttamente!";
      this.error = true;
      this.creato = false;
    }
  }
}





