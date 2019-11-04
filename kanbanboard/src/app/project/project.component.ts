import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NewProjectService } from '../services/new-project.service';

@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.css']
})
export class ProjectComponent implements OnInit {

  constructor(private router: Router, private newProjectService: NewProjectService) { }

  nome_progetto: string = "";
  descrizione_progetto: string = "";
  numero_colonne: number = 2;
  arrayColonne = [];
  nomeColonnaInput = ["", ""];
  myMessage: string = "";
  error: boolean = false;
  creato: boolean = false;

  //questa variabile serve per visualizzare il primo form o il secondo
  isCreate: boolean = false;


  ngOnInit() {
  }

  onClickGo(){
    this.isCreate = true;
    this.arrayColonne.splice(0);
    for(let i = 0; i < this.numero_colonne; i++){
      this.arrayColonne.push({'id': i, 'nomeColonna': ""});
    }
  }

  onClickReturn(){
    this.isCreate = false;
  }

  onProjectSubmit() {
    if (this.nome_progetto != undefined && this.nome_progetto != "" &&
      this.descrizione_progetto != undefined && this.descrizione_progetto != "") {
  
      const project: any = {
        nome_progetto: this.nome_progetto,
        descrizione_progetto: this.descrizione_progetto
      }
      
      this.newProjectService.inserimentoProject(project).subscribe(
        successo => {

          if (successo.creato != "1") {
            console.log("PROGETTO NON INSERITO");
            this.myMessage = "PROGETTO NON INSERITO";
            this.error = true;
            this.creato = false;
          } else {
            console.log("PROGETTO INSERITO");

            //creo le colonne del progetto appena creato
            this.newProjectService.columnProject(this.arrayColonne, successo.id_progetto).subscribe(
              succ =>{
                if(succ.inserito != 1){
                  console.log("colonne non inserite correttamente!");
                }else{
                  console.log("colonne inserite correttamente");
                }
              },
              err =>{
                console.log("errore collegamento database!");
              }
            );

            this.myMessage = "PROGETTO INSERITO";
            this.error = false;
            this.creato = true;

            setTimeout(() => { this.router.navigate(['/pu']); }, 2000);
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





