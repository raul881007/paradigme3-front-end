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
  @Input("personsList") persons :  Personne[];
  @Output() personSelected= new EventEmitter<Personne>();
  

  constructor() {
  }
  ngOnChanges(changes: SimpleChanges): void {
    if(changes.persons && this.persons !==undefined){
      
      this.persons.sort((pA,pB)=>pA.id - pB.id);
      
    }
  }

  selectPersonToEdit(personne:Personne){
      this.personSelected.emit(personne);
  }
  
}