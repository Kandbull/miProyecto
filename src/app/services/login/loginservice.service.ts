import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, of, tap } from 'rxjs';
import { Observable } from 'rxjs/internal/Observable';
import { Registro } from 'src/app/interfaces/registro';

@Injectable({
  providedIn: 'root'
})
export class LoginserviceService {

  URL = 'https://nancyb3a.github.io/Test_/usuarios_PGY4121_08.json'

  httpHeader = {
    headers: new HttpHeaders({ 
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin' :'*'
   }),
  };
  constructor(private http: HttpClient) { }

  getUsuario(username: any, password:any){
    return this.http.get(this.URL);
  }

  getSoloUsuario(username: any){
    return this.http.get(this.URL);
  }

  getUsuarios(id: any): Observable<Registro[]> {
    return this.http.get<Registro[]>(`${this.URL}/users/` + id).pipe(
      tap((_) => console.log(`Registro fetched: ${id}`)),
      catchError(this.handleError<Registro[]>(`Get registro id=${id}`))
    );
  }
  /***
  updatePost(id: any, registro: Registro): Observable<any> {
    return this.http.put(`${URL}/posts/` + id,registro, this.httpHeader).pipe(
      tap((_) => console.log(`Post updated: ${id}`)),
      catchError(this.handleError<Registro[]>('Update post'))
    );
  }
 */


  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);
      console.log(`${operation} failed: ${error.message}`);
      return of(result as T);
    };
  }

}
