import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api/api.service';

@Component({
  selector: 'app-personaje',
  templateUrl: './personaje.page.html',
  styleUrls: ['./personaje.page.scss'],
})
export class PersonajePage implements OnInit {

  personajes:any; 

  constructor(private apiService: ApiService) {
    this.getPersonajeList();
   }

  getPersonajeList(){
    this.apiService.getPersonajeList().subscribe((data) =>{
      console.log(data);
      this.personajes = data;
    })
  }

  ngOnInit() {
  }


  confirm(){

  }

  cancel(){
    
  }

  
  
  /** ={
    idPersonaje: null,
    nombrePersonaje: "",
    edadPersonaje: null,
    habilidadPersonaje: null,
    historiaPersonaje: ""
  }*/


  crearPersonaje(){
    console.log('aqui se crea algo');

  }

}
