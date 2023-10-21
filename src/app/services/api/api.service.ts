import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  URL: string = 'https://github.com/Kandbull/apiPoderes/blob/main/poderes.json';

  httpHeader = {
    Headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin' : '*'
    }),
  };

  constructor(private http: HttpClient) { }

  

}
