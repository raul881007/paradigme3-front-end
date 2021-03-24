import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {Config} from '../common/config'
import { Personne } from '../personne/personne.model';

@Injectable({
  providedIn: 'root'
})
export class PersonneService {

  /**
   * Connexion a l'Api Rest
   */
  public urlConnection = Config.backendUrl + "personne/"

  /**
   * 
   * @param httpClient Fournit les dépendances nécessaires 
   * pour la connexion et les différentes méthodes à utiliser
   */
  constructor(
    private httpClient:HttpClient
    ) {}

    /**
     * Méthode qui obtient la liste de personnes 
     * @returns connexion à la méthode GET avec le résultat
     */
   public getAllPersons(): Observable<any>{
     return this.httpClient.get(this.urlConnection);
   }

   /**
    * Méthode pour insérer une nouvelle personne
    * @param personne Objet Personne avec les données à insérer
    * @returns connexion à la méthode POST avec le résultat
    */
   public savePersonDb(personne : Personne): Observable<any>{
     return this.httpClient.post(this.urlConnection,personne);
   }
   /**
    * Méthode pour supprimer le personne
    * @param idPersonne number avec l'identifiant de la personne
    * @returns connexion à la méthode DELETE avec le résultat
    */
   public deletePersonDb(idPersonne : any): Observable<any>{
     return this.httpClient.delete(this.urlConnection+idPersonne);
   }
   /**
    * Methode pour mettre a jour le personne
    * @param personne Objet Personne avec les données à insérer
    * @param idPersonne number avec l'identifiant de la personne
    * @returns connexion à la méthode PUT avec le résultat
    */
   public updatePersonDb(personne:Personne,idPersonne:any):Observable<any>{
    return this.httpClient.put<any>(this.urlConnection+idPersonne,personne);
   }
   
}
