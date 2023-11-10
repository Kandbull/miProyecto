import { Component, OnInit } from '@angular/core';
import { FirebaseService } from 'src/app/services/firebase/firebase.service';
//import { ApiService } from 'src/app/services/api/api.service';



@Component({
  selector: 'app-crear',
  templateUrl: './crear.page.html',
  styleUrls: ['./crear.page.scss'],
})
export class CrearPage implements OnInit {

  constructor(

    //private apiService: ApiService,
    private firebase: FirebaseService
  ) { }

  personajes:any; 

  
  /** 
  getPersonajeList(){
    this.apiService.getPersonajeList().subscribe((data) =>{
      console.log(data);
      this.personajes = data;
    })
  }
  */

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
