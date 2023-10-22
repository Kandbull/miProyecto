import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LoginserviceService {

  API_URL = 'https://github.com/Kandbull/usuarioLogin/blob/main/usuarioLogin.json'


  constructor(private http: HttpClient) { }

  getUsuarios(){
    return this.http.get(this.API_URL);
  }

}
