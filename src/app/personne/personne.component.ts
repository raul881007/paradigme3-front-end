import { Input, Output, EventEmitter } from '@angular/core';
import { Component, OnChanges, OnInit, SimpleChange, SimpleChanges } from '@angular/core';

import { PersonneService } from '../services/personne.service';
import { Personne } from './personne.model';


@Component({
  selector: 'app-personne',
  templateUrl: './personne.component.html',
  styleUrls: ['./personne.component.css'],
  providers: [PersonneService]
})
export class PersonneComponent implements OnInit {
  /**
   * Liste de personnes
   */
  persons: Personne[];
  /**
   * Objet personne sélectionnée
   */
  personSelected: Personne;

  /**
   * 
   * @param personsService Service de personne pour utiliser toutes les opérations sur l'API REST
   */
  constructor(private personsService: PersonneService,) {}


  ngOnInit(): void {
    this.personsService.getAllPersons().subscribe(response => {
      this.persons = response;
    },
      error => console.log(error));

  }

/**
 * Méthode qui notifiera le composant des 
 * données de la personne à modifier ou à supprimer
 * @param personne Personne personne choisie 
 * pour modifier ou supprimer
 */
  onPersonnePressed(personne: Personne) {
    this.personSelected = personne;
  }

  /**
  * Méthode pour mise a jour ou ajouter une nouvelle personne 
  * si la personne a un identifiant les données seront mises à jour 
  * sinon une nouvelle sera ajoutée
  * @param person avec le données de la personne à sauver o a mettre a jour
  */
  savePerson(person: Personne): void {
    if (person.id !== null) {
      this.personsService.updatePersonDb(person, person.id).subscribe(resp => {
        const position = this.persons.map(item => item.id).indexOf(person.id);
        this.persons[position] = person;
        this.personSelected = undefined;
      },
        error => { console.error(error) }
      )
    } else {
      this.personsService.savePersonDb(person).subscribe(resp => {
        this.persons.push(resp);
      },
        error => { console.error(error) })
    }



  }
  /**
   * Méthode pour supprimer une personne
   * @param person avec le données de la personne á supprimer
   */
  deletePerson(person: Personne) {
    this.personsService.deletePersonDb(person.id).subscribe(resp => {
      this.personSelected = undefined;
      let nPerson = [];
      this.persons.forEach(item => {
        if (item.id != person.id) nPerson.push(item);
      })
      this.persons = nPerson;
    })
  }
  /**
   * méthode qui mettra à jour la valeur du champ personSelected
   * pour notifier au composant que l'utilisateur ne souhaite plus
   * modifier les données d'une personne
   */
  changePersonValue() {
    this.personSelected = undefined;
  }



}
