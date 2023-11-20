import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, catchError, of, tap } from 'rxjs';
import { Personaje } from 'src/app/interfaces/interface';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private jsonUrl = 'https://github.com/Kandbull/apiPoderes/blob/main/poderes.json';

  httpHeader = {
    Headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin' : '*'
    }),
  };

  constructor(private http: HttpClient) { }

  getData(): Observable<any>{
    return this.http.get(this.jsonUrl);
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