import { Component, Input, OnInit,EventEmitter, Output, OnChanges, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Personne } from '../personne.model';



@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent implements OnInit,OnChanges {
  personsForm:FormGroup;
  //**@Output pour envoyer des donnees dehors */
  @Output() personAdded = new EventEmitter<Personne>();
  @Output() personDeleted = new EventEmitter<Personne>();
  @Output() personGoBack = new EventEmitter<Boolean>();
  @Input() personToUpdate:Personne;
  inputValue:string;
  tittleText:string;
  sendButtonText:string;

  
  constructor(public fb:FormBuilder,) { 
    
  }
  ngOnChanges(changes: SimpleChanges): void {
    if(changes.personToUpdate && this.personToUpdate !== undefined){
      console.log("personne is"+this.personToUpdate);
      this.personsForm = this.fb.group({
        id:this.personToUpdate.id,
        prenom : this.personToUpdate.prenom
        });
      this.inputValue = this.personToUpdate.prenom;
      this.tittleText = "Modifier les données de "+ this.personToUpdate.prenom;
      this.sendButtonText = "Modifier";
    }else{
      this.initComponents();
    }
  }

  initComponents(){
    this.personsForm = this.fb.group({
      id:[null],
      prenom : ['',Validators.required]
      });
    this.inputValue='';
    this.tittleText='Créer une nouvelle personne';
    this.sendButtonText='Envoyer';
  }

  ngOnInit(): void {
   this.initComponents();
  }

  onAddPerson(){
    this.personAdded.emit(this.personsForm.value);
    this.personsForm.reset();
  }

  goAddPerson(){
    this.personGoBack.emit(false);
  }

  onDeletePerson(){
    this.personDeleted.emit(this.personsForm.value);
  }


}
