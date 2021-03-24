import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {Config} from '../common/config'
import { Personne } from '../personne/personne.model';

@Injectable({
  providedIn: 'root'
})
export class PersonneService {

  public urlConnection = Config.backendUrl + "personne/"

  constructor(
    private httpClient:HttpClient
    ) {}

   public getAllPersons(): Observable<any>{
     return this.httpClient.get(this.urlConnection);
   }

   public savePersonDb(personne : Personne): Observable<any>{
     return this.httpClient.post(this.urlConnection,personne);
   }

   public deletePersonDb(idPersonne : any): Observable<any>{
     return this.httpClient.delete(this.urlConnection+idPersonne);
   }

   public updatePersonDb(personne:Personne,idPersonne:any):Observable<any>{
    return this.httpClient.put<any>(this.urlConnection+idPersonne,personne);
   }
   
}
