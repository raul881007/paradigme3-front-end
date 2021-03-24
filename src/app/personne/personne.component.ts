import { Input, Output,EventEmitter } from '@angular/core';
import { Component, OnChanges, OnInit, SimpleChange, SimpleChanges } from '@angular/core';

import { PersonneService } from '../services/personne.service';
import { Personne } from './personne.model';


@Component({
  selector: 'app-personne',
  templateUrl: './personne.component.html',
  styleUrls: ['./personne.component.css'],
  providers:[PersonneService]
})
export class PersonneComponent implements OnInit {
  @Output() showPersonDetail = new EventEmitter<Personne>();
  persons:Personne[];
  personSelected:Personne;
  constructor(private personsService:PersonneService,) { 
    
  }
  
  
  ngOnInit(): void {
    this.personsService.getAllPersons().subscribe(response=>{
      this.persons= response;
  },
  error=>console.log(error));
    
  }


  onPersonnePressed(personne:Personne){
    this.personSelected = personne;
  }

  savePerson(person:Personne):void{
    if(person.id !==null){
      this.personsService.updatePersonDb(person,person.id).subscribe(resp=>{
        const position=this.persons.map(item=> item.id).indexOf(person.id);
        this.persons[position] = person;
        this.personSelected = undefined;
      },
      error=>{console.error(error)}
      )
    }else{
      this.personsService.savePersonDb(person).subscribe(resp =>{
        this.persons.push(resp);
       },
       error => {console.error(error)})  
    }
    

 
 }

 deletePerson(person:Personne){
  this.personsService.deletePersonDb(person.id).subscribe(resp =>{
    this.personSelected = undefined;
    let nPerson = [];
    this.persons.forEach(item=>{
      if(item.id!=person.id)nPerson.push(item);
    })
    this.persons = nPerson;
  })
}
changePersonValue(){
  this.personSelected=undefined;
}

 

}
