import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-pu',
  templateUrl: './pu.component.html',
  styleUrls: ['./pu.component.css']
})
export class PUComponent implements OnInit {

  constructor() { }

  isMenuVisibile:boolean=false;

  onClickSearchMenu() {
     if(this.isMenuVisibile==false){
       this.isMenuVisibile = true;
     }
     else {
       this.isMenuVisibile = false;
     }
  }

  ngOnInit() {
  }

}
