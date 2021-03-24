import { Component, Input, Output, PipeTransform,EventEmitter, OnChanges, SimpleChanges } from '@angular/core';
import { DecimalPipe } from '@angular/common';
import { FormControl } from '@angular/forms';


import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { Personne } from '../personne.model';
import { ThrowStmt } from '@angular/compiler';


@Component({
  selector: 'app-personne-list',
  templateUrl: './personne-list.component.html',
  providers: [DecimalPipe]
})
export class PersonneListComponent implements OnChanges{
  
  /** @Input pour l'accès depuis un autre composant
   * persons est la liste des objets Personne à afficher 
  */
  @Input("personsList") persons :  Personne[];

  /** @Output pour envoyer des donnees de la personneSelected dehors 
   * personSelected pour changer les donnes de la personne 
   * et pouvoir montrer ses données
  */
  @Output() personSelected= new EventEmitter<Personne>();
  

  constructor() {
  }

  /**
   * Méthode de l'interface onChangues qui 
   * sera exécutée en cas de changement dans les composants de la classe
   * @param changes objet qui contiendra la liste des objets à modifier
   */
  ngOnChanges(changes: SimpleChanges): void {
    if(changes.persons && this.persons !==undefined){
      
      this.persons.sort((pA,pB)=>pA.id - pB.id);
      
    }
  }

  /**
   * Méthode qui utilise EventEmitter<Personne> personGoBack  
   * pour sélectionner la personne qu'on veut actualizer
   * @param personne Contient la personn á editer
   */
  selectPersonToEdit(personne:Personne){
      this.personSelected.emit(personne);
  }
  
}