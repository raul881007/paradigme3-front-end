import { TestBed } from '@angular/core/testing';
import { HttpClient, HttpClientModule } from '@angular/common/http'
import { HttpTestingController, HttpClientTestingModule } from '@angular/common/http/testing'
import { PersonneService } from './personne.service';
import { Personne } from '../personne/personne.model';

class HttpClientMock {
  get = jasmine.createSpy('httpclient.get');

}

describe('PersonneService', () => {
  let service: PersonneService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [PersonneService]

    });
    service = TestBed.inject(PersonneService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('test de méthode GET', () => {
    const persons: Personne[] = [{
      id: 1,
      nom: 'personne 1'
    },
    {
      id: 2,
      nom: 'personne 2'
    },
    {
      id: 3,
      nom: 'personne 3'
    },
    ];
    service.getAllPersons().subscribe(personsResp => {
      expect(personsResp.length).toBe(3);
      expect(personsResp).toEqual(persons);
    });
    const request = httpMock.expectOne(`${service.urlConnection}`,'Put méthode');
    expect(request.request.method).toBe('GET');
    request.flush(persons);
  });

  it('test de méthode POST', () => {
    const person: Personne = {
      id: 1,
      nom: 'personne post'
    };
    const person1: Personne = {
      id: 2,
      nom: 'personne post 2'
    };
    service.savePersonDb(person).subscribe(response=>{
      expect(person).toEqual(response);
      //expect(person1).toEqual(response);
    });
    const request = httpMock.expectOne(`${service.urlConnection}`,'Post méthode');
    expect(request.request.method).toBe('POST');
    request.flush(person);
  });

  it('test de méthode DELETE', () => {
    service.deletePersonDb(2).subscribe(response=>{
      expect(response).toBe(2);
    });
    const request = httpMock.expectOne(`${service.urlConnection}`+2,'Delete méthode');
    expect(request.request.method).toBe('DELETE');
    request.flush(2);
  });

  it('test de méthode PUT', () => {
    const person: Personne = {
      id: 2,
      nom: 'personne put  2'
    };

    service.updatePersonDb(person,2).subscribe(response=>{
      expect(response.id).toBe(2);
      expect(response).toEqual(person);
    });
    const request = httpMock.expectOne(`${service.urlConnection}`+2,'Put méthode');
    expect(request.request.method).toBe('PUT');
    request.flush(person);
  });


  

});
