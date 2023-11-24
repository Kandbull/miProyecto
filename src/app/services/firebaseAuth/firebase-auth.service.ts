import { Injectable } from '@angular/core'
import { AngularFireAuth } from '@angular/fire/compat/auth'
import { AngularFirestore } from '@angular/fire/compat/firestore';
import 'firebase/auth'
import { User, getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import { Observable } from 'rxjs'
import { Usuario } from 'src/app/interfaces/interface';
import { UserUsuario } from 'src/app/interfaces/interfaz';
@Injectable({
	providedIn: 'root',
})
export class FirebaseAuthService {


	currentUser: any = null
	constructor(
		private authFirebase: AngularFireAuth, //firebase.auth.Auth
		private firestore: AngularFirestore
	) {
		this.getUID();
		this.authFirebase.authState.subscribe((user) => {
			this.currentUser = user
		})

	}

	// Registro de usuario
	crearUsuario(email: string, password: string) {
		return this.authFirebase.createUserWithEmailAndPassword(email, password);
	}

	/** Inicio de sesion
	 * Y tambien es algo que me funciona
	 */
	iniciarSesion(email: string, contraseña: string) {
		return this.authFirebase.signInWithEmailAndPassword(email, contraseña);
	}

	// Cerrar sesion
	cerrarSesion() {
		return this.authFirebase.signOut();
	}

	//Obtener una referencia del documento del usuario en la Firestore
	getUserDocument(userId: string){
		return this.firestore.collection('usuario').doc(userId);
	}

	//guardar datos en la firestore
	guardarDatosUsuario(userId: string, data: any){
		return this.getUserDocument(userId).set(data, {merge: true});
	}

	obtenerUsuarioActual() {
		return this.authFirebase.authState;
	}

	leerUsuarioActual(){
		this.authFirebase.authState.subscribe(user => {
		if (user) {
		  console.log('Usuario actual:', user);
		} else {
		  console.log('No hay usuario autenticado');
		}
	  });
	}

	async logIn(email: string| undefined, password: string) {
		return await this.authFirebase.signInWithEmailAndPassword(email!, password)
	}

	async obtenerUID(){
		
	}

	async resetPassword(email: string) {
		try {
			return this.authFirebase.sendPasswordResetEmail(email)
		} catch (error) {
			console.log(error)
		}
	}

	logOut() {
		return this.authFirebase.signOut()
	}

	async getUID() {
		const user = await this.authFirebase.currentUser
		return user ? user.uid : null
	}
	stateUser() {
		return this.authFirebase.authState
	}
}
