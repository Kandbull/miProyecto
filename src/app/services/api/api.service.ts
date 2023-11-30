import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ApiService {


  constructor(private http: HttpClient) { }

  getRandomPersonaje(){
    return this.http.get<any>(`https://randomuser.me/api/?inc=gender,name,dob`);
  }

}

/**
 getPersonaje(id: any): Observable<Personaje[]> {
    return this.http.get<Personaje[]>(`${this.URL}/users/` + id).pipe(
      tap((_) => console.log(`Personaje fetched: ${id}`)),
      catchError(this.handleError<Personaje[]>(`Get personaje id=${id}`))
    );
  }
  getPersonajeList(): Observable<Personaje[]> {
    return this.http.get<Personaje[]>(`${this.URL}/users/`).pipe(
      tap((Personaje) => console.log('Personaje fetched!')),
      catchError(this.handleError<Personaje[]>('Get personaje', []))
    );
  }
  
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);
      console.log(`${operation} failed: ${error.message}`);
      return of(result as T);
    };
  }

 */