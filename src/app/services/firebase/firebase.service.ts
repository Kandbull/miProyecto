import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/compat/firestore';

import { Observable } from 'rxjs';
import { Personaje } from 'src/app/interfaces/interface';

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {

  constructor(private firestore: AngularFirestore) { }


  crearDoc(){
    this.firestore.collection('usuario')
  }

  getCollection(){
    console.log('aqui estoy leyendo una coleccion');
    this.firestore.collection('usuario').get().subscribe( (respuesta) => {

    });
  }

  crearUsuario(data: any, path: string, id: string | undefined){
    const collection = this.firestore.collection(path);
    return collection.doc(id).set(data);
  }
  
  /** Esto es para crear una id aleatoria
   * Por lo general es una id Alfanumerica que tiene tanto numeros como letras
  */
  getId(){
    return this.firestore.createId();
  }

  getUsuario(path: string, id:string){
    const colleccion = this.firestore.collection(path);

    //valueChanges es un observable de este documento
    return colleccion.doc(id).valueChanges();
  }

  /**
   * Desde aquí empezare con los siguientes metodos para crear
   * a los distintos personajes que se podrán crear en la app
   * ya sea para todas las funcionalidades de "Crear Personaje"
   */

  crearPersonaje(data:any, path: string, id: string){
    const colleccion = this.firestore.collection(path);
    return colleccion.doc(id).set(data);
  }



}
