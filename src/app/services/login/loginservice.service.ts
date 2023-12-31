import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, of, tap} from 'rxjs';
import { Observable } from 'rxjs/internal/Observable';
import { Usuario } from 'src/app/interfaces/interface';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class LoginserviceService {

  private profeJson = 'https://nancyb3a.github.io/Test_/usuarios_PGY4121_08.json';
  private loggedInUser: any;

  httpHeader = {
    headers: new HttpHeaders({ 
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin' :'*'
   })
  };
  constructor(private http: HttpClient) { }

  getUsers(): Observable<any> {
    return this.http.get(this.profeJson);
  }

  /** 
  login(username: string, password: string): Observable<boolean> {
    return this.http.get<any>(this.profeJson).pipe(
      map(data => {
        const user = data.usuarios.find(u => u.username === username && u.password === password);
        if (user) {
          this.loggedInUser = user;
          return true;
        } else {
          return false;
        }
      }),
      catchError(() => of(false))
    );
  }*/

  getLoggedInUser(): any {
    return this.loggedInUser;
  }

  logout(): void {
    this.loggedInUser = null;
  }
}



/**
 
 getUser(){
    return this.http.get(this.URL)
  }

  getUsuario(username: any, password:any){
    return this.http.get(this.URL);
  }

  getSoloUsuario(username: any){
    return this.http.get(this.URL);
  }
  
  getUsuarios(id: any): Observable<Registro[]> {
    return this.http.get<Registro[]>(`${this.URL}` + id).pipe(
      tap((_) => console.log(`Registro fetched: ${id}`)),
      catchError(this.handleError<Registro[]>(`Get registro id=${id}`))
    );
  }

  getUsersList(): Observable<Registro[]> {
    return this.http.get<Registro[]>(`${this.URL}`).pipe(
      tap((registro) => console.log('Registro fetched!')),
      catchError(this.handleError<Registro[]>('Get registro', []))
    );
  } 

  
  updatePost(id: any, registro: Registro): Observable<any> {
    return this.http.put(`${URL}/posts/` + id,registro, this.httpHeader).pipe(
      tap((_) => console.log(`Post updated: ${id}`)),
      catchError(this.handleError<Registro[]>('Update post'))
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




