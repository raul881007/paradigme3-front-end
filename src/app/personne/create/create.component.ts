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
  /** @Output pour envoyer des donnees de la personne dehors 
   * personAdded avec les donnees de la personne à ajouter
  */
  @Output() personAdded = new EventEmitter<Personne>();


  /** @Output pour envoyer des donnees de la personne dehors 
   * personAdded avec les donnees de la personne à supprimer 
  */
  @Output() personDeleted = new EventEmitter<Personne>();


  /** @Output pour envoyer des donnees de la personne dehors 
   * personGoBack pour changer les donnes de la personne 
   * et pouvoir mettre á jour le champ
  */
  @Output() personGoBack = new EventEmitter<Boolean>();
  
  /** @Input pour l'accès depuis un autre composant
   * personToUpdate est l'objet de la personne qui 
   * contient les données de la personne à mettre à jour
  */
  @Input() personToUpdate:Personne;

  /**
   * Texte du TextField 
   */
  inputValue:string;
  /**
   * Titre de la page 
   */
  tittleText:string;

  /**
   * Texte du bouton
   */
  sendButtonText:string;

  
  constructor(public fb:FormBuilder,) { 
    
  }

  /**
   * méthode de l'interface onChangues qui 
   * sera exécutée en cas de changement dans les composants de la classe
   * @param changes objet qui contiendra la liste des objets à modifier
   */
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
  
  /**
   * Initialiser toutes les variables de la classe
   */
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
  /**
   * Ajouter une personne
   * Méthode qui utilise EventEmitter<Personne> personAdded attribute pour 
   * ajouter la personne qui etait été saisie par l'utilisateur
   */
  onAddPerson(){
    this.personAdded.emit(this.personsForm.value);
    this.personsForm.reset();
  }
  /**
   * Ajouter une personne
   * Méthode qui utilise EventEmitter<Personne> personGoBack  
   * pour redémarrer le formulaire
   */
  goAddPerson(){
    this.personGoBack.emit(false);
  }
  /**
   * Supprimer une personne
   * Méthode qui utilise EventEmitter<Personne> personDeleted attribute pour 
   * envoyer la personne qui etait été sélectionné par l'utilisateur
   */
  onDeletePerson(){
    this.personDeleted.emit(this.personsForm.value);
  }


}
