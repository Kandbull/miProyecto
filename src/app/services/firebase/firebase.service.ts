import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';

import { Observable } from 'rxjs';
import { Personaje } from 'src/app/interfaces/interface';
import { FirebaseAuthService } from '../firebaseAuth/firebase-auth.service';

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {

  userCollection: string | undefined;

  constructor(private firestore: AngularFirestore,
    private authService: FirebaseAuthService
    ) { 
    this.authService.user$.subscribe((user) => {
      if(user){
        this.userCollection = 'users/${user.uid}';
      }
    });
  }
  

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

  createPersonaje(data:any, path: string, id: string | undefined){
    const colleccion = this.firestore.collection(path);
    return colleccion.doc(id).set(data);
  }

  getPersonaje(path: string, id: string){
    const colleccion = this.firestore.collection(path);
    // valueChanges es un observable de este documento
    return colleccion.doc(id).valueChanges();
  }

  updatePersonaje(data: any, path: string, id: string){
    const collection = this.firestore.collection(path);
    return collection.doc(id).update(data);
  }

  deletePersonaje(path: string, id: string){
    const collection = this.firestore.collection(path);
    return collection.doc(id).delete();
  }

  getListPersonaje<tipo>(path: string){
    const collection = this.firestore.collection<tipo>(path);
    return collection.valueChanges();
  }

}
