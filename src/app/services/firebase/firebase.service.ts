import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';

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

  getId(){
    return this.firestore.createId();
  }






}
