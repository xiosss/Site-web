import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-formulaire',
  templateUrl: './formulaire.component.html',
  styleUrls: ['./formulaire.component.css']
})
export class FormulaireComponent implements OnInit {

  prenom : string = "";
  nom : string = "";
  genre : string ="";
  adresse : string = "";
  cp : string = "";
  ville : string = "";
  email : string = "";
  pseudo : string = "";
  password1 : string = "";
  password2 : string = "";
  validationboolean : boolean = false;

  
  
  constructor() { }

  ngOnInit(): void {
  }

  validation (){
    if((this.prenom != "") && (this.genre != "") && (this.nom != "") && (this.adresse != "") && (this.cp != "") && (this.ville != "") && (this.email != "") && (this.password1 != "") && (this.password2 != "")){
      if(this.password1 != this.password2){
        alert("Mot de passe non similaire");
      }
      this.validationboolean = true
    }else{
      alert("pas complet");
    }
  }

}