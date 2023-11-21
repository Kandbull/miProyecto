import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';

import { Observable } from 'rxjs';
import { Personaje } from 'src/app/interfaces/interface';
import { FirebaseAuthService } from '../firebaseAuth/firebase-auth.service';
import { User, createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { getFirestore, setDoc, doc } from 'firebase/firestore';

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {

  userCollection: string | undefined;

  constructor(private firestore: AngularFirestore,
    private authService: FirebaseAuthService
    ) { 
      /** 
    this.authService.user$.subscribe((user) => {
      if(user){
        this.userCollection = 'users/${user.uid}';
      }
    });*/
  }

  /** ####################################
   *      Autenticacion del video  
   * #########################################*/

  // Acceder
  /** 
  signIn(user: User){
    return signInWithEmailAndPassword(getAuth(), user.email, user.password);
  }*/

  // Crear Usuario
  /** 
  signUp(user: User){
    return createUserWithEmailAndPassword(getAuth(), user.email, user.password);
  }*/

  // Actualizar Usuario
  /** 
  updateUser(displayName: string){
    return updateProfile(getAuth().currentUser, { displayName })
  }*/

  // Setear un documento
  /** 
  setDocument( path: string, data: any){
    return setDoc(doc(getFirestore(), path),da)
  }*/



  /** Codigo que funciona en la firestore
   * Aqui estan las cosas del usuario y tambien de la creacion del personaje
   * Despues veo que quito y que se queda
   */
  
  getDocument<T>(path: string, id: string) {
		const collection = this.firestore.collection<T>(path)
		return collection.doc<T>(id).valueChanges()
	}

  deleteDocument(path: string, id: string) {
		const collection = this.firestore.collection(path)
		return collection.doc(id).delete()
	}

  crearDoc(){
    this.firestore.collection('usuario')
  }

  getCollection(){
    console.log('aqui estoy leyendo una coleccion');
    this.firestore.collection('usuario').get().subscribe( (respuesta) => {

    });
  }

  crearUsuario(data: any, path: string, email: string | undefined){
    const collection = this.firestore.collection(path);
    return collection.doc(email).set(data);
  }
  
  /** Esto es para crear una id aleatoria
   * Por lo general es una id Alfanumerica que tiene tanto numeros como letras
  */
  getId(){
    return this.firestore.createId();
  }

  getUsuario(path: string, correo:string){
    const colleccion = this.firestore.collection(path);

    //valueChanges es un observable de este documento
    return colleccion.doc(correo).valueChanges();
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
